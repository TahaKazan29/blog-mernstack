import './settings.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Context';
import { useContext, useState } from 'react';
import axios from 'axios';

export default function Settings() {

  const {user,dispatch} = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updatedUser.profilePic = fileName;
      try {
        await axios.post("/upload", data);
    } catch (error) {}
}
try {
    const res = await axios.put("/users/" +user._id , updatedUser);
    setSuccess(true);
    dispatch({type:"UPDATE_SUCCESS",payload:res.data.data})
    } catch (error) {
        dispatch({type:"UPDATE_SUCCESS"})
    }
  };

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Hesabı Güncelle</span>
                    <span className="settingsDeleteTitle">Hesabı Sil</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profil Resmi</label>
                    <div className="settingsPP">
                        <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput" style={{ display: "none" }} onChange={e=>setFile(e.target.files[0])} />
                    </div>
                    <label>Kullanıcı Adı</label>
                    <input type="text" placeholder={user.username} onChange={e => setUsername(e.target.value)}/>
                    <label>Email</label>
                    <input type="email" placeholder={user.email} onChange={e => setEmail(e.target.value)} />
                    <label>Şifre</label>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                    <button className="settingsSubmit" type="submit">Güncelle</button>
                    {success && <span style={{color:"green",textAlign:"center",marginTop:"20px"}}>Profiliniz başarıyla güncellendi...</span>}
                </form>
            </div>
            <Sidebar/>
        </div>
    )
}
