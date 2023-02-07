import React from 'react'
import './styles/locationInfo.css'

const Locations = ({location}) => {
    // console.log(location);
    return (
        <article className='location'>
            <h2 className='location__name'>{location?.name}</h2>
            <ul className='location__list'>
                <li className='location__item'>
                    <b className='location__label'>Type: </b>
                    {location?.type}
                </li>
                <li className='location__item'>
                    <b className='location__label'>Dimension: </b>
                    {location?.dimension}
                </li>
                <li className='location__item'>
                    <b className='location__label'>Population: </b>
                    {location?.residents.length}
                </li>
            </ul>
        </article>
    );
}

export default Locations