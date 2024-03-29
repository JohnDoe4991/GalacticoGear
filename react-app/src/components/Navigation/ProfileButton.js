import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import CreateProductModal from "../Products/CreateProductModal";
import "./Navigation.css"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="prof-container">
      <button className="prof-button" onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="prof-dets">{user.username}</div>
            <div className="prof-dets">{user.email}</div>
            <div>
              <OpenModalButton
                className="prof-button1"
                buttonText="Post Product"
                modalComponent={
                  <CreateProductModal
                  />
                }
              />
            </div>
            <div>
              <button onClick={() => history.push("/carts")}>Shopping Cart</button>
            </div>
            <button onClick={() => history.push("/favorites")}>Favorites</button>

            <div>
              <button className="prof-button1" onClick={handleLogout}>Log Out</button>
            </div>
          </>
        ) : (
          <div className="not-logged-in">
            <div className="no-log">
              <h4 className="prof-dets1">Welcome to GalacticoGear</h4>
            </div>
            <OpenModalButton

              buttonText="Sign In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
