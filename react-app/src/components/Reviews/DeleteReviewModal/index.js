import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteReviewThunk } from "../../../store/reviews";
import { getAllProductsThunk } from "../../../store/product";
import { useParams, useHistory } from "react-router-dom";


export default function DeleteReviewModal({ reviewId, id }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const { push } = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        return dispatch(deleteReviewThunk(reviewId))
            .then(closeModal())
            .then(push(`/products/${id}`));
    };

    return (
        <div id="delete-review-modal-container">
            <h1 className="confirm-delete">Delete Review</h1>
            <p className="delete-writing">Are you sure you want to remove this review?</p>
            <button
                className="delete-da-bttn"
                onClick={handleSubmit}
            >
                Yes (Delete review)
            </button>
            <button className="cancel-delete" onClick={closeModal}>
                No (Keep review)
            </button>
        </div >
    );
}
