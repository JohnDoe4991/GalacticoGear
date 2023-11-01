from flask import Blueprint
from ..models import Product
from flask_login import login_required, current_user

product_routes = Blueprint('products', __name__)


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
