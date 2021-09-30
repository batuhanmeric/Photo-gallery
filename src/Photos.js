import React from 'react'

function Photos({photographer,src}) {
    return (
        <div>
            <div className="pic">
                <a href= {src}>
                    <img src= {src} alt="Photo" />
                </a>
                <h1>Photo by <i>{photographer}</i></h1>
            </div>
        </div>
    );
}

export default Photos
