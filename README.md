# GalacticoGear

GalacticoGear is an etsy inspired eccomerce site that allows users to create products, review products, and search for products using a searchbar.

Try it [here:](https://galacticogear.onrender.com/)
1. Click on the Menu icon in the upper-right and select `Log In`
2. Click on the `Login as Demo User` button or Login/ Signup using Google
3. Use profile button to navigate through the cart and favorites or logout 

### Technology Used
* Python
* Flask
* React.js
* Redux
* Docker
* Amazon Web Services (AWS)
* Render

## Screenshots

### Profile Navigation
![Screenshot 2023-11-28 at 10 31 51 AM](https://github.com/JohnDoe4991/GalacticoGear/assets/127167614/a94244f8-dde1-4a7a-92a1-d83f7d69fc9a)

### Landing Page 
![Screenshot 2023-11-08 at 1 55 35 PM](https://github.com/JohnDoe4991/GalacticoGear/assets/127167614/25d44145-88e1-4eb5-874e-cb326e9d01d1)

### All Products Page 
![Screenshot 2023-11-08 at 1 55 55 PM](https://github.com/JohnDoe4991/GalacticoGear/assets/127167614/288922fa-ae86-4b06-bfbe-5311af3f3915)

### Single Product Page 
![Screenshot 2023-11-08 at 1 56 07 PM](https://github.com/JohnDoe4991/GalacticoGear/assets/127167614/aa8824ca-cf24-4aaa-9a91-c4cfd1a1f7ef)

### Empty Favorites Page
![Screenshot 2023-11-28 at 10 32 55 AM](https://github.com/JohnDoe4991/GalacticoGear/assets/127167614/3e7af6ad-cf18-4e50-a1ce-de876a8b1439)

### Favorites Page
![Screenshot 2023-11-28 at 10 33 28 AM](https://github.com/JohnDoe4991/GalacticoGear/assets/127167614/f21f74b8-d4e9-4a7f-82be-42d30315b44b)

### Empty Cart
![Screenshot 2023-11-28 at 10 32 10 AM](https://github.com/JohnDoe4991/GalacticoGear/assets/127167614/4864f210-49af-4345-9a3f-fe7faafd2101)

### Shopping Cart with Products
![Screenshot 2023-11-28 at 10 32 45 AM](https://github.com/JohnDoe4991/GalacticoGear/assets/127167614/a2c38b17-d872-4e11-828a-2dc8d23b3149)



## Technical Details

GalacticoGear allows users to create, edit, see, and delete a product as well as reviews for those products. Users can't write reviews for their own product ... 

### Features
* Create / read / update / delete Products
* Create / read / update / delete Reviews on products
* Read for a search bar
* Create / read / update / delete CartItem
* Create / read / update / delete Favorite

### Future Features
* Recommendations

### Components
* Reviews
  * CreateReview
  * DeleteReview
  * UpdateReview
* Footer
* Landing
* LoginFormModal
* SignupFormModal
* Navigation
* OpenModalButton
* Cart
* Favorites
* SearchBar (Products by name)
* Products
  * CreateProducts
  * DeleteProducts
  * GetProducts
  * ProducttDetails
  * UpdateProduct


### Installation
1. Download the [repo](https://github.com/JohnDoe4991/GalacticoGear)
2. Install the dependencies
```
pipenv install -r requirements.txt
```
3. Create a .env with proper settings for your development environment. Make sure to include settings for your AWS Bucket, Key, and Secret Key!
4. Open a terminal, migrate/seed your database, and run your Flask app
```
pipenv shell
flask db upgrade
flask seed all
flask run
```
5. See the README file in the `react-app` directory to run the React App in development

