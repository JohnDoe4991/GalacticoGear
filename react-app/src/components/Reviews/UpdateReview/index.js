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
    const [hoveredStars, setHoveredStars] = useState(0);
    const [selectedStars, setSelectedStars] = useState(0);
    const [stars, setStars] = useState(0)
    const { closeModal, setOnModalClose } = useModal();
    const getReviews = useSelector(
        (state) => state.reviews.allReviews);
    const singleReview = getReviews[reviewId]


    const [review, setReview] = useState(singleReview.review);

    const handleMouseEnter = (stars) => {
        setHoveredStars(stars);
    };

    const handleMouseLeave = () => {
        setHoveredStars(0);
    };

    const handleStarClick = (stars) => {
        setStars(stars)
        setSelectedStars(stars);
    };

    useEffect(() => {
        dispatch(GetAllReviewsThunk());
    }, [dispatch]);

    useEffect(() => {
        const errorsObject = {};

        if (review.length < 10) {
            errorsObject.review = "Review must be more than 10 characters."
        }

        if (!selectedStars) {
            errorsObject.selectedStars = "Please select a star rating"
        }

        setdisableSubmitButton(!(review.length >= 10));
        setValidationObject(errorsObject)
    }, [selectedStars, review])

    useEffect(() => {
        setdisableSubmitButton(!(stars >= 1 && review.length >= 10));
    }, [stars, review]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedReview = {
            review: review,
            stars: stars,
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
                {validationObject.selectedStars && (
                    <p className="errors-one"> {validationObject.selectedStars}</p>
                )}
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((stars) => (
                        <span
                            key={stars}
                            className={`star ${hoveredStars >= stars || selectedStars >= stars ? 'lit' : ''}`}
                            onMouseEnter={() => handleMouseEnter(stars)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleStarClick(stars)}
                        >
                            &#9733;
                        </span>
                    ))}
                    Stars
                </div>

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