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



    return (
        <div className="product-detail-container">
            <div className="detail-content">
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
                <div className="right-side-detail">
                    <h2>{product.price}</h2>
                    <p>{product.title},{" "} {product.description}</p>
                    <p>{product.size}</p>
                    <button className="cart-button" type="button" onClick={() => alert("Feature Coming Soon...")}>Add to cart</button>
                </div>
            </div>
            <div className="comments-container">
                <div className="past-comments">
                    {reviewsArray && reviewsArray.length >= 1 ? (
                        reviewsArray.map((review, index) => (
                            <div className="bottom-comments" key={index}>
                                <div className="bot-comment-bunch">

                                    <p className="postdetails-datedate">
                                        {fixDate(review.createdAt)}
                                    </p>
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
                            </div>
                        ))
                    ) : (
                        <div className="be-the-first">
                            Be the first to post a review!
                        </div>
                    )}
                </div>

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
            </div>
        </div>
    )
}
