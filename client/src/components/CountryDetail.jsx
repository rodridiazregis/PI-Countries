import * as cc from './CountryDetail.module.css';
import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {getDetail, cleanDetail} from '../actions';


export default function CountryDetail() {
    const dispatch = useDispatch();
    const country = useSelector((state) => state.countryDetail);

    function handleClick() {
        dispatch(cleanDetail())
    };
    
    let { id } = useParams();
    useEffect(() => {
        dispatch(getDetail(id));
    }, [id]);


    return (
        <div>
            {
                Object.keys(country).length &&
                <div className={cc['countryContainer']}>
                    <h1>{country.name}</h1>
                    <div className={cc['imgContainer']}>
                    <img src={country.flag} alt='Not found.' />
                    </div>
                    <section>
                    <h2>Country Code: {country.id}</h2>
                    <h2>Continent: {country.continents}</h2>
                    <h2>Capital: {country.capital}</h2>
                    <h2>Subregion: {country.subregion}</h2>
                    <h2>Area (km2): {country.area}</h2>
                    <h2>Population N° {country.population}</h2>
                    {country.activities.length ? 
                    <h2>ACTIVITIES: {country.activities.map(a => {
                        return (
                            <ul>
                                {/* alert tha the activity is already created */}
                                <h3>Activities:</h3>
                                <li>Name: {a.name}</li>
                                <li>Difficulty: {a.difficulty}</li>
                                <li>Duration:{a.duration}</li>
                                <li>Season: {a.season}</li>
                            </ul>
                            )} 
                        )}
                    </h2>
                    : <h2>
                        There is no activity created yet
                    </h2>
                    }   
                    </section>
                </div>
            }
            <Link to='/home'>
                <button onClick={handleClick} className={cc['butn']}>Go Back</button>
            </Link>
        </div>
    )
}