import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false)
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Kayıt Ol</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Kullanıcı Adı</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Kullanıcı adı girin..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          className="registerInput"
          placeholder="Email adresinizi girin..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Şifre</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Şifrenizi girin..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Kayıt Ol
        </button>
      </form>
      <button className="registerLoginButton">
        <Link to="/login" className="link">
          Giriş Yap
        </Link>
      </button>
      {error && <span className="error">Bir şeyler ters gitti ! kullanıcı adı veya email daha önce kullanılmış olabilir</span>}
    </div>
  );
}
