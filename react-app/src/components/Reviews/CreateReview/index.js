import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    createReviewThunk,
    GetAllReviewsThunk,
} from "../../../store/reviews";
import { useModal } from "../../../context/Modal";
import "../../CSS/mycss.css";

export default function CreateReviewForm({ productId }) {
    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const { closeModal } = useModal();
    const [validationObject, setValidationObject] = useState({});
    const [disableSubmitButton, setdisableSubmitButton] = useState(true);
    const [hoveredStars, setHoveredStars] = useState(0);
    const [selectedStars, setSelectedStars] = useState(0);
    const [stars, setStars] = useState(0);

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

    useEffect(() => {
        const errorsObject = {};

        if (review.length < 10 || review.length > 1000) {
            errorsObject.review = "Review must be between 10 - 1000 characters.";
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const newReview = {
            review: review,
            stars: stars,
        };

        dispatch(createReviewThunk(productId, newReview));
        setReview("");
        return dispatch(GetAllReviewsThunk()).then(closeModal());
    };

    return (
        <div className="product-review-container">
            <h1 className="product-reviewh1">Post Review</h1>
            <div className="error-box">
                {validationObject.review && (
                    <p className="errors-one1"> {validationObject.review}</p>
                )}
            </div>
            <form onSubmit={handleSubmit} className="review-form-container">
                <label>
                    <textarea
                        type="text"
                        id="review-text-area1"
                        value={review}
                        placeholder="Add a review about this photo..."
                        onChange={(e) => setReview(e.target.value)}
                    />
                </label>
                {validationObject.selectedStars && (
                    <p className="errors-one12"> {validationObject.selectedStars}</p>
                )}
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`star ${(hoveredStars >= star || selectedStars >= star) ? 'lit' : ''
                                }`}
                            onMouseEnter={() => handleMouseEnter(star)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleStarClick(star)}
                        >
                            {selectedStars >= star ? '🏆' : '⚽️'}
                        </span>
                    ))}
                    Trophies
                </div>

                <button
                    type="submit"
                    className="review-submit"
                    disabled={Object.keys(validationObject).length > 0}
                >
                    Create Review
                </button>
            </form>
        </div>
    );
}
