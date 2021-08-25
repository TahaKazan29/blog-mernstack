import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar() {

  const {user,dispatch} = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleLogOut = () => {
    dispatch({type:'LOG_OUT'});
  }

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">
              ANASAYFA
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/about" className="link">
              HAKKIMDA
            </Link>{" "}
          </li>
          <li className="topListItem">
            <Link to="/contact" className="link">
              İLETİŞİM
            </Link>{" "}
          </li>
          <li className="topListItem">
            <Link to="/write" className="link">
              YAZ
            </Link>{" "}
          </li>
          <li className="topListItem" onClick={handleLogOut}>{user && "ÇIKIŞ YAP"}</li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img
            className="topImg"
            src={PF + user.profilePic}
            alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                GİRİŞ YAP
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                KAYIT OL
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
