import React, { useRef, useEffect, useState } from "react";
import plug from "../images/заглушка.png";
import axios from "../axios";
import "../styles/cabinet.css";
import { useNavigate } from "react-router-dom";

const CabinetPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [imageUrl, setImageUrl] = React.useState([]);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data.userData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post("/uploadimage/users", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setUserData((prevData) => ({ ...prevData, avatarUrl: response.data.url }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка при загрузке данных: {error.message}</p>;

  return (
    <main className="container">
      <h1>Личный кабинет</h1>

      <section>
        <div class="person">
          <img
            src={userData.avatarUrl || plug}
            alt="User Avatar"
            onClick={handleAvatarClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            hidden
          />
          <h2>{userData.fullName}</h2>
          <h3>{userData.role}</h3>
        </div>
        <div>
          <div class="pers_info">
            <div class="pers_info_item">
              <h2>Дата рождения</h2>
              <span>{userData.birthDay.slice(0, 10)}</span>
            </div>
            <div class="pers_info_item">
              <h2>Телефон</h2>
              <span>{userData.phone}</span>
            </div>
          </div>
          <div class="pers_info">
            <div class="pers_info_item">
              <h2>Почта</h2>
              <span>{userData.email}</span>
            </div>
            <div class="pers_info_item">
              <h2>Подразделение</h2>
              <span>{userData.division}</span>
            </div>
          </div>
          <button className="pers-button" onClick={handleLogout}>Выйти из аккаунта</button>
        </div>
      </section>
    </main>
  );
};

export default CabinetPage;
