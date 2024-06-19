import logo from "../images/logo.svg";
import { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });
      const { token, ...userData } = response.data;
      localStorage.setItem("token", token);
      //if (userData.role == "менеджер") navigate('/manager-schedule')
      navigate("/cabinet");
    } catch (error) {
      setMessage("Не удалось войти. Проверьте учетные данные!");
    }
  };

  return (
    <main>
      <section className="auth">
        <img className="auth-img" src={logo} alt="" />
        <p>
          Для входа на сайт введите
          <br />
          свою электронную почту и пароль
        </p>
        <form className="auth-form" method="post" onSubmit={handleLogin}>
          <input
            type="email"
            name="auth_email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="auth_pass"
            placeholder="Пароль"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {message && <span>{message}</span>}
          <button className="form_auth_button" type="submit">
            Войти
          </button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
