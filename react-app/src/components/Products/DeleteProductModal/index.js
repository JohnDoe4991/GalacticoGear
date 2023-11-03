import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteProductThunk } from "../../../store/product";
import { useParams, useHistory } from "react-router-dom";

export default function DeleteProductModal({ productId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({});
    const { push } = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors({});

        return dispatch(deleteProductThunk(productId))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();

                if (data.errors) {
                    setErrors(data.errors);
                } else {
                }
            })
            .then(push(`/all`));
    };

    return (
        <div id="delete-product-modal-container">
            <h1 className="confirm-delete1">Delete Product</h1>
            <p className="delete-writing">
                Are you sure you want to remove this Product?
            </p>
            <button className="delete-da-bttn" onClick={handleSubmit}>
                Yes (Delete Product)
            </button>
            <button className="cancel-delete" onClick={closeModal}>
                No (Keep Product)
            </button>
        </div>
    );
}
