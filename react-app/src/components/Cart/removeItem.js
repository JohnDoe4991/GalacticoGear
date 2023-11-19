import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    thunkCreateCart,
    thunkDeleteCart,
    thunkGetAllCarts,
} from "../../store/cart";

export default function RemoveItem({ productId, userId }) {
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

    useEffect(() => {
        dispatch(thunkGetAllCarts());
    }, [dispatch, cart]);

    return (
        <div>
            <button
                hidden={!thisProductCarts.length}
                className="remove-item-button"
                onClick={() => {
                    deleteCart();
                }}
            >
                X
            </button>
        </div>
    );
}
