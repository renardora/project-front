import React, { useState, useEffect } from "react";
import managment from "../images/managment.svg";
import "../styles/guidance.css";
import { Link, useParams } from "react-router-dom";
import axios from "../axios.js";
import pdf from "../images/pdf.png";
import AddFileButton from "./modalAddFile.jsx";
import modifyw from "../images/modifyw.png";
import deleteb from "../images/deleteb.png";

const ExperiencePage = () => {
  const { subSection } = useParams();
  const [docData, setDocData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sec, setSec] = useState("Менеджмент");
  const [subSec, setSubSec] = useState(subSection);
  const [showButtons, setShowButtons] = useState(false);
  const [role, setRole] = useState(false);

  const fetchDocsData = async () => {
    const sect = sec;
    const subSect = subSec;
    try {
      const res = await axios.put("/kingdom/getAll", {
        section: sect,
        subSection: subSect,
      });
      setDocData(res.data.docs);
      setLoading(false);
      // console.log(docData);
    } catch (err) {
      setError(err);
      setLoading(false);
      console.error("Ошибка при получении данных", err);
    }
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.userData.role == "директор") setRole(true);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0 в JavaScript
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const deleteDoc = async (docId) => {
    if (window.confirm("Вы точно хотите удалить документ?"))
      try {
        const response = await axios({
          method: "delete",
          url: "/kingdom/delete",
          data: {
            docId: docId,
          },
        });
        if (response.status === 200) {
          console.log("Документ успешно удален");
          fetchDocsData();
        }
      } catch (error) {
        console.error("Ошибка при удалении документа", error);
      }
  };

  const downloadFile = (fileURL) => {
    window.open(fileURL);
  };

  useEffect(() => {
    fetchDocsData();
    fetchUserData();
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка при загрузке данных: {error.message}</p>;

  return (
    <main className="standarts">
      <h1>
      {subSec}
        {role && (
          <>
            <AddFileButton sec={sec} subSec={subSec} />
            <button
              className="gui-button_control gui-top-button"
              onClick={() => setShowButtons(!showButtons)}
            >
              <img src={modifyw} alt="" />
            </button>
          </>
        )}
      </h1>
      <section className="standarts-sec">
        <Link to="/kingdom/managment" className="standarts-sec1">
          <img src={managment} alt="" />
          <h2>ВЕРНУТЬСЯ</h2>
        </Link>
        <div className="documents-sec">
          {docData.map((doc, index) => (
            <div key={index}>
              <div
                className="documents-item"
                onClick={() => downloadFile(doc.fileURL)}
              >
                <div className="documents-item-in">
                  <img src={pdf} alt="PDF icon" />
                  <div className="documents-item-info">
                    <h2>{doc.nameFile}</h2>
                    <span>{formatDate(doc.updatedAt)}</span>
                  </div>
                </div>
                {showButtons && role && (
                  <div>
                    <button
                      className="emp-button_control-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        const docId = doc._id;
                        deleteDoc(docId);
                      }}
                    >
                      <img src={deleteb} alt="" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ExperiencePage;
