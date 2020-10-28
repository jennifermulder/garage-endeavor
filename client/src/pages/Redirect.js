import React from 'react';

function Redirect() {
    const listingName = () => {
        let url = window.location.href;
        url = url.slice(url.indexOf('?') + 1).replace(/%20/g, ' ');
        return url;
    };

    function cntDown (cnt) {
        if(cnt !== 0) {
            return setInterval(function () {
                document.getElementById('cnt').textContent = `${cnt} seconds...`;
                cnt -= 1;
                if(cnt === 0) {
                    window.location.href = '/buy';
                }

            }, 1000);
        }
    }

    cntDown(10);
    return (
        <div>
            <h1>Your Listing ({listingName()}) was successfully added!</h1>
            <h3>The page will automatically redirect to browse products in <span id='cnt'></span></h3>
            <a href='/sell-item'>
                <h2><span><img src="https://img.icons8.com/ultraviolet/40/000000/circled-left-2.png"/></span>Add another listing</h2>
            </a>
        </div>
    )
};

export default Redirect;