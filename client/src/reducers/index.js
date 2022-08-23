
const initialState = {
    countries: [],
    activities: [],
    continents: [],
    allAct: [],
    population: [],
    countryDetail: [],

};

function rootReducer(state= initialState, action) {
    switch(action.type) {
        case 'GET_COUNTRIES':
            return{
                ...state,
                countries: action.payload,
                continents: action.payload,
                allAct: action.payload,
                population: action.payload
            }
        case 'GET_ACTIVITIES':
            return{
                ...state,
                activities: action.payload,
            }
        case 'BY_CONTINENT':
            const continents = state.continents;
            const filterContinents = action.payload === 'All' ? continents : continents.filter(e => e.continents === action.payload)
            return {
                ...state,
                countries: filterContinents
            }
        case 'BY_ACTIVITY':
            const countryByAct = state.allAct;
            const activityFilter = action.payload === 'All' ? countryByAct.filter(e => e.activities.length > 0) :
            countryByAct.filter(c => c.activities.find((element) => element.name.toLowerCase() === action.payload))
            return {
                ...state,
                countries: activityFilter
            }
        case 'BY_ODER_ALPH':
            const orderAlph = action.payload === 'Asc' ?
                state.countries.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1
                    }
                    return 0;
                }) :
                state.countries.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                countries: orderAlph
            }
        case 'BY_POPULATION':
            const orderPop = action.payload === 'Min' ?
                state.countries.sort(function (a, b) {
                    if (a.population > b.population) {
                        return 1;
                    }
                    if (b.population > a.population) {
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function (a, b) {
                    if (a.population > b.population) {
                        return -1;
                    }
                    if (b.population > a.population) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                population: orderPop
            }
        case 'BY_COUNTRY_NAME':
            return {
                ...state,
                countries: action.payload
            }
        case 'GET_DETAIL':

            return {
                ...state,
                countryDetail: action.payload
            }
        case 'POST_ACTIVITY':
            return {
                ...state
            }
        case 'CLEAN_DETAIL':
            return {
                ...state,
                countryDetail:[]
            }
        default:
            return state;
    };
};

export default rootReducer;