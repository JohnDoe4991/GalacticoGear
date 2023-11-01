//types

const GET_ALL_PRODUCTS = "/get_all_products";


//action creator

const actionGetProducts = (products) => ({ type: GET_ALL_PRODUCTS, products });


//Thunks


//get
export const getAllProductsThunk = () => async (dispatch) => {
    const res = await fetch("/api/products/");
    if (res.ok) {
       const data = await res.json();
       dispatch(actionGetProducts(data));
       return data;
    } else {
       const errors = await res.json();
       return errors;
    }
 };


 const initialState = { allProducts: {}};

 export default function productReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
       case GET_ALL_PRODUCTS:
          newState = { ...state, allProducts: {} };
          action.products.forEach((product) => (newState.allProducts[product.id] = product));
          return newState;
       default:
          return state;
    }
 }
