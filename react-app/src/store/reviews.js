//types

const GET_REVIEWS = "/get_reviews";
const CREATE_REVIEW = "/create_review"


//action creator

const actionGetReviews = (review) => ({ type: GET_REVIEWS, review });
const actionCreateReview = (review) => ({ type: CREATE_REVIEW, review })

//thunks

//GetAllReviewsThunk
export const GetAllReviewsThunk = () => async (dispatch) => {
    const res = await fetch("/api/reviews/");
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetReviews(data));
        return data;
    } else {
        const errors = await res.json();
        return errors;
    }
};

// createReviewThunk
export const createReviewThunk = (productId, review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/new/products/${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
    });

    if (response.ok) {
        const data = await response.json();

        dispatch(actionCreateReview(data));
        return data;
    } else {
        const errors = await response.json();
        return errors;
    }
};

// Reducer

const initialState = { allReviews: {} };

export default function reviewsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_REVIEWS:
            newState = { ...state, allReviews: {} };
            action.review.forEach((critique) => (newState.allReviews[critique.id] = critique));
            return newState;
        case CREATE_REVIEW:
            newState = {
                ...state,
                allReviews: { ...state.allReviews },
            };
            newState.allReviews[action.review.id] = action.review;
            return newState;
        default:
            return state;
    }
}
