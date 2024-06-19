import React, { useState, useEffect } from "react";
import axios from "../axios";

const Form = () => {
  const [currentEmployee, setCurrentEmployee] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsersData = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios
        .get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (response) => {
          setUserData(response.data.userData);

          const resp = await axios.get("/auth/all");

          const usersData = resp.data.usersData.filter(
            (userData) => userData.fullName !== response.data.userData.fullName
          );
          setUsers(usersData);
        })
        .catch((err) =>
          console.log("Не удалось получить имя пользователя: ", err)
        );
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      console.error("Ошибка при получении данных", err);
    }
  };

  const handleAttributeChange = (employee, attr) => {
    setSelectedAttributes((prev) => {
      const employeeAttributes = prev[employee] || {};
      return {
        ...prev,
        [employee]: {
          ...employeeAttributes,
          [attr]: !employeeAttributes[attr],
        },
      };
    });
  };

  const calculateSelectedAttributes = () => {
    const currentUserId = users[currentEmployee]._id;
    const attributes = selectedAttributes[currentUserId];
    let count = 0;
    if (attributes) {
      count = Object.values(attributes).filter(Boolean).length;
    }

    axios
      .post("/topworker/adding", {
        userId: currentUserId,
        currentUserId: userData._id,
        count: count,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleNext = () => {
    if (currentEmployee <= users.length - 1) {
      setCurrentEmployee(currentEmployee + 1);
      calculateSelectedAttributes();
    } else {
      console.log(selectedAttributes);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  if (loading)
    return (
      <div className="employee-of-the-month-page">
        <p>Загрузка...</p>
      </div>
    );
  if (error) return <p>Ошибка при загрузке данных: {error.message}</p>;

  return (
    <>
      {currentEmployee <= users.length - 1 ? (
        <>
          <section className="employee-form form">
            <div className="employee-of-the-month-page">
              <h2>{users[currentEmployee].fullName}</h2>
              <form>
                {[
                  "Дает обратную связь",
                  "Вежлив с гостями",
                  "Обеспечивает психологический комфорт",
                  "Спокойный и уважительный",
                  "Дисциплинированный",
                  "Хорошая скорость",
                  "Инициативный",
                  "Умеет делегировать задачи",
                  "Выполняет задачи, поставленные МС/ДР",
                  "Выполняет стандарты",
                  "Предупреждает о невыходе, ищет замену",
                  "Реакция на заказ меньше 5 сек",
                ].map((attr) => (
                  <label key={attr}>
                    <input
                      type="checkbox"
                      checked={
                        selectedAttributes[users[currentEmployee]._id]?.[
                          attr
                        ] || false
                      }
                      onChange={() =>
                        handleAttributeChange(users[currentEmployee]._id, attr)
                      }
                    />
                    {attr}
                  </label>
                ))}
              </form>
              <button className="employee-vote-button" onClick={handleNext}>
                Далее
              </button>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="employee-vote">
            <h2>Анкета заполнена!</h2>
          </section>
        </>
      )}
    </>
  );
};

export default Form;
