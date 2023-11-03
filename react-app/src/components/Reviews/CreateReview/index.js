import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    createReviewThunk,
    GetAllReviewsThunk,
} from "../../../store/reviews";
import { useModal } from "../../../context/Modal";


export default function CreateReviewForm({ productId }) {
    //    const { push } = useHistory();
    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const { closeModal } = useModal();
    const [validationObject, setValidationObject] = useState({})
    const [disableSubmitButton, setdisableSubmitButton] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newReview = {
            review: review,
        };

        dispatch(createReviewThunk(productId, newReview));
        setReview("");
        return dispatch(GetAllReviewsThunk()).then(closeModal());
    };


    useEffect(() => {
        const errorsObject = {};

        if (review.length < 10) {
            errorsObject.review = "Review must be more than 10 characters."
        }
        setdisableSubmitButton(!(review.length >= 10));
        setValidationObject(errorsObject)
    }, [review])


    return (
        <div className="post-review-container">
            <h1 className="post-reviewh1">Post Review</h1>
            <div className="error-box">
                {validationObject.review && <p
                    className="errors-one"> {validationObject.review}</p>}
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
