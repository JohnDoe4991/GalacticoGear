import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
   thunkCreateFavorite,
   thunkDeleteFavorite,
   thunkGetAllFavorites,
} from "../../store/favorites";

export default function FavoriteTracker({ productId, userId }) {
   const dispatch = useDispatch();
   const getAllFavorites = useSelector((state) => state.favorites.allFavorites);
   const [favorite, setFavorite] = useState(null);

   const ownerFavorites = Object.values(getAllFavorites).filter(
      (favorite) => favorite.userId == userId
   );

   const thisProductFavorites = ownerFavorites.filter(
      (favorite) => favorite.productId == productId
   );

   let favId;
   if (thisProductFavorites.length) {
      favId = thisProductFavorites[0]?.id;
   }
   const deleteFavorite = async () => {
      const res = await dispatch(thunkDeleteFavorite(favId));
      if (res.errors) {
         return setFavorite(true);
      } else {
         return setFavorite(false);
      }
   };

   const createFavorite = async () => {
      const res = await dispatch(thunkCreateFavorite(productId));
      dispatch(thunkGetAllFavorites());

      if (res.errors) return setFavorite(true);
   };

   useEffect(() => {
      dispatch(thunkGetAllFavorites());
   }, [dispatch, favorite]);

   return (
      <div>
         <button
            hidden={!thisProductFavorites.length}
            className="cart-button1"
            onClick={() => deleteFavorite()}
         >
            ❤️
         </button>
         <button
            hidden={thisProductFavorites.length}
            className="cart-button1"
            onClick={() => createFavorite()}
         >
            ♡
         </button>

      </div>
   );
}
