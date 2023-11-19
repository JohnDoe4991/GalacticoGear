import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { thunkGetAllCarts, thunkRemoveAllItemsFromCart } from "../../store/cart";
import { getAllProductsThunk } from "../../store/product";
import RemoveItem from "./removeItem";

const calculateTotalPrice = (userCarts, productsToDisplay) => {
    let totalPrice = 0;
    userCarts.forEach((oneCart) => {
        const matchingProduct = productsToDisplay.find(
            (product) => product.id === oneCart.productId
        );
        if (matchingProduct) {
            totalPrice += matchingProduct.price;
        }
    });
    return totalPrice;
};

export default function ShoppingCart() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const userCartsObject = useSelector((state) => state.cartItems.allCarts);
    const productsToDisplay = useSelector((state) => Object.values(state.products.allProducts));

    const userCarts = Object.values(userCartsObject).filter(
        (oneCart) => oneCart.userId === user.id
    );

    useEffect(() => {
        dispatch(thunkGetAllCarts());
        dispatch(getAllProductsThunk());
    }, [dispatch]);

    let cartHeaderText;
    if (userCarts.length === 0) {
        cartHeaderText = "Your cart is empty.";
    } else if (userCarts.length === 1) {
        cartHeaderText = "1 item in your cart";
    } else {
        cartHeaderText = `${userCarts.length} items in your cart`;
    }



    const totalCartPrice = calculateTotalPrice(userCarts, productsToDisplay);

    return (
        <div>
            {userCarts.length > 0 && (

                <button
                    className="remove-all-items-button"
                    onClick={() => {
                        dispatch(thunkRemoveAllItemsFromCart(user.id));
                        window.alert("Thanks for your purchase!");
                    }}
                >
                    Checkout
                </button>
            )}
            <div className="cart-items-container">
                <div className="purchase-protection-container">
                    🤝
                    <p className="purchase-protection"><span className="pp-span">GalacticoGear Purchase Protection:</span> Shop confidently on GalacticoGear
                        knowing if something goes wrong with an order, we've got your back for all eligible purchases!</p>
                </div>
                <hr></hr>
                <h1 className="cart-header">{cartHeaderText}</h1>
                {userCarts.length === 0 && <Link className="empty-cart-photo" to={`/all`}>
                    <h2 className="unique">Discover something unique to fill it up</h2>
                    <img className="shopping-photo" src="https://galictogear.s3.us-west-1.amazonaws.com/online-shopping.jpeg" alt=""></img></Link>}
                <div className="allproductsc-photos">
                    <div className="allphotos-left">
                        {userCarts.map((oneCart) => {
                            const matchingProduct = productsToDisplay.find(
                                (product) => product.id === oneCart.productId
                            );
                            if (matchingProduct) {
                                return (
                                    <div
                                        className="product-container-cart"
                                        key={matchingProduct.id}>
                                        <Link to={`/products/${matchingProduct.id}`}>
                                            <img
                                                className="userpost-images"
                                                src={matchingProduct.photoUrl}
                                                alt={matchingProduct.title}
                                            />
                                        </Link>
                                        <div className="cart-info">
                                            <div className="remove-price">
                                                <h2 className="cart-item-price">${matchingProduct.price}</h2>
                                                <RemoveItem productId={matchingProduct.id} userId={user.id} />
                                            </div>
                                            <p className="cart-item-title">{matchingProduct.title},{" "} {matchingProduct.description}</p>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                    <div className="payments">
                        <hr></hr>
                        <h2 className="payment-header">Pay</h2>
                        <div className="payment-total">
                            <h3>Item(s) total</h3>
                            <h3>${totalCartPrice.toFixed(2)}</h3>
                        </div>
                        <hr></hr>
                        <div className="sub-total">
                            <h3>Subtotal</h3>
                            <h3>${totalCartPrice.toFixed(2)}</h3>
                        </div>
                        <div className="shipping-total">
                            <h3>Shipping</h3>
                            <h3>Free</h3>
                        </div>
                        <button
                            className="remove-all-items-button"
                            onClick={() => {
                                dispatch(thunkRemoveAllItemsFromCart(user.id));
                                window.alert("Thanks for your purchase!");
                            }}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
            <p className="green-day">🍃 Etsy offsets carbon emissions from every delivery</p>
        </div>
    );
}
