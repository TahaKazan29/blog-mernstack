import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {

  const userRef = useRef()
  const passwordRef = useRef()
  const {dispatch,isFetching} = useContext(Context);

  const handleSubmit = async (e) =>  {
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try {
      const res = await axios.post("/auth/login",{
        username:userRef.current.value,
        password:passwordRef.current.value
      })
    dispatch({type:"LOGIN_SUCCESS",payload:res.data.data})
    } catch (error) {
      dispatch({type:"LOGIN_FAILURE"})
    }
  }

  return (
    <div className="login">
      <span className="loginTitle">Giriş Yap</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Kullanıcı Adı</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Kullanıcı adınızı girin..."
          ref={userRef}
        />
        <label>Şifre</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Şifrenizi girin..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>Giriş Yap</button>
      </form>
      <button className="loginRegisterButton">
        <Link to="/register" className="link">
          Kayıt Ol
        </Link>
      </button>
    </div>
  );
}
