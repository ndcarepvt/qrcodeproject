import React from 'react'

const Test = ({ productName, affiliateID }) => {

    const baseURL = "https://localhost:5173/test/";

    const productSlug = encodeURIComponent(productName.trim().toLowerCase().replace(/\s+/g, '-'));
    const fullURL = `${baseURL}${productSlug}?ref=${affiliateID}`;
    
    return (
        <a href={fullURL} target="_blank" rel="noopener noreferrer">
            {fullURL}
        </a>
    )
}

export default Test