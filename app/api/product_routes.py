from flask import Blueprint, request
from ..models import Product, db
from datetime import date
from flask_login import login_required, current_user
from ..forms import ProductForm
from .aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from .auth_routes import validation_errors_to_error_messages

product_routes = Blueprint('products', __name__)


@product_routes.route('/new', methods=['GET', 'POST'])
@login_required
def new_post():
    form = ProductForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        url = upload['url']

        product = Product(
            owner_id=current_user.id,
            title=form.data['title'],
            photo_url=url,
            description=form.data['description'],
            size=form.data['size'],
            price=form.data['price'],
            created_at=date.today()
        )

        db.session.add(product)
        db.session.commit()

        return {"resPost": product.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@product_routes.route("/")
def get_all_products():
    """returns a all products"""
    products = Product.query.all()

    return [post.to_dict() for post in products]


@product_routes.route('/<int:id>')
@login_required
def get_product_details(id):
    """returns a single product"""
    product = Product.query.get(id)

    return product.to_dict()
