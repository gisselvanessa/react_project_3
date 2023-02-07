import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './styles/residentInfo.css'

const ResidentInfo = ({url}) => {
    const [character, setCharacter] = useState()

    useEffect(() => {
        axios.get(url)
            .then(res=>setCharacter(res.data))
            .catch(err=> console.log(err))
    }, [])
    // console.log(character);
    return (
        <article className="card">
            <header className="card__header">
                <img className="card__img" src={character?.image} alt="" />
                <div className="card__container-status">
                    <span className={`card__circle ${character?.status}`}></span>
                    <span className="card__status">{character?.status}</span>
                </div>
            </header>
            <section className="card__body">
                <h3 className="card__name">{character?.name}</h3>
                <hr className='card__hr'/>
                <ul className="card__list">
                    <li className="card__item">
                        <span className="card__label">Raza </span>
                    </li>
                    {character?.species}
                    <li className="card__item">
                        <span className="card__label">Origen </span>
                    </li>
                    {character?.origin.name}
                    <li className="card__item">
                        <span className="card__label">
                            Aparicion en episodios{" "}
                        </span>
                    </li>
                    {character?.episode.length}
                </ul>
            </section>
        </article>
    );
}

export default ResidentInfo