const GET_ONE_CART = "/get-one-cartItem";
const GET_ALL_CART = "/get-all-cartItems";
const DELETE_CART = "/delete-cartItem";
const REMOVE_ALL_ITEMS_FROM_CART = "/Remove-all-items-from-cart";

// action creators
const actionGetOneCartItem = (cart) => ({
    type: GET_ONE_CART,
    cart,
});
const actionGetAllCarts = (carts) => ({
    type: GET_ALL_CART,
    carts,
});
const actionDeleteCart = (cartId) => ({ type: DELETE_CART, cartId });

export const removeAllItemsFromCartAction = () => ({
    type: REMOVE_ALL_ITEMS_FROM_CART,
});

// thunks

export const thunkCreateCart = (productId) => async (dispatch) => {
    const res = await fetch(`/api/carts/${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productId),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetOneCartItem(data));
        return data;
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const thunkGetOneCart = (cartId) => async (dispatch) => {
    const res = await fetch(`/api/carts/${cartId}`);

    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetOneCartItem(data));
        return data;
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const thunkGetAllCarts = () => async (dispatch) => {
    const res = await fetch("/api/carts/");

    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetAllCarts(data));
        return data;
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const thunkDeleteCart = (productId) => async (dispatch) => {
    const res = await fetch(`/api/carts/delete/${productId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(actionDeleteCart(productId));
        return data;
    } else {
        const errors = await res.json();
        return errors;
    }
};


export const thunkRemoveAllItemsFromCart = (userId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/carts/removeAll/${userId}`, {
            method: "DELETE",
        });

        if (res.ok) {
            // Dispatch an action to update the Redux store
            dispatch(removeAllItemsFromCartAction());
            // You can also dispatch an action to fetch updated cart data if needed
            // dispatch(thunkGetAllCarts());
        } else {
            const errors = await res.json();
            // Handle any errors (e.g., display an error message)
        }
    } catch (error) {
        // Handle any unexpected errors
    }
};



const initialState = { allCarts: {} };

export default function cartItemReducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case GET_ONE_CART:
            newState = { ...state, allCarts: { ...state.allCarts } };
            newState.allCarts[action.cart.id] = action.cart;
            return newState;

        case GET_ALL_CART:
            newState = { ...state, allCarts: {} };
            action.carts.forEach(
                (cart) => (newState.allCarts[cart.id] = cart)
            );
            return newState;

        case DELETE_CART:
            newState = { ...state, allCarts: { ...state.allCarts } };
            delete newState.allCarts[action.cartId];
            return newState;

        case REMOVE_ALL_ITEMS_FROM_CART:

            return {
                ...state,
                allCarts: {},
            };

        default:
            return state;
    }
}
