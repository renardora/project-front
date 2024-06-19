import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import "../styles/profile.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem("selectedUser"));
      const userId = storedUser._id;
      //   console.log(userId);
      const response = await axios.put("/users/find", {
        userId: userId,
      });

      const data = response.data;
      const date = new Date(data.birthDay);
      data.birthDay = date.toISOString().split("T")[0];
      setUserData(response.data);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("selectedUser");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = async () => {
    try {
      if (userData._id) {
        console.log(userData);
        const response = await axios.put("/users/update", userData);
      } else {
        await axios.post("/auth/register", userData);
      }
      navigate("/employees");
    } catch (err) {
      console.error("Ошибка при сохранении данных:", err);
    }
  };

  return (
    <main className="profile-container">
      <h1>Профиль сотрудника</h1>
      <form className="profile-info">
        <label className="profile-label">
          <span>Имя:</span>
          <input
            type="text"
            name="fullName"
            value={userData.fullName}
            onChange={handleChange}
          />
        </label>
        <label className="profile-label">
          <span>Дата рождения:</span>
          <input
            type="date"
            name="birthDay"
            value={userData.birthDay}
            onChange={handleChange}
          />
        </label>
        <label className="profile-label">
          <span>Телефон:</span>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
          />
        </label>
        <label className="profile-label">
          <span>Почта:</span>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </label>
        <label className="profile-label">
          <span>Подразделение:</span>
          <input
            type="text"
            name="division"
            value={userData.division}
            onChange={handleChange}
          />
        </label>
        <label className="profile-label">
          <span>Должность:</span>
          <select name="role" value={userData.role} onChange={handleChange}>
            <option value="стажер">Стажер</option>
            <option value="повар/кассир">Повар/кассир</option>
            <option value="универсал">Универсал</option>
            <option value="тренер-наставник">Тренер-наставник</option>
            <option value="менеджер">Менеджер</option>
            <option value="директор">Директор</option>
          </select>
        </label>
        <button className="profile-button" onClick={handleSave}>
          Сохранить
        </button>
      </form>
    </main>
  );
};

export default ProfilePage;
