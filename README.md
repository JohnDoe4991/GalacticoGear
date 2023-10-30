# Flask React Project

This is the starter for the Flask React project.

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/

<!--!!START SILENT -->
<!-- # AirBnB Clone -->
# Gotham Eatz
<!--!!END -->
<!--!!ADD -->
<!-- # `<name of application here>` -->
<!--!!END_ADD -->

## Database Schema Design

<!--!!START SILENT -->
![uberEats-database-schema]

[uberEats-database-schema]: https://github.com/amalakkad93/GothamEat/blob/main/app/database_design/ubereat-database-schema.png?raw=true
[uberEats-db-diagram-info]: app/database_design/db-schema.diagram.txt
<!--!!END -->
<!--!!ADD -->
<!-- `<insert database schema design here>` -->
<!--!!END_ADD -->

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: true
* Request
  <!--!!START SILENT -->
  * Method: GET
  * URL: /api/session
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response when there is a logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "username": "Demo",
        "email": "demo@io.com"
      }
    }
    ```

* Successful Response when there is no logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": null
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  <!--!!START SILENT -->
  * Method: POST
  * URL: /api/session
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "credential": "demo@io.com",
      "password": "password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "username": "Demo",
        "email": "demo@io.com"
      }
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  <!--!!START SILENT -->
  * Method: POST
  * URL: /api/users
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "username": "Demo",
      "email": "demo@io.com",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "username": "Demo",
        "email": "demo@io.com"
      }
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: User already exists with the specified username
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "lastName": "Last Name is required",
        "firstName": "First Name is required",
        "username": "Username is required",
        "email": "Invalid email",
      }
    }
    ```

## RESTAURANTS
### Get all Restaurants

Returns all the Restaurants.

* Require Authentication: false
* Request
  <!--!!START SILENT -->
  * Method: GET
  * URL: /api/restaurants
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Restaurants": [
        {
          "id": 1,
          "ownerId": 1,
          "banner_image_path": "path/to/image.jpg",
          "street_address": "123 Main St",
          "city": "New York",
          "state": "NY",
          "postal_code": "10001",
          "country": "USA",
          "name": "John's Diner",
          "description": "Classic American diner.",
          "opening_time": "07:00",
          "closing_time": "22:00",
          "average_rating": 4.5,
        }
      ]
    }
    ```

### Get all Restaurants owned by the Current User

Returns all the Restaurants owned (created) by the current user.

* Require Authentication: true
* Request
  <!--!!START SILENT -->
  * Method: GET
  * URL: /api/restaurants/current
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Restaurants": [
        {
          "id": 1,
          "ownerId": 1,
          "banner_image_path": "path/to/image.jpg",
          "street_address": "123 Main St",
          "city": "New York",
          "state": "NY",
          "postal_code": "10001",
          "country": "USA",
          "name": "John's Diner",
          "description": "Classic American diner.",
          "opening_time": "07:00",
          "closing_time": "22:00",
          "stars": 4.5,
        }
      ]
    }
    ```

### Get details of a restaurant from an id

Returns the details of a restaurant specified by its id.

* Require Authentication: false
* Request
  <!--!!START SILENT -->
  * Method: GET
  * URL: /api/restaurants/:restaurantId
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "banner_image_path": "path/to/image.jpg",
      "street_address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "postal_code": "10001",
      "country": "USA",
      "name": "John's Diner",
      "description": "Classic American diner.",
      "opening_time": "07:00",
      "closing_time": "22:00",
      "stars": 4.5,
      "number_reviews": 5,
      "MenuItemImg": [
        {
          "id": 1,
          "image_path": "image url",
        },
        {
          "id": 2,
          "image_path": "image url",
        }
      ],
      "Owner": {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "username": "Demo",
        "email": "demo@io.com"
      }
    }
    ```

* Error response: Couldn't find a restaurant with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "restaurant couldn't be found"
    }
    ```

### Create a restaurant

Creates and returns a new restaurant.

* Require Authentication: true
* Request
  <!--!!START SILENT -->
  * Method: POST
  * URL: /api/restaurants
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "banner_image_path": "path/to/image.jpg",
      "street_address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "postal_code": "10001",
      "country": "USA",
      "name": "John's Diner",
      "description": "Classic American diner.",
      "opening_time": "07:00",
      "closing_time": "22:00",
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "banner_image_path": "path/to/image.jpg",
      "street_address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "postal_code": "10001",
      "country": "USA",
      "name": "John's Diner",
      "description": "Classic American diner.",
      "opening_time": "07:00",
      "closing_time": "22:00",
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "banner_image_path": "Banner image is required",
        "street_address": "Street address is required",
        "city": "City is required",
        "state": "State is required",
        "postal_code":"Zip code is required ",
        "country": "Country is required",
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "opening_time": "Opening time is required",
        "closing_time": "Closing time is required",
      }
    }
    ```
### Edit a Restaurant

Updates and returns an existing restaurant.

* Require Authentication: true
* Require proper authorization: restaurant must belong to the current user
* Request
  <!--!!START SILENT -->
  * Method: PUT
  * URL: /api/restaurant/:restaurantId
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "banner_image_path": "path/to/image.jpg",
      "street_address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "postal_code": "10001",
      "country": "USA",
      "name": "John's Diner",
      "description": "Classic American diner.",
      "opening_time": "07:00",
      "closing_time": "22:00",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "banner_image_path": "path/to/image.jpg",
      "street_address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "postal_code": "10001",
      "country": "USA",
      "name": "John's Diner",
      "description": "Classic American diner.",
      "opening_time": "07:00",
      "closing_time": "22:00",
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "banner_image_path": "Banner image is required",
        "street_address": "Street address is required",
        "city": "City is required",
        "state": "State is required",
        "postal_code":"Zip code is required ",
        "country": "Country is required",
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "opening_time": "Opening time is required",
        "closing_time": "Closing time is required",
      }
    }
    ```

* Error response: Couldn't find a restaurant with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "restaurant couldn't be found"
    }
    ```

### Delete a restaurant

Deletes an existing restaurant.

* Require Authentication: true
* Require proper authorization: restaurant must belong to the current user
* Request
  <!--!!START SILENT -->
  * Method: DELETE
  * URL: /api/restaurants/:restaurantId
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a restaurant with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "restaurant couldn't be found"
    }
    ```

## REVIEWS

### Get all Reviews of the Current User

Returns all the reviews written by the current user.

* Require Authentication: true
* Request
  <!--!!START SILENT -->
  * Method: GET
  * URL: /api/reviews/current
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Reviews": [
        {
          "id": 1,
          "userId": 1,
          "restaurantId": 1,
          "review": "This was an awesome restaurant!",
          "stars": 5,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36" ,
          "User": {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe"
          },
          "restaurant": {
            "id": 1,
            "ownerId": 1,
            "banner_image_path": "path/to/image.jpg",
            "street_address": "123 Main St",
            "city": "New York",
            "state": "NY",
            "postal_code": "10001",
            "country": "USA",
            "name": "John's Diner",
            "description": "Classic American diner.",
            "opening_time": "07:00",
            "closing_time": "22:00",
          },
          "ReviewImages": [
            {
              "id": 1,
              "url": "image url"
            }
          ]
        }
      ]
    }
    ```

### Get all Reviews by a restaurant's id

Returns all the reviews that belong to a restaurant specified by id.

* Require Authentication: false
* Request
  <!--!!START SILENT -->
  * Method: GET
  * URL: /api/restaurants/:restaurantId/reviews
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Reviews": [
        {
          "id": 1,
          "userId": 1,
          "restaurantId": 1,
          "review": "This was an awesome restaurant!",
          "stars": 5,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36" ,
          "User": {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe"
          },
          "ReviewImages": [
            {
              "id": 1,
              "url": "image url"
            }
          ],
        }
      ]
    }
    ```

* Error response: Couldn't find a restaurant with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "restaurant couldn't be found"
    }
    ```

### Create a Review for a restaurant based on the restaurant's id

Create and return a new review for a restaurant specified by id.

* Require Authentication: true
* Request
  <!--!!START SILENT -->
  * Method: POST
  * URL: /api/Restaurants/:restaurantId/reviews
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "review": "This was an awesome restaurant!",
      "stars": 5,
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "restaurantId": 1,
      "review": "This was an awesome restaurant!",
      "stars": 5,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5",
      }
    }
    ```

* Error response: Couldn't find a restaurant with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "restaurant couldn't be found"
    }
    ```

* Error response: Review from the current user already exists for the restaurant
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already has a review for this restaurant"
    }
    ```

### Add an Image to a Review based on the Review's id

Create and return a new image for a review specified by id.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  <!--!!START SILENT -->
  * Method: POST
  * URL: /api/reviews/:reviewId/images
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "url": "image url"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "url": "image url"
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found"
    }
    ```

* Error response: Cannot add any more images because there is a maximum of 10
  images per resource
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Maximum number of images for this resource was reached"
    }
    ```

### Edit a Review

Update and return an existing review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  <!--!!START SILENT -->
  * Method: PUT
  * URL: /api/reviews/:reviewId
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "review": "This was an awesome restaurant!",
      "stars": 5,
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "restaurantId": 1,
      "review": "This was an awesome restaurant!",
      "stars": 5,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5",
      }
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found"
    }
    ```

### Delete a Review

Delete an existing review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  <!--!!START SILENT -->
  * Method: DELETE
  * URL: /api/reviews/:reviewId
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found"
    }
    ```

    ## MENU ITEMS

### **Get all Menu Items for a Restaurant**

Returns all the Menu Items for a given restaurant.

* **Require Authentication**: false
* **Request**
  <!--!!START SILENT -->
  * **Method**: GET
  * **URL**: /api/restaurants/:restaurantId/menu-items
  <!--!!END -->
  * **Body**: none

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * **Content-Type**: application/json
  * **Body**:

    ```json
    {
      "MenuItems": [
        {
          "id": 1,
          "restaurantId": 1,
          "name": "Blueberry tart",
          "description": "Sweet blueberries in a flaky tart.",
          "type": "desserts",
          "price": 4.99
        }
      ]
    }
    ```

### **Add a New Menu Item for a Restaurant**

Allows a restaurant owner to add a new menu item.

* **Require Authentication**: true
* **Request**
  <!--!!START SILENT -->
  * **Method**: POST
  * **URL**: /api/restaurants/:restaurantId/menu-items
  <!--!!END -->
  * **Headers**:
    * **Content-Type**: application/json
  * **Body**:

    ```json
    {
      "name": "Blueberry pie",
      "description": "Sweet blueberries in a flaky pie.",
      "type": "desserts",
      "price": 5.00
    }
    ```

* **Successful Response**
  * **Status Code**: 201
  * **Headers**:
    * **Content-Type**: application/json
  * **Body**:

    ```json
    {
      "id": 19,
      "restaurantId": 1,
      "name": "Blueberry pie",
      "description": "Sweet blueberries in a flaky pie.",
      "type": "desserts",
      "price": 5.00
    }
    ```

### **Edit a Menu Item**

Allows a restaurant owner to edit an existing menu item.

* **Require Authentication**: true
* **Request**
  <!--!!START SILENT -->
  * **Method**: PUT
  * **URL**: /api/menu-items/:menuItemId
  <!--!!END -->
  * **Headers**:
    * **Content-Type**: application/json
  * **Body**:

    ```json
    {
      "name": "Blueberry pie",
      "description": "Sweet blueberries in a flaky pie.",
      "type": "desserts",
      "price": 6.00
    }
    ```

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * **Content-Type**: application/json
  * **Body**:

    ```json
    {
      "id": 19,
      "restaurantId": 1,
      "name": "Blueberry pie",
      "description": "Sweet blueberries in a flaky pie.",
      "type": "desserts",
      "price": 6.00
    }
    ```

### **Delete a Menu Item**

Allows a restaurant owner to delete an existing menu item.

* **Require Authentication**: true
* **Request**
  <!--!!START SILENT -->
  * **Method**: DELETE
  * **URL**: /api/menu-items/:menuItemId
  <!--!!END -->
  * **Body**: none

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * **Content-Type**: application/json
  * **Body**:

    ```json
    {
      "message": string
    }
    ```

---

## MENU ITEM IMAGES

### **Add Image for a Menu Item**

Adds an image to a specific menu item.

* **Require Authentication**: true
* **Request**
  <!--!!START SILENT -->
  * **Method**: POST
  * **URL**: /api/menu-items/:menuItemId/images
  <!--!!END -->
  * **Headers**:
    * **Content-Type**: application/json
  * **Body**:

    ```json
    {
      "imagePath": "imag.png"
    }
    ```

* **Successful Response**
  * **Status Code**: 201
  * **Headers**:
    * **Content-Type**: application/json
  * **Body**:

    ```json
    {
      "id": 3,
      "menuItemId": 1,
      "imagePath": "imag.png"
    }
    ```

### **Delete Image of a Menu Item**

Deletes an image from a menu item.

* **Require Authentication**: true
* **Request**
  <!--!!START SILENT -->
  * **Method**: DELETE
  * **URL**: /api/menu-item-images/:imageId
  <!--!!END -->
  * **Body**: none

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * **Content-Type**: application/json
  * **Body**:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```
