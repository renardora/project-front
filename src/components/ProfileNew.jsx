import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import "../styles/profile.css";

const ProfileNewPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: "",
    role: "стажер",
    birthDay: "",
    phone: "",
    email: "",
    division: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let errors = {};

    if (name === "avatarUrl" && value && !/^https?:\/\/.*/.test(value)) {
      errors.avatarUrl = "Неверная ссылка на аватарку";
    }
    if (name === "fullName" && value.length < 1) {
      errors.fullName = "Укажите имя";
    }
    if (name === "role" && value.length < 1) {
      errors.role = "Укажите должность";
    }
    if (name === "birthDay" && !Date.parse(value)) {
      errors.birthDay = "Укажите дату рождения";
    }
    if (name === "phone" && value.length !== 11) {
      errors.phone = "Укажите телефон";
    }
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      errors.email = "Неверный формат почты";
    }
    if (name === "division" && value.length < 1) {
      errors.division = "Укажите подразделение";
    }
    if (name === "password" && value.length < 6) {
      errors.password = "Пароль должен быть не менее 6 символов";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    // Валидация всех полей перед сохранением
    const newErrors = Object.keys(userData).reduce((errors, key) => {
      return { ...errors, ...validate(key, userData[key]) };
    }, {});

    setErrors(newErrors);

    const errorValues = Object.values(newErrors);
    const hasErrors = errorValues.some((error) => error !== "");

    if (hasErrors) {
      return;
    }

    try {
      await axios({
        method: "post",
        url: "/auth/register",
        data: userData,
      });

      navigate("/employees");
    } catch (err) {
      console.error("Ошибка при сохранении данных:", err);
    }
  };

  return (
    <main className="profile-container">
      <h1>Регистрация сотрудника</h1>
      <form className="profile-info" autocomplete="off">
        <label className="profile-label">
          <span>Полное имя:</span>
          <input
            type="text"
            name="fullName"
            autocomplete="new-fullname"
            value={userData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p>{errors.fullName}</p>}
        </label>
        <label className="profile-label">
          <span>Дата рождения:</span>
          <input
            type="date"
            name="birthDay"
            value={userData.birthDay}
            onChange={handleChange}
          />
          {errors.birthDay && <p>{errors.birthDay}</p>}
        </label>
        <label className="profile-label">
          <span>Телефон:</span>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p>{errors.phone}</p>}
        </label>
        <label className="profile-label">
          <span>Почта:</span>
          <input
            type="email"
            name="email"
            autocomplete="new-email"
            value={userData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </label>
        <label className="profile-label">
          <span>Подразделение:</span>
          <input
            type="text"
            name="division"
            value={userData.division}
            onChange={handleChange}
          />
          {errors.division && <p>{errors.division}</p>}
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
          {errors.role && <p>{errors.role}</p>}
        </label>
        <label className="profile-label">
          <span>Пароль:</span>
          <input
            type="password"
            name="password"
            autocomplete="new-password"
            value={userData.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </label>
        <button className="profile-button" onClick={handleSave}>
          Сохранить
        </button>
      </form>
    </main>
  );
};

export default ProfileNewPage;
