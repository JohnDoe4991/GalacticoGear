from ..models import User, environment, SCHEMA, db
from sqlalchemy.sql import text
from random import randint
from datetime import date
from faker import Faker

fake = Faker()




def seed_users():
    new_user1 = User(
    first_name = 'Demo',
    last_name = 'User',
    username = 'DemoUser',
    email = 'Demouser@gmail.com',
    password = 'password'
    )
    new_user2 = User(
        first_name = 'Cristiano',
        last_name = 'Ronaldo',
        username = 'thegoat7',
        email = fake.email(),
        password = 'password'
        )
    new_user3 = User(
        first_name = 'Jude',
        last_name = 'Bellingham',
        username = 'heyJude',
        email = fake.email(),
        password = fake.password()
        )
    new_user4 = User(
        first_name = 'Karim',
        last_name = "Benzema",
        username = 'BigBenz9',
        email = fake.email(),
        password = fake.password()
        )
    new_user5 = User(
        first_name = 'David',
        last_name = 'Beckham',
        username = 'Bendit23',
        email = fake.email(),
        password = fake.password()
        )
    new_user6 = User(
        first_name = 'Raul',
        last_name = 'Gonzales',
        username = 'Raul7',
        email = fake.email(),
        password = fake.password()
        )
    new_user7 = User(
        first_name = 'Luka',
        last_name = 'Modric',
        username = 'Luka10',
        email = fake.email(),
        password = fake.password()
        )
    new_user8 = User(
        first_name = 'Zinedine',
        last_name = 'Zidane',
        username = 'Zizu5',
        email = fake.email(),
        password = fake.password()
        )
    new_user9 = User(
        first_name = 'Iker',
        last_name = 'Casillas',
        username = 'theWall',
        email = fake.email(),
        password = fake.password()
        )
    new_user10 = User(
        first_name = 'Alfredo',
        last_name = 'DiStefano',
        username = 'Legend',
        email = fake.email(),
        password = fake.password()
        )

    users_list = [new_user1, new_user2, new_user3, new_user4, new_user5, new_user6, new_user7, new_user8, new_user9, new_user10]
    [db.session.add(user) for user in users_list]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
