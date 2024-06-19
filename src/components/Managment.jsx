import React from "react";
import managment from "../images/managment.svg";
import "../styles/standarts.css";
import { Link } from "react-router-dom";

const ManagmentPage = () => {
  return (
    <main className="standarts">
      <h1>Менеджмент</h1>
      <section className="standarts-sec">
        <Link to="/kingdom" className="standarts-sec1">
          <img src={managment} alt="" />
          <h2>ВЕРНУТЬСЯ</h2>
        </Link>
        <div className="standarts-sec2_1">
          <Link
            to={`/kingdom/managment/Гостевой опыт`}
            className="standarts-sec-item"
          >
            <h2>Гостевой опыт</h2>
          </Link>
          <Link
            to={`/kingdom/managment/Менеджмент`}
            className="standarts-sec-item"
          >
            <h2>Менеджмент</h2>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ManagmentPage;
