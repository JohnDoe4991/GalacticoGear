import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllProductsThunk } from "../../../store/product";

export default function GetProducts() {
    const { push } = useHistory();
    const dispatch = useDispatch();
    const getAllProducts = useSelector((state) => state.products.allProducts);
    const productsToDisplay = Object.values(getAllProducts);

    useEffect(() => {
        dispatch(getAllProductsThunk());
    }, [dispatch]);

    const goToProduct = useCallback((product) => {
        push(`/products/${product.id}`);
    }, [push]);

    return (
        <div className="allproducts-container">
            {productsToDisplay.map((product) => (
                <div onClick={() => goToProduct(product)} key={product.id}>
                    <img
                        src={product.photoUrl}
                        alt=""
                        className="userproducts-images"
                    ></img>
                    <p>{product.title}</p>
                    <p>Rating</p>
                    <p>${product.price}</p>
                    <p>{product.size}</p>
                </div>
            ))}
        </div>
    );
}
