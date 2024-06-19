import React from "react";
import standarts from "../images/standarts.svg";
import managment from "../images/managment.svg";
import training from "../images/training.svg";
import "../styles/kingDom.css";
import { Link } from "react-router-dom";


const KingDom = () => {
  return (
    <main className="kingdom">
      <h1>База знаний КингДом</h1>
      <section className="kingdom-sec">
        <Link to="/kingdom/standarts" className="kingdom-sec-item">
          <img src={standarts} alt="" />
          <h2>СТАНДАРТЫ</h2>
        </Link>
        <Link to="/kingdom/managment" className="kingdom-sec-item">
          <img src={managment} alt="" />
          <h2>МЕНЕДЖМЕНТ</h2>
        </Link>
        <Link to="/kingdom/training" className="kingdom-sec-item">
          <img src={training} alt="" />
          <h2>ОБУЧЕНИЕ</h2>
        </Link>
      </section>
    </main>
  );
};

export default KingDom;
