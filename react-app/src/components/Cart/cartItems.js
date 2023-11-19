import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    thunkCreateCart,
    thunkDeleteCart,
    thunkGetAllCarts,
} from "../../store/cart";

export default function CartItems({ productId, userId }) {
    const dispatch = useDispatch();
    const getAllCartItems = useSelector((state) => state.cartItems.allCarts);
    const [cart, setCart] = useState(null);

    const userCartItems = Object.values(getAllCartItems).filter(
        (cart) => cart.userId == userId
    );

    const thisProductCarts = userCartItems.filter(
        (cart) => cart.productId == productId
    );

    let cartId;
    if (thisProductCarts.length) {
        cartId = thisProductCarts[0]?.id;
    }
    const deleteCart = async () => {
        const res = await dispatch(thunkDeleteCart(cartId));
        if (res.errors) {
            return setCart(true);
        } else {
            return setCart(false);
        }
    };

    const createCart = async () => {
        const res = await dispatch(thunkCreateCart(productId));
        dispatch(thunkGetAllCarts());

        if (res.errors) return setCart(true);
    };

    useEffect(() => {
        dispatch(thunkGetAllCarts());
    }, [dispatch, cart]);

    return (
        <div>
            <button
                hidden={!thisProductCarts.length}
                className="cart-button"
                onClick={() => {
                    deleteCart();
                    alert("Item removed from cart");
                }}
            >
                Remove From Cart
            </button>
            <button
                hidden={thisProductCarts.length}
                className="cart-button"
                onClick={() => {
                    createCart();
                    alert("Item added to cart");
                }}
            >
                Add to Cart
            </button>
        </div>
    );
}
