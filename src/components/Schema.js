import React from 'react';


export function Excel() {
    return (
        <div itemScope itemType="http://schema.org/SoftwareApplication">
            <span itemProp="name" content="OpenDataDSL Excel Add-in" />
            <span itemProp="operatingSystem" content="Windows" />
            <span itemProp="applicationCategory" content="BusinessApplication" />
            <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                <span itemProp="ratingValue" content="5.0" />
                <span itemProp="ratingCount" content="1" />
            </div>
            <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <span itemProp="price" content="0" />
                <meta itemProp="priceCurrency" content="GBP" />
            </div>
        </div>
    );
}

export function Portal() {
    return (
        <div itemScope itemType="http://schema.org/SoftwareApplication">
            <span itemProp="name" content="OpenDataDSL Web Portal" />
            <span itemProp="applicationCategory" content="BusinessApplication, BrowserApplication, MobileApplication, WebApplication" />
            <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                <span itemProp="ratingValue" content="5.0" />
                <span itemProp="ratingCount" content="1" />
            </div>
            <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <span itemProp="price" content="0" />
                <meta itemProp="priceCurrency" content="GBP" />
            </div>
        </div>
    );
}

export function DataSet({name, description, license, creator}) {
    return (
        <div itemScope itemType="http://schema.org/Dataset">
            <span itemProp="name" content={name} />
            <span itemProp="description" content={description} />
            { license?<span itemProp="license" content={license} />:<span />
            }
            { creator?
                <div itemProp="creator" itemScope itemType="https://schema.org/Organization">
                    <span itemProp="name" content={creator} />
                </div>
                :<div />
            }
        </div>
    );
}