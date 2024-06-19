import React, { useState } from "react";
import standarts from "../images/standarts.svg";
import "../styles/standarts.css";
import { Link } from "react-router-dom";

const StandartsPage = () => {
  return (
    <main className="standarts">
      <h1>Стандарты компании</h1>
      <section className="standarts-sec">
        <Link to="/kingdom" className="standarts-sec1">
          <img src={standarts} alt="" />
          <h2>ВЕРНУТЬСЯ</h2>
        </Link>
        <div className="standarts-sec2_1">
          <Link
            to={`/kingdom/standarts/Руководство ОПС`}
            className="standarts-sec-item"
          >
            <h2>Руководство ОПС</h2>
          </Link>
          <Link to={`/kingdom/standarts/REV`} className="standarts-sec-item">
            <h2>REV</h2>
          </Link>
        </div>
        <div className="standarts-sec2_2">
          <Link
            to={`/kingdom/standarts/Материалы`}
            className="standarts-sec-item"
          >
            <h2>Материалы</h2>
          </Link>
          <Link
            to={`/kingdom/standarts/Новинки`}
            className="standarts-sec-item"
          >
            <h2>Новинки</h2>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default StandartsPage;
