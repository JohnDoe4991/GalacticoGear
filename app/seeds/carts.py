from ..models import Cart, db, environment, SCHEMA
from random import randint
from datetime import date
from sqlalchemy.sql import text


def seed_carts():
    new_cart1 = Cart(
        user_id=1,
        product_id=1,
        created_at=date.today()

    )
    new_cart2 = Cart(
        user_id=2,
        product_id=2,
        created_at=date.today()

    )
    new_cart3 = Cart(
        user_id=3,
        product_id=3,
        created_at=date.today()

    )
    new_cart4 = Cart(
        user_id=4,
        product_id=4,
        created_at=date.today()

    )
    new_cart5 = Cart(
        user_id=5,
        product_id=5,
        created_at=date.today()

    )
    new_cart6 = Cart(
        user_id=6,
        product_id=6,
        created_at=date.today()

    )
    new_cart7 = Cart(
        user_id=7,
        product_id=7,
        created_at=date.today()

    )
    new_cart8 = Cart(
        user_id=8,
        product_id=8,
        created_at=date.today()

    )
    new_cart9 = Cart(
        user_id=9,
        product_id=9,
        created_at=date.today()

    )
    new_cart10 = Cart(
        user_id=10,
        product_id=10,
        created_at=date.today()

    )
    new_cart11 = Cart(
        user_id=1,
        product_id=2,
        created_at=date.today()

    )
    new_cart12 = Cart(
        user_id=1,
        product_id=3,
        created_at=date.today()

    )
    new_cart13 = Cart(
        user_id=1,
        product_id=4,
        created_at=date.today()

    )
    new_cart14 = Cart(
        user_id=1,
        product_id=5,
        created_at=date.today()

    )
    new_cart15 = Cart(
        user_id=1,
        product_id=6,
        created_at=date.today()

    )
    new_cart16 = Cart(
        user_id=1,
        product_id=7,
        created_at=date.today()

    )
    new_cart17 = Cart(
        user_id=1,
        product_id=8,
        created_at=date.today()

    )
    new_cart18 = Cart(
        user_id=1,
        product_id=9,
        created_at=date.today()

    )
    new_cart19 = Cart(
        user_id=1,
        product_id=10,
        created_at=date.today()

    )
    new_cart20 = Cart(
        user_id=1,
        product_id=11,
        created_at=date.today()

    )

    carts_list = [new_cart1, new_cart2, new_cart3, new_cart4, new_cart5, new_cart6, new_cart7, new_cart8, new_cart9, new_cart10,
                  new_cart11, new_cart12, new_cart13, new_cart14, new_cart15, new_cart16, new_cart17, new_cart18, new_cart19, new_cart20]
    [db.session.add(cart) for cart in carts_list]
    db.session.commit()


def undo_carts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))

    db.session.commit()
