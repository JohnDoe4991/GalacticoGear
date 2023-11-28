const GET_ONE_FAVORITE = "/get-one-favorite";
const GET_ALL_FAVORITES = "/get-all-favorites";
const DELETE_FAVORITE = "/delete-favorite";

// action creators
const actionGetOneFavorite = (favorite) => ({
   type: GET_ONE_FAVORITE,
   favorite,
});
const actionGetAllFavorites = (favorites) => ({
   type: GET_ALL_FAVORITES,
   favorites,
});
const actionDeleteFavorite = (favId) => ({ type: DELETE_FAVORITE, favId });

// thunks

export const thunkCreateFavorite = (productId) => async (dispatch) => {
   const res = await fetch(`/api/favorites/${productId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productId),
   });

   if (res.ok) {
      const data = await res.json();
      dispatch(actionGetOneFavorite(data));
      return data;
   } else {
      const errors = await res.json();
      return errors;
   }
};

export const thunkGetOneFavorite = (favId) => async (dispatch) => {
   const res = await fetch(`/api/favorites/${favId}`);

   if (res.ok) {
      const data = await res.json();
      dispatch(actionGetOneFavorite(data));
      return data;
   } else {
      const errors = await res.json();
      return errors;
   }
};

export const thunkGetAllFavorites = () => async (dispatch) => {
   const res = await fetch("/api/favorites/");

   if (res.ok) {
      const data = await res.json();
      dispatch(actionGetAllFavorites(data));
      return data;
   } else {
      const errors = await res.json();
      return errors;
   }
};

export const thunkDeleteFavorite = (favId) => async (dispatch) => {
   const res = await fetch(`/api/favorites/delete/${favId}`, {
      method: "DELETE",
   });

   if (res.ok) {
      const data = await res.json();
      dispatch(actionDeleteFavorite(favId));
      return data;
   } else {
      const errors = await res.json();
      return errors;
   }
};

// reducer

const initialState = { allFavorites: {} };

export default function favesReducer(state = initialState, action) {
   let newState;

   switch (action.type) {
      case GET_ONE_FAVORITE:
         newState = { ...state, allFavorites: { ...state.allFavorites } };
         newState.allFavorites[action.favorite.id] = action.favorite;
         return newState;

      case GET_ALL_FAVORITES:
         newState = { ...state, allFavorites: {} };
         action.favorites.forEach(
            (favorite) => (newState.allFavorites[favorite.id] = favorite)
         );
         return newState;

      case DELETE_FAVORITE:
         newState = { ...state, allFavorites: { ...state.allFavorites } };
         delete newState.allFavorites[action.favId];
         return newState;

      default:
         return state;
   }
}
