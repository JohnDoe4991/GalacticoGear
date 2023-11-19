import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { thunkGetAllCarts, thunkRemoveAllItemsFromCart } from "../../store/cart";
import { getAllProductsThunk } from "../../store/product";
import RemoveItem from "./removeItem";

export default function ShoppingCart() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const userCartsObject = useSelector((state) => state.cartItems.allCarts);
    const productsToDisplay = useSelector((state) => Object.values(state.products.allProducts));

    const [itemQuantities, setItemQuantities] = useState({});

    const userCarts = Object.values(userCartsObject).filter(
        (oneCart) => oneCart.userId === user.id
    );

    useEffect(() => {
        dispatch(thunkGetAllCarts());
        dispatch(getAllProductsThunk());
    }, [dispatch]);

    const calculateTotalPrice = (userCarts, productsToDisplay) => {
        let totalPrice = 0;
        userCarts.forEach((oneCart) => {
            const matchingProduct = productsToDisplay.find(
                (product) => product.id === oneCart.productId
            );
            if (matchingProduct) {
                const quantity = itemQuantities[oneCart.productId] || 1;
                totalPrice += matchingProduct.price * quantity;
            }
        });
        return totalPrice;
    };

    const handleQuantityChange = (productId, newQuantity) => {
        setItemQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: newQuantity,
        }));
    };

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
                    <p className="purchase-protection">
                        <span className="pp-span">GalacticoGear Purchase Protection:</span> Shop confidently on GalacticoGear
                        knowing if something goes wrong with an order, we've got your back for all eligible purchases!
                    </p>
                </div>
                <hr></hr>
                <h1 className="cart-header">{cartHeaderText}</h1>
                {userCarts.length === 0 && (
                    <Link className="empty-cart-photo" to={`/all`}>
                        <h2 className="unique">Discover something unique to fill it up</h2>
                        <img
                            className="shopping-photo"
                            src="https://galictogear.s3.us-west-1.amazonaws.com/online-shopping.jpeg"
                            alt=""
                        />
                    </Link>
                )}
                <div className="allproductsc-photos">
                    <div className="allphotos-left">
                        {userCarts.map((oneCart) => {
                            const matchingProduct = productsToDisplay.find(
                                (product) => product.id === oneCart.productId
                            );
                            if (matchingProduct) {
                                const quantity = itemQuantities[oneCart.productId] || 1;
                                return (
                                    <div
                                        className="product-container-cart"
                                        key={matchingProduct.id}
                                    >
                                        <Link to={`/products/${matchingProduct.id}`}>
                                            <img
                                                className="userpost-images"
                                                src={matchingProduct.photoUrl}
                                                alt={matchingProduct.title}
                                            />
                                        </Link>
                                        <div className="cart-info">
                                            <div className="remove-price">
                                                <h2 className="cart-item-price">
                                                    ${matchingProduct.price}
                                                </h2>
                                                <RemoveItem
                                                    productId={matchingProduct.id}
                                                    userId={user.id}
                                                />
                                            </div>
                                            <p className="cart-item-title">
                                                {matchingProduct.title},{" "}
                                                {matchingProduct.description}
                                            </p>
                                            <div className="quantity-selector">
                                                <div>
                                                    <label htmlFor={`quantity-${matchingProduct.id}`}>
                                                        Quantity:
                                                    </label>
                                                    <select
                                                        id={`quantity-${matchingProduct.id}`}
                                                        value={quantity}
                                                        onChange={(e) => {
                                                            handleQuantityChange(oneCart.productId, parseInt(e.target.value));
                                                        }}
                                                    >
                                                        {Array.from({ length: 10 }, (_, index) => (
                                                            <option key={index} value={index + 1}>
                                                                {index + 1}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <p className="cart-item-subtotal">
                                                    Item Subtotal: $
                                                    {(matchingProduct.price * quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                    {userCarts.length > 0 && (
                        <div className="payments">
                            <h2 className="payment-header">Pay</h2>
                            <div className="payment-total">
                                <h3 className="left-total">Item(s) total</h3>
                                <h3 className="cart-ss">${totalCartPrice.toFixed(2)}</h3>
                            </div>
                            <hr></hr>
                            <div className="sub-total">
                                <h3 className="bottom-total">Subtotal</h3>
                                <h3 className="cart-ss">${totalCartPrice.toFixed(2)}</h3>
                            </div>
                            <div className="shipping-total">
                                <h3 className="bottom-total">Shipping</h3>
                                <h3 className="cart-ss">Free</h3>
                            </div>
                            <button
                                className="remove-items-button2"
                                onClick={() => {
                                    dispatch(thunkRemoveAllItemsFromCart(user.id));
                                    window.alert("Thanks for your purchase!");
                                }}
                            >
                                Checkout
                            </button>
                            <p className="uplift">
                                The KickUp Fund supports nonprofits that provide resources to creative entrepreneurs in communities that need it most.
                            </p>
                            <p className="ribbon">🎗️</p>
                        </div>
                    )}
                </div>
            </div>
            <p className="green-day">🍃 GalacticoGear offsets carbon emissions from every delivery</p>
            <hr></hr>
            <div className="cart-footer">
                <div className="cfooter-top">
                    <div className="cfooter-left">
                        <h2 className="us-dollar">🇺🇸 United States | English(US) | $ (USD)</h2>
                    </div>
                    <div className="cfooter-right">@ 2023 GalacticoGear, Inc.</div>
                </div>
                <div className="cfooter-bottom">
                    <p className="merchant">Merchant is GalacticoGear, Inc. (USA), GalacticoGear Ireland UC (Ireland), GalacticoGear UK Limited (United Kingdom), GalacticoGear Canada Limited (Canada), or GalacticoGear Australia Pty Limited (Australia) depending on the currency and location of the payment instrument issuance.</p>
                    <p className="cart-donate">If you donate to the KickUp Fund, your Merchant for the donation amount will be Brooklyn Community Fund.</p>
                </div>
            </div>
        </div>
    );
}
