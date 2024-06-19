import React from "react";
import training from "../images/training.svg";
import "../styles/standarts.css";
import { Link } from "react-router-dom";

const TrainingPage = () => {
  return (
    <main className="standarts">
      <h1>Обучение и развитие</h1>
      <section className="standarts-sec">
        <Link to="/kingdom" className="standarts-sec1">
          <img src={training} alt="" />
          <h2>ВЕРНУТЬСЯ</h2>
        </Link>
        <div className="standarts-sec2_1">
          <Link to={`/kingdom/training/Член бригады ресторана`} className="standarts-sec-item">
            <h2>
              Член бригады
              <br />
              ресторана
            </h2>
          </Link>
          <Link to={`/kingdom/training/Тренер`} className="standarts-sec-item">
            <h2>Тренер</h2>
          </Link>
        </div>
        <div className="standarts-sec2_2">
          <Link to={`/kingdom/training/Менеджер смены`} className="standarts-sec-item">
            <h2>Менеджер смены</h2>
          </Link>
          <Link to={`/kingdom/training/Сертифицированность DAX`} className="standarts-sec-item">
            <h2>Сертифицированность DAX</h2>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default TrainingPage;
