
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import newRequest from '../../utils/newRequest';

const Navbar = () => {

  const navigate = useNavigate()

  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await newRequest.post("auth/logout")
      localStorage.setItem("currentUser", null);
      navigate("/")
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">fiberr</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>fiberr Buissness</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser && <Link className="link" to="/login">Sign in</Link>}
          {!currentUser?.isSeller && <span>Become a seller</span>}
          {!currentUser && <button><Link className="link" to="/register">Join</Link></button>}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src={currentUser?.img || "https://ionicframework.com/docs/img/demos/avatar.svg"}
                alt="user image"
              />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
          <>
            <hr />
            <div className="menu">
              <Link className="link menuLink" to="/gigs?cat=design">
                Graphics & Design
              </Link>
              <Link className="link menuLink" to="/gigs?cat=animation">
                Video & Animation
              </Link>
              <Link className="link menuLink" to="/gigs?cat=writing">
                Writing & Translation
              </Link>
              <Link className="link menuLink" to="/gigs?cat=ai">
                AI Services
              </Link>
              <Link className="link menuLink" to="/gigs?cat=marketing">
                Digital Marketing
              </Link>
              <Link className="link menuLink" to="/gigs?cat=music">
                Music & Audio
              </Link>
              <Link className="link menuLink" to="/gigs?cat=web">
                Programming & Tech
              </Link>
              <Link className="link menuLink" to="/gigs?cat=business">
                Business
              </Link>
              <Link className="link menuLink" to="/">
                Lifestyle
              </Link>
            </div>
            <hr />
          </>
        )}
    </div>
  );
};

export default Navbar;
