import axios from 'axios';

export function getCountries() {
    return async function(dispatch) {
        let json = await axios.get('http://localhost:3001/countries', {})
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        });
    };
};

export function getActivities(payload) {
    return async function(dispatch) {
        let json = await axios.get('http://localhost:3001/activities', {})
        return dispatch({
            type: 'GET_ACTIVITIES',
            payload: json.data
        });
    };
};

export function byContinent(payload) {
    return {
        type: 'BY_CONTINENT',
        payload
    };
};

export function byActivity(payload) {
    return {
        type: 'BY_ACTIVITY',
        payload
    };
};

export function byOrderAlph(payload) {
    return {
        type: 'BY_ODER_ALPH',
        payload
    };
};

export function byPopulation(payload) {
    return {
        type: 'BY_POPULATION',
        payload
    };
};

export function byName(payload) {
    return async function (dispatch) {
        try {
            let json = await axios.get('http://localhost:3001/countries?name=' + payload);
            return dispatch({
                type: 'BY_COUNTRY_NAME',
                payload: json.data
            });
        } catch (error) {
            console.log(error);
        };
    };
};

export function postActivity(payload) {
    return async function (dispatch) {
        const json = axios.post('http://localhost:3001/activities', payload);
        return dispatch({
            type: 'POST_ACTIVITY',
            payload: json.data
        });
    };
};


// export default function getDetail(id) {
//     return async (dispatch) => {
//       const json = await axios.get(`http://localhost:3001/countries/${id}`);
//       dispatch({ 
//         type: 'GET_DETAIL', 
//         payload: json.data 
//         });
//     };
// }

//trying with fetch
export function getDetail(id) {
    return async function(dispatch) {
        return fetch(`http://localhost:3001/countries/${id}`)
        .then ((res) => res.json())
        .then((json) => 
        dispatch({
            type: 'GET_DETAIL',
            payload: json
        })
    )}
}

export function cleanDetail() {
    return async function(dispatch) {
        return dispatch({
            type: 'CLEAN_DETAIL'
        })
        
    }}

