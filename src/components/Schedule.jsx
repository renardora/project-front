import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../styles/SchedulePage.css";
import { getCurrentDaysWeek } from "../utils/dateUtils.js";
import plug from "../images/заглушка.png"

import timeLimits from "../assets/time-limits.json";

const SchedulePage = () => {
  const [selectedTimes, setSelectedTimes] = useState(new Set());
  const [userData, setUserData] = useState(null);
  const [allTimes, setAllTimes] = useState([]);
  const [imageUrlChbr, setImageUrlChbr] = useState([]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState();

  const [startOfWeek, endOfWeek] = getCurrentDaysWeek();

  const days = [
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
    "воскресенье",
  ];
  const times = [
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  const fetchSchedule = async () => {
    try {
      const response = await axios.get("/schedule/chbr/getAll");
      setAllTimes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при получении расписания:", error);
      setLoading(false);
    }
  };

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

  const checkSubmissionStatus = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("/schedule/chbr/checkSubmission", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsSubmitted(response.data.isSubmitted);
    } catch (error) {
      console.error("Ошибка при проверке статуса отправки:", error);
    }
  };

  const checkButtonDisableStatus = () => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();

    if ((day === 0 && hours < 24) || (day === 6 && hours >= 23)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  const handleTimeClick = (day, time) => {
    const key = `${day}-${time}`;
    setSelectedTimes((prev) => {
      const newSelectedTimes = new Set(prev);
      if (newSelectedTimes.has(key)) {
        newSelectedTimes.delete(key);
      } else {
        newSelectedTimes.add(key);
      }
      return newSelectedTimes;
    });
  };

  const handleSubmit = async () => {
    try {
      let totalHours = 0;
      const now = new Date();
      now.setHours(3, 0, 0, 0);
      totalHours = selectedTimes.size;
      if (totalHours >= 4) {
        selectedTimes.forEach(async (element) => {
          const [day, time] = element.split("-");
          await axios.post("/schedule/chbr", {
            userId: userData._id,
            fullName: userData.fullName,
            day,
            time,
            date: now,
          });
        });
        setMessage("Данные отправлены");
        setIsSubmitted(true);
      } else {
        setMessage("Минимальная продолжительность рабочей недели - 4 часа");
      }
    } catch (error) {
      alert("Ошибка при отправке расписания");
    }
  };

  const uniqueDate = (day, time) => {
    let count = 0;
    allTimes.forEach((el) => {
      if (day === el.day && time === el.time) count++;
    });

    const limit = timeLimits.find((item) => item.time === time && item.day === day)?.limit;

    return count >= limit;
  };

  useEffect(() => {
    fetchSchedule();
    fetchUserData();
    checkButtonDisableStatus();
    checkSubmissionStatus();
  }, []);

  useEffect(() => {
    if (isSubmitted) {
      setIsButtonDisabled(true);
      setMessage("Данные отправлены");
    }
  }, [isSubmitted]);

  useEffect(() => {
    const lastImageChbr = localStorage.getItem("lastImageChbr");
    if (lastImageChbr) {
      setImageUrlChbr([lastImageChbr]);
    }
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка при загрузке данных: {error.message}</p>;

  return (
    <main>
      <section className="schedule-current">
        <h1>
          Расписание на неделю c {startOfWeek.day} {startOfWeek.month} по{" "}
          {endOfWeek.day} {endOfWeek.month}
        </h1>
        <img className="schedule-photo" src={imageUrlChbr} alt="" />
      </section>

      <section className="schedule-next">
        <h1>Выдели свои временные возможности на следующую неделю:</h1>

        <table className="schedule-table">
          <thead>
            <tr className="schedule-table-item">
              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {times.map((time) => (
              <tr key={time} className="schedule-table-item">
                {days.map((day) => (
                  <td
                    key={`${day}-${time}`}
                    className={
                      uniqueDate(day, time)
                        ? "unselectable"
                        : selectedTimes.has(`${day}-${time}`)
                        ? "selected"
                        : ""
                    }
                    onClick={() => handleTimeClick(day, time)}
                  >
                    {time}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {message && <p>{message}</p>}

        <button
          className={isSubmitted ? "isButtonDisabled" : "schedule-button"}
          onClick={handleSubmit}
          disabled={isButtonDisabled}
        >
          Отправить
        </button>
      </section>
    </main>
  );
};

export default SchedulePage;
