import React, { Component } from 'react';
import AppItem from './AppItem'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      genre: '',
      sort: '',
      error: null
    }
  }

  setGenre(genre) {
    this.setState({
      genre
    });
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const baseUrl = 'http://localhost:8000/apps';
    const params = [];
    if (this.state.genre) {
      params.push(`genre=${this.state.genre}`);
    }
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`)
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          apps: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get apps at this time.'
        })
      })
  }


  render() {
    const apps = this.state.apps.map((app, i) => {
      return <AppItem {...app} key={i} />
    })

    console.log(this.state.apps)

    return (
      <main className='App'>
        <h1>Find the Google Play app for you</h1>
        <div className="search">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="genre">Genre: </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={this.state.search}
              onChange={e => this.setGenre(e.target.value)}
            />
            <label htmlFor="sort">Sort: </label>
            <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
              <option value="">None</option>
              <option value="App">App title</option>
              <option value="Rating">App rating</option>
            </select>
            <button type="submit">Submit</button>
          </form>
          <div className="App_error">{this.state.error}</div>
        </div>
        {apps}
      </main>
    );
  }
}

export default App;