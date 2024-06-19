import React, { useState, useEffect } from "react";
import standarts from "../images/standarts.svg";
import managment from "../images/managment.svg";
import training from "../images/training.svg";
import "../styles/kingDom.css";
import { Link } from "react-router-dom";
import axios from "../axios.js";

const KingDom = () => {
  const [findDocData, setFindDocData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const findDocsData = async () => {
    try {
      const res = await axios.put("/kingdom/getDocs");
      setFindDocData(res.data.docs);
      setLoading(false);
      // console.log(docData);
    } catch (err) {
      setError(err);
      setLoading(false);
      console.error("Ошибка при получении данных", err);
    }
  };

  const downloadFile = (fileURL) => {
    window.open(fileURL);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    findDocsData();
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка при загрузке данных: {error.message}</p>;

  return (
    <main className="kingdom">
      <h1>База знаний КингДом</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Введите название документа..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {searchTerm &&
          isFocused && 
          ( // Блок с результатами отображается только тогда, когда searchTerm не пуст
            <div className="search-results">
              {findDocData
                .filter((findDoc) => findDoc.nameFile.includes(searchTerm))
                .map((findDoc, index, self) => (
                  <div
                    key={index}
                    className={`search-results-item ${
                      index === self.length - 1 ? "last-item" : ""
                    }`}
                    onMouseDown={() => downloadFile(findDoc.fileURL)}
                  >
                    {findDoc.nameFile}
                  </div>
                ))}
            </div>
          )}
      </div>
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
