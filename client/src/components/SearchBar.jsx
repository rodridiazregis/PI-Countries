import * as sb from './SearchBar.module.css';
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { byName } from '../actions';



export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        console.log(name)
        
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(byName(name));
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
            <input
            className={sb['inputText']} 
            type="text" 
            placeholder="Search..." 
            onChange={handleInputChange}/>
            <button 
            className={sb['srctBtn']}
            type="submit">Search</button>
            </form>
        </div>
    );
};