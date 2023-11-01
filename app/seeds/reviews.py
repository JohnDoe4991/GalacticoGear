from ..models import User, Product, Review, db, environment, SCHEMA
from random import randint
from datetime import date


def seed_reviews():
    new_Review1 = Review(
        user_id=1,
        product_id=1,
        review="I love the Real Madrid jersey! It's amazing!",
        created_at=date.today()
    )
    new_Review2 = Review(
        user_id=1,
        product_id=1,
        review="The quality of the jersey is top-notch.",
        created_at=date.today()
    )
    new_Review3 = Review(
        user_id=1,
        product_id=1,
        review="This is the best jersey I've ever had.",
        created_at=date.today()
    )
    new_Review4 = Review(
        user_id=randint(1, len(User.query.all())),
        product_id=1,
        review="I'm a huge Real Madrid fan, and this jersey is perfect.",
        created_at=date.today()
    )
    new_Review5 = Review(
        user_id=randint(1, len(User.query.all())),
        product_id=2,
        review="The jersey arrived quickly and in great condition.",
        created_at=date.today()
    )
    new_Review6 = Review(
        user_id=randint(1, len(User.query.all())),
        product_id=3,
        review="I'm impressed with the design and comfort of the jersey.",
        created_at=date.today()
    )
    new_Review7 = Review(
        user_id=randint(1, len(User.query.all())),
        product_id=1,
        review="The colors are vibrant, just like Real Madrid's spirit!",
        created_at=date.today()
    )
    new_Review8 = Review(
        user_id=randint(1, len(User.query.all())),
        product_id=1,
        review="I can't wait to wear this jersey to the next match.",
        created_at=date.today()
    )
    new_Review9 = Review(
        user_id=randint(1, len(User.query.all())),
        product_id=1,
        review="It fits perfectly and feels great on me.",
        created_at=date.today()
    )
    new_Review10 = Review(
        user_id=randint(1, len(User.query.all())),
        product_id=1,
        review="I recommend this jersey to all Real Madrid fans!",
        created_at=date.today()
    )
    all_Reviews = [new_Review1, new_Review2, new_Review3, new_Review4, new_Review5,
                   new_Review6, new_Review7, new_Review8, new_Review9, new_Review10]
    [db.session.add(Review) for Review in all_Reviews]
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
