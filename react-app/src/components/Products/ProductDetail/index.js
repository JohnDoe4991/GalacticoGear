import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllProductsThunk, getProductDetailsThunk } from "../../../store/product";
import OpenModalButton from "../../OpenModalButton";
import UpdateProductModal from "../UpdateProductModal";
import DeleteProductModal from "../DeleteProductModal"
import { GetAllReviewsThunk } from "../../../store/reviews";
import CreateReviewForm from "../../Reviews/CreateReview";
import UpdateReviewModal from "../../Reviews/UpdateReview";
import DeleteReviewModal from "../../Reviews/DeleteReviewModal";


const renderStars = (stars) => {
    const starIcons = [];

    for (let i = 1; i <= 5; i++) {
        starIcons.push(
            <span
                key={i}
                className={`stars ${i <= stars ? 'lits' : ''}`}
            >
                {i <= stars ? '🏆' : ' '}
            </span>
        );
    }

    return starIcons;
};


export default function ProductDetailPage() {
    const { id } = useParams();
    const { push } = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const allProducts = useSelector((state) => state.products.allProducts);
    const reviews = useSelector((state) => state.reviews.allReviews)


    const product = allProducts[id];


    useEffect(() => {
        dispatch(getAllProductsThunk());
        dispatch(GetAllReviewsThunk());
    }, [dispatch]);

    const fixDate = (dateString) => {
        const date = new Date(dateString);
        const formatter = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        return formatter.format(date);
    };

    if (product === undefined) return null;
    if (reviews === undefined) return null;


    const reviewsArray = Object.values(reviews).filter(
        (review) => review.productId == id
    );

    const randomPeopleCount = Math.floor(Math.random() * 100) + 1;




    return (
        <div className="product-detail-container">
            <div className="detail-content">
                <div className="photo-container">
                    <img className="detail-photo" src={product.photoUrl} alt="" />
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
                </div>
                <div className="right-side-detail">
                    <h3 className="detail-h3">In demand. {randomPeopleCount} people bought this in the last 24 hours.</h3>
                    <h2 className="detail-price">${product.price}+ {product.id === 10 && <h3 className="discount">🎄75% off for the holidays🎄</h3>}</h2>
                    <p className="detail-title">{product.title},{" "} {product.description}</p>
                    <p className="detail-size">{product.size}</p>
                    <div className="detail-container">
                        <p className="Item-details">Item Details</p>
                        <h3 className="handmade">✋ Handmade</h3>
                        <p className="detail-title">{product.title},{" "} {product.description}</p>
                        <h3 className="handmade">🏎️ Free shipping</h3>
                        <div className="carbon-container">
                            <p className="carbon-p">GalacticoGear offsets carbon emissions from shipping and packaging on this purchase</p>
                        </div>
                        <p className="handmade"><span className="detail-span">GalacticoGear Purchase Protection:</span> Shop confidently on GalacticoGear
                            knowing if something goes wrong with an order, we've got your back for all eligible purchases!</p>
                    </div>
                </div>
            </div>
            <div className="comments-container">
                {reviewsArray.length !== undefined && reviewsArray.length === 1 && (<h3 className="num-reviews">{reviewsArray.length}{"  "}Review</h3>)}
                {reviewsArray && reviewsArray.length > 1 && <h3 className="num-reviews">{reviewsArray.length} {"  "}Reviews</h3>}
                <div className="past-comments">
                    {reviewsArray && reviewsArray.length >= 1 ? (
                        reviewsArray.map((review, index) => (
                            <div className="bottom-comments" key={index}>
                                <div className="bot-comment-bunch">

                                    <p className="postdetails-datedate">
                                        {fixDate(review.createdAt)}
                                    </p>
                                    <div className="star-rating1">
                                        {renderStars(review.stars)}
                                    </div>
                                    <p className="postdetail-comment">
                                        "{review.review}"
                                    </p>

                                    {review.userId === (user.id ? user.id : null) && (
                                        <OpenModalButton
                                            buttonText="Update Review"
                                            modalComponent={
                                                <UpdateReviewModal
                                                    reviewId={review.id}
                                                    productId={id}
                                                />
                                            }
                                        />
                                    )}
                                    {review.userId === (user.id ? user.id : null) && (
                                        <OpenModalButton
                                            buttonText="Delete Review"
                                            modalComponent={
                                                <DeleteReviewModal
                                                    reviewId={review.id}
                                                    id={id}
                                                />
                                            }
                                        />
                                    )}
                                </div>
                                <hr></hr>
                            </div>

                        ))
                    ) : (
                        <div className="be-the-first">
                            Be the first to post a review!
                        </div>
                    )}
                </div>
                {user.id !== product.ownerId && (
                    <div className="create-review-button">
                        <OpenModalButton
                            buttonText="Post Review"
                            modalComponent={
                                <CreateReviewForm
                                    productId={id}
                                />
                            }
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
