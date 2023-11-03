import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useParams, useHistory } from "react-router-dom";
import {
    GetAllReviewsThunk,
    updateReviewThunk,
} from "../../../store/reviews";

export default function UpdateReviewModal({ reviewId }) {
    const dispatch = useDispatch();
    const [validationObject, setValidationObject] = useState({})
    const [disableSubmitButton, setdisableSubmitButton] = useState(true);
    const { closeModal, setOnModalClose } = useModal();
    const getReviews = useSelector(
        (state) => state.reviews.allReviews);
    const singleReview = getReviews[reviewId]
    console.log("🚀 ~ file: index.js:18 ~ UpdateReviewModal ~ singleReview :", singleReview )

    const [review, setReview] = useState(singleReview.review);

    useEffect(() => {
        dispatch(GetAllReviewsThunk());
    }, [dispatch]);

    useEffect(() => {
        const errorsObject = {};
        if (review.length < 10) {
            errorsObject.review = "Review must be more than 10 characters."
        }
        setValidationObject(errorsObject)
        setdisableSubmitButton(!(review.length >= 10));
    }, [review])


    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedReview = {
            review: review,
        };

        dispatch(updateReviewThunk(updatedReview, reviewId));

        setReview("");

        return closeModal();
    };

    return (
        <div className="update-review-container">
            <h1 className="update-review1">Update Review</h1>
            <div className="error-box">
                {validationObject.review && <p
                    className="errors-one"> {validationObject.review}</p>}
            </div>
            <form onSubmit={handleSubmit} className="review-form-container">
                <h3 className="review-h3">Review</h3>
                <label>
                    <textarea
                        type="text"
                        id="review-text-area"
                        value={review}
                        placeholder="Add a review about this photo..."
                        onChange={(e) => setReview(e.target.value)}
                    />
                </label>

                <button
                    type="submit"
                    className="review-submit"
                    disabled={Object.keys(validationObject).length > 0}
                >
                    Update Review
                </button>
            </form>
        </div>
    );
}
