import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getProductDetailsThunk } from "../../../store/product";

export default function ProductDetailPage() {
    const { id } = useParams();
    const { push } = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const allProducts = useSelector((state) => state.products.allProducts);
    const product = allProducts[id];

    if (product === undefined) return null;


    return (
        <div className="product-detail-container">
            <div className="detail-content">
                <img className="detail-photo" src={product.photoUrl} alt="" />
                <div className="right-side-detail">
                    <h2>{product.price}</h2>
                    <p>{product.title},{" "} {product.description}</p>
                    <p>{product.size}</p>
                    <button className="cart-button" type="button" onClick={() => alert("Feature Coming Soon...")}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}
