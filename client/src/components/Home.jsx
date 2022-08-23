import * as home from './Home.module.css';
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { getCountries, getActivities, byContinent, byActivity, byOrderAlph, byPopulation } from '../actions';
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";


export default function Home() {
    const dispatch = useDispatch();

    const countries = useSelector((state) => state.countries)
    
    const activities = useSelector((state) => state.activities);

    const [order, setOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(9);
    
    const indexLastCharacter = currentPage * countriesPerPage;
    const indexFirstCharacter = indexLastCharacter - countriesPerPage;
    const currentCountries = countries.slice(indexFirstCharacter, indexLastCharacter);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getCountries())
        dispatch(getActivities())
    }, [dispatch]);

    function handleOrder(e) {
        e.preventDefault();
        dispatch(byOrderAlph(e.target.value));
        setOrder(e.target.value);
    }
    
    function handleOrderPop(e) {
        e.preventDefault();
        dispatch(byPopulation(e.target.value));
        setOrder(e.target.value);
    };

    function handleClick(e) {
        e.preventDefault();
        dispatch(getCountries());
    };

    function handleContinents(e) {
        e.preventDefault();
        dispatch(byContinent(e.target.value));
    };

    function handleActivity(e) {
        e.preventDefault();
        dispatch(byActivity(e.target.value));
    };


    return (
       <div className={home.container}>
        <header className={home["pagetop"]}>
            <h1>The Whole World</h1>
            <div className={home["searchbar"]}>
                <SearchBar />
            </div>
            <Link className={home["link"]} to='/activity'>
                <button className={home["butn"]}>
                Create Activity
                </button>
            </Link>
        </header>
            <div className={home.navigation}>
            <button className={home["butn1"]} onClick={handleClick}>Reload All Countries</button>
            <div className={home.selectors}>
            <select defaultValue={'default'} onChange={handleOrder}>
                <option value='default' disabled>-- By Alphabet --</option>
                <option value='Asc' key='Asc'>A-Z</option>
                <option value='Desc' key='Desc'>Z-A</option>
            </select>
            <select defaultValue={'default'} onChange={handleOrderPop}>
                <option value='default' disabled>-- By Population Number --</option>
                <option value='Max' key='Max'>Max population</option>
                <option value='Min' key='Min'>Min population</option>
            </select>
            <select defaultValue={'default'} onChange={handleContinents}>
                <option value='default' disabled>-- By Continent --</option>
                <option value='Africa' key='Africa'>Africa</option>
                <option value='Antarctica' key='Antarctica'>Antarctica</option>
                <option value='Asia' key='Asia'>Asia</option>
                <option value='Europe' key='Europe'>Europe</option>
                <option value='North America' key='NorthAmerica'>North America</option>
                <option value='Oceania' key='Oceania'>Oceania</option>
                <option value='South America' key='SouthAmerica'>South America</option>
            </select>
            <select  defaultValue={'default'} onChange={handleActivity}>
                <option value='default' disabled >-- By Activity --</option>
                {
                    activities.map(e => (<option value={e} key={e}>{e}</option>))
                }
            </select>

            </div>
            <Paginado countriesPerPage={countriesPerPage} countries={countries.length} paginado={paginado} />
            </div>
            <div className={home["home-country-container"]}>
            {
                currentCountries?.map((e) => {
                    return (
                        
                            <Link to={'/' + e.id}>
                            <Card name={e.name} continents={e.continents} flag={e.flag} />
                            </Link>
                        
                    );                        
                })
            }
            </div>
        <footer className={home.footer}>
            Countries Individual Project - SoyHenry
        </footer>
       </div>
    )
};