import React, { useState } from "react";
import axios from "../axios";
import Modal from "react-modal";
import add from "../images/add.png";
import close from "../images/close.png";
import "../styles/modalAddFile.css";

Modal.setAppElement("#root");

const AddFileButton = ({ sec, subSec }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [nameFile, setNameFile] = useState("");
  const [section, setSection] = useState(sec);
  const [subSection, setSubSection] = useState(subSec);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("filedata", file);

    const response = await axios.post("/uploadfile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data.url);
    setFile(response.data.url);
  };

  const handleUpload = async () => {
    console.log(nameFile, file, section, subSection);
    try {
      const response = await axios.post("/kingdom/add", {
        nameFile: nameFile,
        fileURL: file,
        section: section,
        subSection: subSection,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке файла", error);
    }

    setModalIsOpen(false);
  };

  return (
    <div>
      <button
        className="gui-button_control gui-top-button-2"
        onClick={() => setModalIsOpen(true)}
      >
        <img src={add} alt="" />
      </button>
      <Modal
        className="modal_container"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <div>
          <h1>Добавить файл</h1>
          <button
            className="modal-button_control"
            onClick={() => setModalIsOpen(false)}
          >
            <img src={close} alt="" />
          </button>
        </div>
        <form className="modal-label">
          <input type="file" onChange={handleFileChange} />
          <input
            type="text"
            placeholder="Название файла"
            onChange={(e) => setNameFile(e.target.value)}
          />
          <button className="modal-button" onClick={handleUpload}>
            Загрузить
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddFileButton;
