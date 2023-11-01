from .db import db, environment, SCHEMA, add_prefix_for_prod


class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")))
    title = db.Column(db.String(50), nullable=False)
    photo_url = db.Column(db.String, nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    size = db.Column(db.String(15), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    my_product_user_id = db.relationship(
        "User", back_populates="my_product_id")
    my_product_review_id = db.relationship(
        "Review", back_populates="my_review_product_id", cascade="all, delete-orphan")

    def to_dict(self):
        return_dict = {
            "id": self.id,
            "ownerId": self.owner_id,
            "title": self.title,
            "photoUrl": self.photo_url,
            "description": self.description,
            "size": self.size,
            "price": self.price,
            "createdAt": self.created_at,
            'users': self.my_product_user_id.to_dict(),
        }

        return return_dict
