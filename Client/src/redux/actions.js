import { ADD_FAV, REMOVE_FAV, ORDER, FILTER_STATUS } from "./action-types"
import axios from "axios";

export const addFav = (character) => {
   const endpoint = 'http://localhost:3001/rickandmorty/fav';
   return async (dispatch) => {
      try {
         const { data } = await axios.post(endpoint, character);
         return dispatch({ type: ADD_FAV, payload: data });
      } catch (error) {
         console.log(error);
      }
   };
};
// export const addFav = (character) => {
//     return { type: ADD_FAV, payload: character}
// }
export const removeFav = (id) => {
   const endpoint = 'http://localhost:3001/rickandmorty/fav/' + id;
   return async (dispatch) => {
      try {
         const { data } = await axios.delete(endpoint);
         return dispatch({ type: REMOVE_FAV, payload: data });
      } catch {
         console.log(error);
      }
   };
};
// export const removeFav = (id) => {
//     return { type: REMOVE_FAV, payload: id}
// }
export const order = (order) => {
   return { type: ORDER, payload: order }
}
export const filterStatus = (status) => {
   return { type: FILTER_STATUS, payload: status }
}

