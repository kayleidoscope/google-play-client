import React from 'react';

export default function AppItem(props) {
    return (
        <div className="app-item">
            <h2>{props.App}</h2>
            <div className="app-rating">Rating: {props.Rating}</div>
            <div className="app-genres">Genres: {props.Genres}</div>
        </div>
    )
}