import React, { useState, useEffect } from "react";
import axios from "../axios.js";
import "../styles/SchedulePage.css";
import { getCurrentDaysWeek } from "../utils/dateUtils.js";

import timeLimitsForAup from "../assets/time-limits-aup.json";

const SchedulePage = () => {
  const [selectedTimes, setSelectedTimes] = useState(new Set());
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState();
  const [allTimes, setAllTimes] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [imageUrlManagers, setImageUrlManagers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const lastImageManagers = localStorage.getItem("lastImageManagers");
    if (lastImageManagers) {
      setImageUrlManagers([lastImageManagers]);
      console.log(lastImageManagers);
    }
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await axios.get("/schedule/aup/getAll");
      setAllTimes(response.data);
    } catch (error) {
      console.error("Ошибка при получении расписания:", error);
    }
  };

  const checkSubmissionStatus = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("/schedule/aup/checkSubmission", {
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

    // Блокируем кнопку, если текущее время с субботы 23:59 до понедельника 00:00
    if ((day === 0 && hours < 24) || (day === 6 && hours >= 23)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
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

    fetchUserData();
    fetchSchedule();
    checkSubmissionStatus();
    checkButtonDisableStatus();
  }, []);

  useEffect(() => {
    // Блокируем кнопку, если пользователь уже отправил данные
    if (isSubmitted) {
      setIsButtonDisabled(true);
      setMessage("Данные отправлены");
    }
  }, [isSubmitted]);

  const handleTimeClick = (day, time) => {
    const key = `${day}/${time}`;
    setSelectedTimes((prev) => {
      const newSelectedTimes = new Set(prev);

      if (newSelectedTimes.has(key)) {
        newSelectedTimes.delete(key);
      } else {
        for (let item of newSelectedTimes) {
          if (item.startsWith(day)) {
            newSelectedTimes.delete(item);
          }
        }
        newSelectedTimes.add(key);
      }

      return newSelectedTimes;
    });
  };

  const handleSubmit = () => {
    try {
      const now = new Date();
      now.setHours(3, 0, 0, 0);

      selectedTimes.forEach((element) => {
        const i = element.split("/");
        const res = axios.post("/schedule/aup", {
          userId: userData._id,
          fullName: userData.fullName,
          day: i[0],
          time: i[1],
          date: now,
        });
        if (res) {
          setMessage("Данные отправлены");
          setIsSubmitted(true);
        }
      });
    } catch (error) {
      alert("Ошибка при отправке расписания");
    }
  };

  const uniqueDate = (day, time) => {
    let count = 0;
    allTimes.forEach((el) => {
      if (day === el.day && time === el.time) count++;
    });

    let limit;
    timeLimitsForAup.map((item) => {
      if (item.time === time && item.day === day) limit = item.limit;
    });

    if (count >= limit) return true;
    return false;
  };

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
  const times = ["8:30 - 17:00", "12:00 - 20:30", "13:30 - 22:00"];

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка при загрузке данных: {error.message}</p>;

  return (
    <main>
      <section className="schedule-current">
        <h1>
          Расписание на неделю c {startOfWeek.day} {startOfWeek.month} по{" "}
          {endOfWeek.day} {endOfWeek.month}
        </h1>
        <img className="schedule-photo" src={imageUrlManagers} alt="" />
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
                    key={`${day}/${time}`}
                    className={
                      uniqueDate(day, time)
                        ? "unselectable"
                        : selectedTimes.has(`${day}/${time}`)
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
