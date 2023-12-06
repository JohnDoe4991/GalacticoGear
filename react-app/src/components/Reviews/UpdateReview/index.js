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
    const [validationObject, setValidationObject] = useState({});
    const [disableSubmitButton, setdisableSubmitButton] = useState(true);
    const [hoveredStars, setHoveredStars] = useState(0);
    const [selectedStars, setSelectedStars] = useState(0);
    const [stars, setStars] = useState(0);
    const { closeModal, setOnModalClose } = useModal();
    const getReviews = useSelector((state) => state.reviews.allReviews);
    const singleReview = getReviews[reviewId];

    const [review, setReview] = useState(singleReview.review);

    useEffect(() => {
        dispatch(GetAllReviewsThunk());
    }, [dispatch]);

    useEffect(() => {
        const errorsObject = {};

        if (review.length < 10 || review.length > 350) {
            errorsObject.review = "Review must be between 10 - 350 characters.";
        }

        if (!selectedStars) {
            errorsObject.selectedStars = "Please click a rating";
        }

        setdisableSubmitButton(!(review.length >= 10));
        setValidationObject(errorsObject);
    }, [selectedStars, review]);

    useEffect(() => {
        setdisableSubmitButton(!(stars >= 1 && review.length >= 10));
    }, [stars, review]);

    useEffect(() => {

        setSelectedStars(singleReview.stars);
        setStars(singleReview.stars);
    }, [singleReview]);

    const handleMouseEnter = (stars) => {
        setHoveredStars(stars);
    };

    const handleMouseLeave = () => {
        setHoveredStars(0);
    };

    const handleStarClick = (stars) => {
        setStars(stars);
        setSelectedStars(stars);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedReview = {
            review: review,
            stars: stars,
        };

        dispatch(updateReviewThunk(updatedReview, reviewId));

        setReview("");
        setStars("");

        return closeModal();
    };

    return (
        <div className="update-review-container">
            <h1 className="update-review1">Update Review</h1>
            <form onSubmit={handleSubmit} className="review-form-container">
                <h3 className="review-h3">Review</h3>
                <div className="error-box">
                    {validationObject.review && (
                        <p className="errors-one3"> {validationObject.review}</p>
                    )}
                </div>
                <label>
                    <textarea
                        type="text"
                        id="review-text-area"
                        value={review}
                        placeholder="Add a review about this photo..."
                        onChange={(e) => setReview(e.target.value)}
                    />
                </label>
                {validationObject.selectedStars && (
                    <p className="errors-one4"> {validationObject.selectedStars}</p>
                )}
                <h3 className="review-h3">Rating</h3>
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`star ${(hoveredStars >= star || selectedStars >= star)
                                ? 'lit'
                                : ''
                                }`}
                            onMouseEnter={() => handleMouseEnter(star)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleStarClick(star)}
                        >
                            {selectedStars >= star ? '🏆' : '⚽️'}
                        </span>
                    ))}
                </div>

                <button
                    type="submit"
                    className="review-submit1"
                    disabled={Object.keys(validationObject).length > 0}
                >
                    Update Review
                </button>
            </form>
        </div>
    );
}
