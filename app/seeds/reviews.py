from ..models import User, Product, Review, db, environment, SCHEMA
from random import randint, choice
from datetime import date
from sqlalchemy.sql import text


real_review_texts = [
    "I love this product! It exceeded my expectations.",
    "The quality of this product is fantastic.",
    "This is a great value for the price.",
    "I'm very satisfied with my purchase.",
    "The product arrived in perfect condition.",
    "I would highly recommend this product to others.",
    "It fits perfectly and is very comfortable.",
    "I'm impressed with the design and functionality.",
    "This is exactly what I was looking for.",
    "I can't wait to use this product again.",
    "I love the Real Madrid jersey! It's amazing!",
    "The quality of the jersey is top-notch.",
    "This is the best jersey I've ever had.",
    "I'm a huge Real Madrid fan, and this jersey is perfect.",
    "The jersey arrived quickly and in great condition.",
    "I'm impressed with the design and comfort of the jersey.",
    "The colors are vibrant, just like Real Madrid's spirit!",
    "I can't wait to wear this jersey to the next match.",
    "It fits perfectly and feels great on me.",
    "I recommend this jersey to all Real Madrid fans!"
]


def seed_reviews():
    all_reviews = []
    user_ids = [user.id for user in User.query.all()]

    for _ in range(50):
        user_id = randint(1, len(user_ids))
        product_id = randint(1, len(Product.query.all()))
        
        review_text = choice(real_review_texts)
        created_at = date.today()

        new_review = Review(
            user_id=user_id,
            product_id=product_id,
            review=review_text,
            created_at=created_at
        )

        all_reviews.append(new_review)

    db.session.add_all(all_reviews)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
