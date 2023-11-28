from ..models import Favorite, db, User, Product, environment, SCHEMA
from random import randint
from datetime import date
from sqlalchemy.sql import text


def seed_favorites():
    new_favorite1 = Favorite(
            user_id = 1,
            product_id = 1,
            created_at = date.today()

        )
    new_favorite2 = Favorite(
            user_id = 2,
            product_id = 2,
            created_at = date.today()

        )
    new_favorite3 = Favorite(
            user_id = 3,
            product_id = 3,
            created_at = date.today()

        )
    new_favorite4 = Favorite(
            user_id = 4,
            product_id = 4,
            created_at = date.today()

        )
    new_favorite5 = Favorite(
            user_id = 5,
            product_id = 5,
            created_at = date.today()

        )
    new_favorite6 = Favorite(
            user_id = 6,
            product_id = 6,
            created_at = date.today()

        )
    new_favorite7 = Favorite(
            user_id = 7,
            product_id = 7,
            created_at = date.today()

        )
    new_favorite8 = Favorite(
            user_id = 8,
            product_id = 8,
            created_at = date.today()

        )
    new_favorite9 = Favorite(
            user_id = 9,
            product_id = 9,
            created_at = date.today()

        )
    new_favorite10 = Favorite(
            user_id = 10,
            product_id = 10,
            created_at = date.today()

        )
    new_favorite11 = Favorite(
            user_id = 1,
            product_id = 2,
            created_at = date.today()

        )
    new_favorite12 = Favorite(
            user_id = 1,
            product_id = 3,
            created_at = date.today()

        )
    new_favorite13 = Favorite(
            user_id = 1,
            product_id = 4,
            created_at = date.today()

        )
    new_favorite14 = Favorite(
            user_id = 1,
            product_id = 5,
            created_at = date.today()

        )
    new_favorite15 = Favorite(
            user_id = 1,
            product_id = 6,
            created_at = date.today()

        )
    new_favorite16 = Favorite(
            user_id = 1,
            product_id = 7,
            created_at = date.today()

        )
    new_favorite17 = Favorite(
            user_id = 1,
            product_id = 8,
            created_at = date.today()

        )
    new_favorite18 = Favorite(
            user_id = 1,
            product_id = 9,
            created_at = date.today()

        )
    new_favorite19 = Favorite(
            user_id = 1,
            product_id = 10,
            created_at = date.today()

        )
    new_favorite20 = Favorite(
            user_id = 1,
            product_id = 11,
            created_at = date.today()

        )

    favorites_list = [new_favorite1, new_favorite2, new_favorite3, new_favorite4, new_favorite5, new_favorite6, new_favorite7, new_favorite8, new_favorite9, new_favorite10, new_favorite11, new_favorite12, new_favorite13, new_favorite14, new_favorite15, new_favorite16, new_favorite17, new_favorite18, new_favorite19, new_favorite20]
    [db.session.add(favorite) for favorite in favorites_list]
    db.session.commit()

def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()
