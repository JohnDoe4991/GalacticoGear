from faker import Faker
from ..models import User, Product, Review, db, environment, SCHEMA
from random import randint
from datetime import date
from sqlalchemy.sql import text

fake = Faker()


def seed_reviews():
    new_Review1 = Review(
        user_id=1,
        product_id=1,
        review=fake.text(),
        created_at=date.today()
    )
    new_Review2 = Review(
        user_id=1,
        product_id=1,
        review=fake.text(),
        created_at=date.today()
    )
    new_Review3 = Review(
        user_id=1,
        product_id=1,
        review=fake.text(),
        created_at=date.today()
    )
    new_Review4 = Review(
        user_id=randint(1, len(User.query.all())),
        product_id=1,
        review=fake.text(),
        created_at=date.today()
    )
    new_Review5 = Review(
        user_id=randint(1, len(User.query.all())),
        product_id=2,
        review=fake.text(),
        created_at=date.today()
    )
    new_Review6 = Review(
        user_id=randint(1, len(User.query.all())),
        product_id=3,
        review=fake.text(),
        created_at=date.today()
    )
    new_Review7 = Review(
        user_id=randint(1, len(User.query.all())),
        product_id=1,
        review=fake.text(),
        created_at=date.today()
    )
    new_Review8 = Review(
        user_id=randint(1, len(User.query.all())),
        product_id=1,
        review=fake.text(),
        created_at=date.today()
    )
    new_Review9 = Review(
        user_id=randint(1, len(User.query.all())),
        product_id=1,
        review=fake.text(),
        created_at=date.today()
    )
    new_Review10 = Review(
        user_id=randint(1, len(User.query.all())),
        product_id=1,
        review=fake.text(),
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
