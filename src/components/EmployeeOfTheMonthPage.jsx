import React, { useState, useEffect } from "react";
import "../styles/employeeOfTheMonth.css";
import plug from "../images/заглушка.png";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import Form from "./form.jsx";

import { getCurrentMonthYear, getNextMonthYear } from "../utils/dateUtils.js";

const EmployeeOfTheMonthPage = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const currentMonthYear = getCurrentMonthYear();
  const nextMonthYear = getNextMonthYear();
  const [worker, setWorker] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkSubmissionStatus = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("/topworker/checkSubmission", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsSubmitted(response.data.isSubmitted);
    } catch (error) {
      console.error("Ошибка при проверке статуса отправки:", error);
    }
  };

  useEffect(() => {
    const updateTopWorker = async () => {
      try {
        const response = await axios.get("/topworker/getAll");
        setWorker(response.data.records);
        console.log(response.data.records);
        if (!response.data.records) {
          setError(true);
        }
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Ошибка при получении данных", err);
      }
    };
    updateTopWorker();
    checkSubmissionStatus();
  }, []);

  const showRating = () => {
    navigate("/top_worker/rating");
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка при загрузке данных: {error.message}</p>;

  return (
    <main>
      <section className="employee-top">
        <div className="employee-top3">
          <div className="employee-row one">
            <span>#1</span>
            <h3>
              {(worker[0].userId && worker[0].userId.fullName) ||
                "Сотрудник удален"}
            </h3>
          </div>
          <div className="employee-row two">
            <span>#2</span>
            <h3>
              {(worker[1].userId && worker[1].userId.fullName) ||
                "Сотрудник удален"}
            </h3>
          </div>
          <div className="employee-row three">
            <span>#3</span>
            <h3>
              {(worker[2].userId && worker[2].userId.fullName) ||
                "Сотрудник удален"}
            </h3>
          </div>
          <button onClick={showRating} className="employee-top-button">
            Смотреть рейтинг
          </button>
        </div>
        <div className="employee-topworker">
          <h1>
            Сотрудник месяца
            <br />в {currentMonthYear.month} {currentMonthYear.year}
          </h1>
          <div className="employee-topworker_items">
            <img src={plug} alt="" />
            <p>
              {(worker[0].userId && worker[0].userId.fullName) ||
                "Сотрудник удален"}
            </p>
            <span>{(worker[0].userId && worker[0].userId.role) || " "}</span>
          </div>
        </div>
      </section>
      {!isSubmitted ? (
        !showForm ? (
          <section className="employee-vote">
            <h1>
              Проголосуй за лучшего
              <br />
              сотрудника в {nextMonthYear.month} {nextMonthYear.year}
            </h1>
            <button className="employee-vote-button" onClick={handleShowForm}>
              Начать
            </button>
          </section>
        ) : (
          <Form />
        )
      ) : (
        <section className="employee-vote">
          <h2>Анкета заполнена!</h2>
        </section>
      )}
    </main>
  );
};

export default EmployeeOfTheMonthPage;
