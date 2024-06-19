import React, { useState, useEffect } from "react";
import axios from "../axios.js";
import "../styles/SchedulePage.css";
import upload from "../images/upload.png";
import { getCurrentDaysWeek } from "../utils/dateUtils.js";

const SchedulePage = () => {
  const [imageUrlChbr, setImageUrlChbr] = React.useState([]);
  const inputFileRefChbr = React.useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const response = await axios.post("/uploadimage/chbr", formData);
      const fullImageUrl = `http://localhost:4444${response.data.url}`;
      localStorage.setItem("lastImageChbr", fullImageUrl);
      setImageUrlChbr(fullImageUrl);
    } catch (error) {
      console.error(error);
      alert("Ошибка при загрузке фото");
    }
  };
  useEffect(() => {
    const lastImageChbr = localStorage.getItem("lastImageChbr");
    if (lastImageChbr) {
      setImageUrlChbr([lastImageChbr]);
      console.log(lastImageChbr);
    }
  }, []);

  const handleExport = async () => {
    try {
      const response = await axios.get("/schedule/chbr/export", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Расписание ЧБР.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Ошибка при экспорте данных:", error);
    }
  };

  const [startOfWeek, endOfWeek] = getCurrentDaysWeek();

  return (
    <main>
      <section className="schedule-current">
        <h1>
          Расписание на неделю c {startOfWeek.day} {startOfWeek.month} по{" "}
          {endOfWeek.day} {endOfWeek.month}
        </h1>
        <div className="schedule-ces-">
          <button
            onClick={() => inputFileRefChbr.current.click()}
            className="schedule-upload"
          >
            <img src={upload} alt="" />
          </button>
          <input
            ref={inputFileRefChbr}
            type="file"
            onChange={handleChangeFile}
            hidden
          />
          <img className="schedule-photo" src={imageUrlChbr} alt="" />
        </div>
        <button
          className="schedule-button-ex schedule-button"
          onClick={handleExport}
        >
          Выгрузить временные возможности
        </button>
      </section>
    </main>
  );
};

export default SchedulePage;
