import { ADD_FAV, REMOVE_FAV, ORDER, FILTER_STATUS } from "./action-types"

const initialState = {
    myFavorites: [],
    allFavorites: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAV:
            return { ...state, myFavorites: action.payload, allFavorites: action.payload };
        // case ADD_FAV:
        //     return {
        //         ...state,
        //         myFavorites: [...state.myFavorites, action.payload],
        //         allFavorites: [...state.allFavorites, action.payload]
        //     };
        case REMOVE_FAV:
            return { ...state, myFavorites: action.payload };
        // case REMOVE_FAV:
        //     return {
        //         ...state,
        //         myFavorites: state.myFavorites.filter(
        //             (character) => character.id !== action.payload
        //         )
        //     };
        case FILTER_STATUS:
            return {
                ...state,
                myFavorites: state.allFavorites.filter(
                    (favorite) => favorite.status === action.payload
                )
            };
        case ORDER:
            const favoritesOrdered = action.payload === 'A'
                ? [...state.myFavorites].sort((a, b) => a.id - b.id)
                : [...state.myFavorites].sort((a, b) => b.id - a.id);
            return {
                ...state,
                myFavorites: favoritesOrdered
            };
        default:
            return state;
    }
};
export default reducer;