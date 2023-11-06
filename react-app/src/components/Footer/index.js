import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";
import "../CSS/mycss.css"

function Footer() {
    const teamMembers = [
        { name: "John Dorsey", github: "https://github.com/JohnDoe4991" },
    ];

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-group">
                    <div className="footer-members">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="footer-member">
                                {member.name}
                                <div className="footer-icons">
                                    <a
                                        href={member.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FontAwesomeIcon icon={faGithub} />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/johndorsey1994/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
