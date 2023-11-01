
from ..models import User, Product, db, environment, SCHEMA
from random import randint
from datetime import date
from sqlalchemy.sql import text




def seed_products():
    new_product_1 = Product(
        owner_id=1,
        title="2023 Home Kit",
        photo_url="https://galictogear.s3.us-west-1.amazonaws.com/2023.jpeg",
        description="Classic white home kit for the 2023/24 Season.",
        size='Small',
        price=250,
        created_at=date.today()
    )
    db.session.add(new_product_1)

    new_product_2 = Product(
        owner_id=2,
        title="Home Kit 2015",
        photo_url="https://galictogear.s3.us-west-1.amazonaws.com/Bb3.jpeg",
        description="Wear the home kit from the glory days of the BBC",
        size='Medium',
        price=250,
        created_at=date.today()
    )
    db.session.add(new_product_2)

    new_product_3 = Product(
        owner_id=3,
        title="David Beckham",
        photo_url="https://galictogear.s3.us-west-1.amazonaws.com/Beckham.jpeg",
        description="Grab a Real Madrid icon's jersey fresh off a new Netflix documentary.",
        size='Large',
        price=150,
        created_at=date.today()
    )
    db.session.add(new_product_3)

    new_product_4 = Product(
        owner_id=4,
        title="Blue Away Kit",
        photo_url="https://galictogear.s3.us-west-1.amazonaws.com/Blue.jpeg",
        description="Awesome older away kit worn by the stars.",
        size='Medium',
        price=100,
        created_at=date.today()
    )
    db.session.add(new_product_4)

    new_product_5 = Product(
        owner_id=5,
        title="Coentra Jersey",
        photo_url="https://galictogear.s3.us-west-1.amazonaws.com/Coentrao.jpeg",
        description="Portugues superstar iconic jersey.",
        size='Large',
        price=60,
        created_at=date.today()
    )
    db.session.add(new_product_5)

    new_product_6 = Product(
        owner_id=6,
        title="Classic Copa del Rey Jersey",
        photo_url="https://galictogear.s3.us-west-1.amazonaws.com/Copa.jpeg",
        description="Wear a piece of Real Madrid history.",
        size='Medium',
        price=210,
        created_at=date.today()
    )
    db.session.add(new_product_6)

    new_product_7 = Product(
        owner_id=7,
        title="Women's home kit",
        photo_url="https://galictogear.s3.us-west-1.amazonaws.com/female.jpeg",
        description="Real Madrid kit for women.",
        size='Small',
        price=100,
        created_at=date.today()
    )
    db.session.add(new_product_7)

    new_product_8 = Product(
        owner_id=8,
        title="Long Sleeve Women's Kit",
        photo_url="https://galictogear.s3.us-west-1.amazonaws.com/female2.jpeg",
        description="Support your club with this long sleeve collectible.",
        size='Extra Small',
        price=150,
        created_at=date.today()
    )
    db.session.add(new_product_8)

    new_product_9 = Product(
        owner_id=1,
        title="Eden Hazard Jersey",
        photo_url="https://galictogear.s3.us-west-1.amazonaws.com/Hazard.jpeg",
        description="For those few Real Madrid Hazard supporters.",
        size='Medium',
        price=20,
        created_at=date.today()
    )
    db.session.add(new_product_9)

    new_product_10 = Product(
        owner_id=1,
        title="Hazard Home Kit",
        photo_url="https://galictogear.s3.us-west-1.amazonaws.com/Hazard2.jpeg",
        description="Celebrate Eden's short time at the greatest club in the world.",
        size='Small',
        price=10,
        created_at=date.today()
    )
    db.session.add(new_product_10)

    new_product_11 = Product(
        owner_id=2,
        title="Isco's First Jersey",
        photo_url="https://galictogear.s3.us-west-1.amazonaws.com/Isco.jpeg",
        description="From signing day.",
        size='Small',
        price=300,
        created_at=date.today()
    )
    db.session.add(new_product_11)

    new_product_12 = Product(
        owner_id=2,
        title="Isco Home Kit",
        photo_url="https://galictogear.s3.us-west-1.amazonaws.com/Isco2.jpeg",
        description="Isco's home kit during his time at Madrid.",
        size='Large',
        price=160,
        created_at=date.today()
    )
    db.session.add(new_product_12)

    new_product_13 = Product(
        owner_id=2,
        title="Benzema Home Kit",
        photo_url="https://galictogear.s3.us-west-1.amazonaws.com/Karim.jpeg",
        description="Beautiful home kit worn by the man himself.",
        size='Medium',
        price=450,
        created_at=date.today()
    )
    db.session.add(new_product_13)

    new_product_14 = Product(
        owner_id=3,
        title="Karim Home Kit",
        photo_url="https://galictogear.s3.us-west-1.amazonaws.com/Karim2.jpeg",
        description="Home kit during an impressive run for the club.",
        size='Small',
        price=250,
        created_at=date.today()
    )
    db.session.add(new_product_14)

    new_product_15 = Product(
        owner_id=4,
        title="Benzema Away Kit",
        photo_url="https://galictogear.s3.us-west-1.amazonaws.com/Karim3.jpeg",
        description="Stylish blue away kit.",
        size='Medium',
        price=200,
        created_at=date.today()
    )
    db.session.add(new_product_15)

    new_product_16 = Product(
        owner_id=5,
        title="Ozil Jersey",
        photo_url="https://galictogear.s3.us-west-1.amazonaws.com/Ozil.jpeg",
        description="Home Ozil kit.",
        size='Extra Large',
        price=90,
        created_at=date.today()
    )
    db.session.add(new_product_16)

    new_product_17 = Product(
        owner_id=6,
        title="Pepe Jersey",
        photo_url="https://galictogear.s3.us-west-1.amazonaws.com/Pepe.jpeg",
        description="Legendary defender's home jersey.",
        size='Medium',
        price=100,
        created_at=date.today()
    )
    db.session.add(new_product_17)

    new_product_18 = Product(
        owner_id=6,
        title="Sergio Ramos Jersey",
        photo_url="https://galictogear.s3.us-west-1.amazonaws.com/Ramos.jpeg",
        description="Legendary defender's black and purple alternate away jersey.",
        size='Medium',
        price=100,
        created_at=date.today()
    )
    db.session.add(new_product_18)

    new_product_19 = Product(
        owner_id=6,
        title="Cristiano Ronaldo Blue Alternate Jersey",
        photo_url="https://galictogear.s3.us-west-1.amazonaws.com/Ronaldo2.jpeg",
        description="The goat's away jersey. I know you recognize it from his champions bicycle kick againts Juventus",
        size='Medium',
        price=600,
        created_at=date.today()
    )
    db.session.add(new_product_19)

    new_product_20 = Product(
        owner_id=6,
        title="Ronaldo CR7 Jersey",
        photo_url="https://galictogear.s3.us-west-1.amazonaws.com/Ronaldo3.jpeg",
        description="The goat's home jersey.",
        size='Medium',
        price=500,
        created_at=date.today()
    )
    db.session.add(new_product_20)

    new_product_21 = Product(
        owner_id=6,
        title="Zinedine Zidane",
        photo_url="https://galictogear.s3.us-west-1.amazonaws.com/Zidane.jpeg",
        description="Zizu home jersey.",
        size='Medium',
        price=240,
        created_at=date.today()
    )
    db.session.add(new_product_21)

    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
