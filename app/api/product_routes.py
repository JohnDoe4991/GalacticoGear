from flask import Blueprint, request
from ..models import Product, db
from datetime import date
from flask_login import login_required, current_user
from ..forms import ProductForm, UpdateProductForm
from .aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from .auth_routes import validation_errors_to_error_messages

product_routes = Blueprint('products', __name__)


@product_routes.route('/new', methods=['GET', 'POST'])
@login_required
def new_product():
    """Creates a products"""
    form = ProductForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print("form is valid")
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


@product_routes.route("/update/<int:id>", methods=["PUT"])
@login_required
def update_product(id):
    """Updates a products"""
    product_to_update = Product.query.get(id)
    form = UpdateProductForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        product_title = form.data['title']
        product_description = form.data['description']
        product_size = form.data['size']
        product_price = form.data['price']

        product_to_update.title = product_title
        product_to_update.description = product_description
        product_to_update.size = product_size
        product_to_update.price = product_price

        db.session.commit()

        return {"updated": "updated"}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@product_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    """Deletes a specific product"""
    product_to_delete = Product.query.get(id)
    if id < 21:
        db.session.delete(product_to_delete)
        db.session.commit()
        return 'Success, your product was deleted.'
    elif id > 20:

        file_delete = remove_file_from_s3(product_to_delete.photo_url)

        db.session.delete(product_to_delete)
        db.session.commit()
        return 'Success, your product was deleted.'
    else:
        return {"Error": "Product Delete Error, please try again"}


@product_routes.route("/")
def get_all_products():
    """returns a all products"""
    products = Product.query.all()

    return [product.to_dict() for product in products]


@product_routes.route('/<int:id>')
@login_required
def get_product_details(id):
    """returns a single product"""
    product = Product.query.get(id)

    return product.to_dict()
