//types

const GET_ALL_PRODUCTS = "/get_all_products";
const GET_PRODUCT_DETAIL = "/product_details"


//action creator

const actionGetProducts = (products) => ({ type: GET_ALL_PRODUCTS, products });
const actionGetProductDetails = (product) => ({ type: GET_PRODUCT_DETAIL, product });


//Thunks


//getAllProducts
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

//getProductDetailThunk
export const getProductDetailsThunk = (id) => async (dispatch) => {
   const res = await fetch(`/api/products/${id}`);
   if (res.ok) {
      const data = await res.json();
      dispatch(actionGetProductDetails(data));
      return data;
   } else {
      const errors = await res.json();
      return errors;
   }
};

//createProductThunk
export const createProductThunk = (form) => async (dispatch) => {
   const res = await fetch("/api/products/new", {
      method: "POST",
      body: form,
   });

   if (res.ok) {
      const { resPost } = await res.json();
      dispatch(actionGetProductDetails(resPost));
      return resPost;
   } else {
      const data = await res.json();
      return data;
   }
};

const initialState = { allProducts: {} };

export default function productReducer(state = initialState, action) {
   let newState;
   switch (action.type) {
      case GET_ALL_PRODUCTS:
         newState = { ...state, allProducts: {} };
         action.products.forEach((product) => (newState.allProducts[product.id] = product));
         return newState;
      case GET_PRODUCT_DETAIL:
         newState = { ...state, allProducts: { ...state.allProducts } };
         newState.allProducts[action.product.id] = action.product;
         return newState;
      default:
         return state;
   }
}
