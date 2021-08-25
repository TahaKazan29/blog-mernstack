import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {

  const [cats, setCats] = useState([]);

  useEffect(() => {
    getCats();
  },[])

  const getCats = async () => {
    const res = await axios.get("/categories");
    setCats(res.data.data);
  };

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">HAKKIMDA</span>
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">KATEGORİLER</span>
        <ul className="sidebarList">
          {cats.map(c => (
            <Link key={c._id} to={'/?cat=' + c.name} className="link">
              <li  className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">BİZİ TAKİP ET</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
