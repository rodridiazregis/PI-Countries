import * as ac from './ActCreation.module.css';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { postActivity, getCountries } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Form() {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);

    const [formData, setFormData] = useState({
        name: '',
        country: '',
        season: [],
        difficulty: '',
        duration: ''
    });
    
    function handleFormChange(e) {
        //destructuring of e.target
        const {name, value} = e.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            };
        });
    };

    function handleCheck(e) {
        if(e.target.checked) {
            setFormData({
                ...formData,
                season: [...formData.season, e.target.value]
                //if checked add to local state formData
            })
        } else setFormData(prevFormData => {
            return {
                ...formData,
                season: prevFormData.season.filter(s => s !== e.target.value)
                //if unchecked remove from local state formData
            };
        });
    };

    // falta varios paises en simultaneo
    function handleSubmit(e) {
        e.preventDefault();

        let seasonString = {
            ...formData,
            season: formData.season.join(', ')
        }; //the back was expecting an string in season property instead of an array, so JOIN!

        console.log(countries[0].name)
        if(formData.name === '') return alert('An activity name is required.');
        
        // else if(countries.some(c => c.name.includes(formData.country))) return alert('That Activity name is already used')
        else if (formData.country === '') return alert('You need to choose a country.');
        else if (!formData.season.length) return alert('You need to check unleast one season of the year.')
        else if (formData.difficulty === '') return alert('You need to indicate the difficulty.')
        else if (formData.duration === '0') return alert('The duration of the activity cannot be 0.');
        else 
        dispatch(postActivity(seasonString)); //dispatching modified  formDataSeason as payload
        alert('Activity Succesfully Created!');
        setFormData({
            name: '',
            country: '',
            season: [],
            difficulty: '',
            duration: ''
        });
    }

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch]);

    return (

        <div className={ac['navBarContainer']}>               
        <form onSubmit={handleSubmit}>
            <fieldset>
            <legend>Name your Activity</legend>
            <input 
            className={ac['inputName']}
            type="text"
            placeholder="Activity Name"
            onChange={handleFormChange}
            name= 'name'
            value={formData.name} />
            </fieldset>
            <fieldset>
            <legend>Select your Country</legend>
                <select
                className={ac['country']}
                id="country"
                value={formData.country}
                onChange={handleFormChange}
                name='country'>
                    <option value=''>-- Choose --</option>
                    {
                            countries.map((c) => (
                                <option value={c.name}>{c.name}</option>
                            ))
                        }
                </select>
            </fieldset>
            <br />
            <fieldset>
            <legend>Choose the Season/s</legend>
            <label>
                <input 
                id='Summer' 
                type="checkbox" 
                name='Summer' 
                value="Summer"
                onChange={handleCheck}/>
            Summer</label>
            <label>
                <input 
                id='Autumn' 
                type="checkbox" 
                name='Autumn' 
                value="Autumn"
                onChange={handleCheck}/>
            Autumn</label>
            <label>
                <input 
                id='Winter' 
                type="checkbox" 
                name='Winter' 
                value="Winter"
                onChange={handleCheck}/>
            Winter</label>
            <label>
                <input 
                id='Spring' 
                type="checkbox" 
                name='Spring' 
                value="Spring"
                onChange={handleCheck}/>
            Spring</label>
            </fieldset>
            <br />
            <fieldset>
                <legend>Choose the Level of Difficulty</legend>                
                <input 
                    type="radio"
                    id="Easy"
                    name='difficulty'
                    value='Easy'
                    checked={formData.difficulty === 'Easy'}
                    onChange={handleFormChange}
                />
                <label>Easy</label>                                
                <input 
                    type="radio"
                    id="Average"
                    name='difficulty'
                    value='Average'
                    checked={formData.difficulty === 'Average'}
                    onChange={handleFormChange}
                />
                <label>Average</label>                                
                <input 
                    type="radio"
                    id="Hard"
                    name='difficulty'
                    value='Hard'
                    checked={formData.difficulty === 'Hard'}
                    onChange={handleFormChange}
                />
                <label>Hard</label>
                <input 
                    type="radio"
                    id="Super Hard"
                    name='difficulty'
                    value='Super Hard'
                    checked={formData.difficulty === 'Super Hard'}
                    onChange={handleFormChange}
                />
                <label>Super Hard</label>
                <input 
                    type="radio"
                    id="Expert"
                    name='difficulty'
                    value='Expert'
                    checked={formData.difficulty === 'Expert'}
                    onChange={handleFormChange}
                />
                <label>Expert</label>                                   
            </fieldset>
            <br />            
            <fieldset>
            <legend>Choose the Duration Time</legend>
            <label>(Hs): </label>
            <input 
            type='number' 
            name="duration"
            value={formData.duration} 
            min="0" 
            max="96"
            onChange={handleFormChange} />
            </fieldset>
            <br />
            <button className={ac['butn']}>Submit</button>
            <br />
            <Link className={ac['link']} to='/home'>
            <button className={ac['butn']}>Go Back</button>
            </Link>
        </form>
        </div>
    )
}