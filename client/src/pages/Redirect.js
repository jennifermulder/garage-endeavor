import React from 'react';

function Redirect() {
    const listingName = () => {
        let url = window.location.href;
        url = url.slice(url.indexOf('?') + 1).replace(/%20/g, ' ');
        return url;
    };

    // setTimeout(function(){ window.location.assign('buy') }, 3000);

    return (
        <div>
            <h1>Your Listing ({listingName()}) was successfully added!</h1>
            <a href='/sell-item'>
                <h2>Add another listing</h2>
            </a>
            <a href='buy'>
                <h2>Browse listings</h2>
            </a>
        </div>
    )
};

export default Redirect;