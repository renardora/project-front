import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "../axios";

const Header = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { ...userData } = await response.data;
        setUserData(userData);
        setRole(userData.userData.role);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const getRole = () => {
    if (role == "менеджер") return "/manager-schedule";
    else if (role == "директор") return "/director-schedule";
    else return "/schedule";
  };

  return (
    <header>
      <section class="menu">
        <img src={logo} className="menu-logo" alt=" " />
        <Link to={getRole()} className="menu-item">
          РАСПИСАНИЕ
        </Link>
        <Link to="/top_worker" className="menu-item">
          СОТРУДНИК МЕСЯЦА
        </Link>
        <Link to="/kingdom" className="menu-item">
          БАЗА ЗНАНИЙ
        </Link>
        {role === "директор" && (
          <Link to="/employees" className="menu-item">
            СОТРУДНИКИ
          </Link>
        )}
        <Link to="/cabinet">
          <button className="menu-button">Профиль</button>
        </Link>
      </section>
    </header>
  );
};

export default Header;
