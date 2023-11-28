import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { thunkGetAllFavorites } from "../../store/favorites";
import { getAllProductsThunk } from "../../store/product";
import "../CSS/mycss.css";

export default function FavoritesPage() {
   const { id } = useParams();
   const { push } = useHistory();
   const dispatch = useDispatch();
   const user = useSelector((state) => state.session.user);
   const getAllFavorites = useSelector((state) => state.favorites.allFavorites);
   console.log("🚀 ~ file: index.js:14 ~ FavoritesPage ~ getAllFavorites:", getAllFavorites)
   const productsToDisplay = useSelector((state) => Object.values(state.products.allProducts));
   const ownerFavorites = Object.values(getAllFavorites).filter(
      (favorite) => favorite.userId == user.id
   );

   const favsToPost = [...ownerFavorites];

   useEffect(() => {
      dispatch(thunkGetAllFavorites());
      dispatch(getAllProductsThunk());
   }, [dispatch]);

   const productIdsInUserCarts = ownerFavorites.map((favorite) => favorite.productId);

   const matchingProducts = productsToDisplay.filter((product) =>
      productIdsInUserCarts.includes(product.id)
   );

   let favoritesHeaderText;
   if (ownerFavorites.length === 0) {
      favoritesHeaderText = "No Favorites Yet";
   } else if (ownerFavorites.length === 1) {
      favoritesHeaderText = "1 Favorite";
   } else {
      favoritesHeaderText = `${ownerFavorites.length} Favorites `;
   }


   return (
      <div>
         <div className="allposts-parent-container">
            <h1 className="cart-header">{favoritesHeaderText}</h1>
            {ownerFavorites.length === 0 && (
               <Link className="empty-cart-photo" to={`/all`}>
                  <h2 className="unique">Check out all our products!</h2>
                  <img
                     className="shopping-photo1"
                     src="https://galictogear.s3.us-west-1.amazonaws.com/wall.jpeg"
                     alt=""
                  />
               </Link>
            )}
            <div className="allposts-photos">
               {ownerFavorites.map((singleFav) => {
                  const matchingProduct = productsToDisplay.find(
                     (product) => product.id === singleFav.productId
                  );
                  if (matchingProduct) {
                     return (
                        <div
                           className="product-container-cart1"
                           key={matchingProduct.id}
                        >
                           <Link to={`/products/${matchingProduct.id}`}>
                              <img
                                 className="userpost-images"
                                 src={matchingProduct.photoUrl}
                                 alt={matchingProduct.title}
                              />
                           </Link>
                           <div className="cart-info">
                              <div className="remove-price">
                                 <h2 className="cart-item-price">
                                    ${matchingProduct.price}
                                 </h2>
                              </div>
                              <p className="cart-item-title">
                                 {matchingProduct.title},{" "}
                                 {matchingProduct.description}
                              </p>
                           </div>
                        </div>
                     );
                  }
                  return null;
               })}
            </div>
         </div>
         {ownerFavorites.length >= 1 && ownerFavorites.length <= 2 && (
            <Link className="empty-fav-photo" to={`/all`}>
               <h2 className="unique">Check out more products!</h2>
               <img
                  className="shopping-photo2"
                  src="https://galictogear.s3.us-west-1.amazonaws.com/wall.jpeg"
                  alt=""
               />
            </Link>
         )}
         {ownerFavorites.length >= 3 && (
            <Link className="empty-fav1" to={`/all`}>
               <h2 className="unique">Check out more products!</h2>
            </Link>
         )}
         <hr></hr>
         <div className="cart-footer">
            <div className="cfooter-top">
               <div className="cfooter-left">
                  <h2 className="us-dollar">🇺🇸 United States | English(US) | $ (USD)</h2>
               </div>
               <div className="cfooter-right">@ 2023 GalacticoGear, Inc.</div>
            </div>
            <div className="cfooter-bottom">
               <p className="merchant">Merchant is GalacticoGear, Inc. (USA), GalacticoGear Ireland UC (Ireland), GalacticoGear UK Limited (United Kingdom), GalacticoGear Canada Limited (Canada), or GalacticoGear Australia Pty Limited (Australia) depending on the currency and location of the payment instrument issuance.</p>
               <p className="cart-donate">If you donate to the KickUp Fund, your Merchant for the donation amount will be Brooklyn Community Fund.</p>
            </div>
         </div>
      </div>
   )
}
