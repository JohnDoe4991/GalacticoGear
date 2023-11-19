from .db import db, environment, SCHEMA, add_prefix_for_prod


class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('products.id')),  nullable=False)
    created_at = db.Column(db.Date, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "productId": self.product_id,
            "createdAt": self.created_at,
        }
