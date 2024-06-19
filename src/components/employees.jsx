import React, { useEffect, useState } from "react";
import "../styles/employees.css";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import add from "../images/add.png";
import modifyw from "../images/modifyw.png";
import modifyb from "../images/modifyb.png";
import deleteb from "../images/deleteb.png";

const EmployeesPage = () => {
  const [usersData, setUsersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/auth/all");
      setUsersData(response.data.usersData);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm("Вы точно хотите удалить сотрудника?"))
      try {
        const response = await axios({
          method: "delete",
          url: "/users/delete",
          data: {
            userId: userId,
          },
        });
        if (response.status === 200) {
          console.log("Пользователь успешно удален");
          fetchUserData();
        }
      } catch (error) {
        console.error("Ошибка при удалении пользователя", error);
      }
  };

  const updateUser = async (userId) => {
    localStorage.setItem("selectedUser", JSON.stringify({ _id: userId }));
    navigate("/employees/profile");
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка при загрузке данных: {error.message}</p>;

  return (
    <main className="emp-container">
      <h1>
        Сотрудники ресторана
        <button
          className="emp-button_control top-button-2"
          onClick={() => navigate("/employees/add-employee")}
        >
          <img src={add} alt="" />
        </button>
        <button
          className="emp-button_control top-button"
          onClick={() => setShowButtons(!showButtons)}
        >
          <img src={modifyw} alt="" />
        </button>
      </h1>
      <section className="emp-pers_info">
        {usersData.map((user, index) => (
          <div key={index} className="emp-pers_info_item">
            <div>
              <h2>{user.fullName}</h2>
              <span>{user.role}</span>
              <span hidden>{user._id}</span>
            </div>
            {showButtons && (
              <div>
                <button
                  className="emp-button_control-2"
                  onClick={() => {
                    const userId = user._id;
                    updateUser(userId);
                  }}
                >
                  <img src={modifyb} alt="" />
                </button>
                <button
                  className="emp-button_control-2"
                  onClick={() => {
                    const userId = user._id;
                    deleteUser(userId);
                  }}
                >
                  <img src={deleteb} alt="" />
                </button>
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
};

export default EmployeesPage;
