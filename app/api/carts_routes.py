from flask import Blueprint, request
from ..models import Cart, db
from flask_login import login_required, current_user
from datetime import date
from .auth_routes import validation_errors_to_error_messages

cart_routes = Blueprint('carts', __name__)


@cart_routes.route('/<int:id>', methods=["POST"])
@login_required
def create_cart(id):

    new_form = Cart(
        user_id=current_user.id,
        product_id=id,
        created_at=date.today()
    )

    db.session.add(new_form)
    db.session.commit()
    return new_form.to_dict()


@cart_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_cart(id):
    cart_to_delete = Cart.query.get(id)

    if (cart_to_delete):

        db.session.delete(cart_to_delete)
        db.session.commit()
        return {"message": "Cart Item Deleted!"}
    else:
        return {'errors': "No cartItem to delete"}

@cart_routes.route('/removeAll/<int:user_id>', methods=['DELETE'])
@login_required
def remove_all_items_from_cart(user_id):
    carts_to_delete = Cart.query.filter_by(user_id=user_id).all()

    if carts_to_delete:
        for cart in carts_to_delete:
            db.session.delete(cart)
        db.session.commit()
        return {"message": "All Cart Items Deleted!"}
    else:
        return {'errors': "No cartItems to delete"}



@cart_routes.route('/')
def get_all_carts():
    carts = Cart.query.all()

    return [cart.to_dict() for cart in carts]
