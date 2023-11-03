import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllProductsThunk } from "../../../store/product";
import OpenModalButton from "../../OpenModalButton";
import UpdateProductModal from "../UpdateProductModal";
import DeleteProductModal from "../DeleteProductModal";

export default function GetProducts() {
    const { push } = useHistory();
    const dispatch = useDispatch();
    const getAllProducts = useSelector((state) => state.products.allProducts);
    const productsToDisplay = Object.values(getAllProducts);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getAllProductsThunk());
    }, [dispatch]);

    const goToProduct = useCallback((product) => {
        push(`/products/${product?.id}`);
    }, [push]);

    return (
        <div className="allproducts-container">
            {productsToDisplay.map((product) => (
                <div onClick={() => goToProduct(product)} key={product?.id}>
                    <img
                        src={product.photoUrl}
                        alt=""
                        className="userproducts-images"
                    ></img>
                    <div className="Product-Details-Buttons">
                        {user.id === product.ownerId && (
                            <div>
                                <OpenModalButton
                                    buttonText="Update Product"
                                    modalComponent={<UpdateProductModal productId={product.id} />}
                                />
                            </div>
                        )}

                        {user.id === product.ownerId && (
                            <div>
                                <OpenModalButton
                                    buttonText="Delete Product"
                                    modalComponent={
                                        <DeleteProductModal
                                            productId={product.id}
                                        />
                                    }
                                />
                            </div>
                        )}
                    </div>
                    <p>{product.title}</p>
                    <p>Rating</p>
                    <p>${product.price}</p>
                    <p>{product.size}</p>
                </div>
            ))}
        </div>
    );
}
