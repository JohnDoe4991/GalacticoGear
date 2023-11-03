import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/index";
import SignupFormModal from "../SignupFormModal/index";
import "../CSS/mycss.css";

export default function Landing() {
    const user = useSelector((state) => state.session.user);
    const { push } = useHistory();

    return (
        <div className="landing-container">
            <div className="landing-text">
                <h1>Welcome to GalictoGear</h1>
                <h2>A place to trade Real Madrid jerseys.</h2>

                {user ? (
                    <button onClick={() => push("/all")}>Enter the Pitch ⚽︎</button>
                ) : (
                    <OpenModalButton
                        className="start-for-button"
                        buttonText="Join the Squad ⚽︎"
                        modalComponent={<SignupFormModal />}
                    />
                )}
            </div>
        </div>
    );
}
