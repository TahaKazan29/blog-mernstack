import "./singlePost.css";
import { useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const PF = "http://localhost:5000/images/";

  useEffect(() => {
    getPost(path);
  }, [path]);

  const getPost = async (postId) => {
    const res = await axios.get("/posts/" + postId);
    setPost(res.data.data);
    setTitle(res.data.data.title);
    setDesc(res.data.data.desc);
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {console.log(error)}
  };

  const handleUpdate = async () => {
    try {
      await axios.put("/posts/" + path, {
         username: user.username,title,desc
      });
      setUpdateMode(false);
    } catch (error) {console.log(error)}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}

        {updateMode ? (
          <input type="text" value={title} className="singlePostTitleInput" autoFocus={true} onChange={(e) => setTitle(e.target.value)}/>
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author :
            <Link to={"/?user=" + post.username} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).getDate()}/
            {new Date(post.createdAt).getMonth()}/
            {new Date(post.createdAt).getFullYear()}
          </span>
        </div>
        {updateMode ? <textarea className="singlePostDescInput" value={desc} onChange={(e) => setDesc(e.target.value)}/> : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && 
          <button type="button" className="singlePostButton" onClick={handleUpdate}>Güncelle</button>
        }
      </div>
    </div>
  );
}
