import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import "../styles/Rating.css";
import left from "../images/button-left.svg";
import right from "../images/button-right.svg";

const RatingOfEmployeesPage = () => {
  const [worker, setWorker] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(currentMonth);

  const showRating = () => {
    navigate("/top_worker");
  };

  const changeYear = (direction) => {
    if (direction === 1 && year >= currentYear) {
      return;
    }
    setYear(year + direction);
  };

  const changeMonth = (selectedMonth) => {
    setMonth(selectedMonth);
  };

  useEffect(() => {
    const updateTopWorker = async () => {
      try {
        const response = await axios.get(
          `/topworker/getAllRating/${year}/${month - 1}`
        );
        setWorker(response.data.records);
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
  }, [year, month]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка при загрузке данных: {error.message}</p>;

  return (
    <main>
      <div className="rating-header">
        <button onClick={showRating} className="rating-button">
          Вернуться
        </button>
        <h1> Рейтинг сотрудников</h1>
      </div>
      <div className="rating">
        <section className="employees">
          {worker.length > 0 ? (
            worker.map((work, index) => (
              <div key={index}>
                <div className="employee-row">
                  <span>#{index + 1}</span>
                  <h3>
                    {(work.userId && work.userId.fullName) ||
                      "Сотрудник удален"}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <p>
              {year < currentYear ||
              (year === currentYear && month < currentMonth)
                ? "За текущий период cтатистика в архиве"
                : "За текущий период статистики нет"}
            </p>
          )}
        </section>

        <section className="calendar">
          <div className="calendar-panel">
            <button className="calendar-button" onClick={() => changeYear(-1)}>
              <img src={left} />
            </button>
            <span>{year}</span>
            <button
              className={year < currentYear ? "calendar-button" : "disabled"}
              onClick={() => changeYear(1)}
            >
              <img src={right} />
            </button>
          </div>
          <div className="months">
            {[
              "январь",
              "февраль",
              "март",
              "апрель",
              "май",
              "июнь",
              "июль",
              "август",
              "сентябрь",
              "октябрь",
              "ноябрь",
              "декабрь",
            ].map((monthName, index) => (
              <button
                className="months-button"
                key={index}
                onClick={() => changeMonth(index + 1)}
                style={{ color: index + 1 === month ? "#DE6E1F" : "inherit" }}
              >
                {monthName}
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default RatingOfEmployeesPage;
