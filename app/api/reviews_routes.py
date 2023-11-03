from flask import Blueprint, request
from ..models import db, Review, Product
from ..forms import ReviewForm
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from datetime import date


review_routes = Blueprint('reviews', __name__)


@review_routes.route('/new/products/<int:id>', methods=['POST'])
@login_required
def create_review(id):
    """Create a Review"""
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_review = Review(
            user_id=current_user.id,
            product_id=id,
            review=form.data['review'],
            stars=form.data['stars'],
            created_at=date.today()
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@review_routes.route('/<int:id>/update/products/', methods=['PUT'])
@login_required
def update_review(id):
    """Update a review based on reviewId"""
    review_to_update = Review.query.get(id)

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_review = form.data['review']
        new_stars = form.data['stars']
        review_to_update.review = new_review
        review_to_update.stars = new_stars

        db.session.commit()

        return review_to_update.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@review_routes.route('/')
@login_required
def get_all_reviews():
    """Get all the reviews"""
    all_reviews = Review.query.all()
    return [review.to_dict() for review in all_reviews]


@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review_to_delete = Review.query.get(id)
    db.session.delete(review_to_delete)
    db.session.commit()
    return {"Message": "Review Deleted"}
