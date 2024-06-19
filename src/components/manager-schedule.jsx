import React from "react";
import chbr from "../images/chbr.svg";
import aup from "../images/aup.svg";
import "../styles/manager-schedule.css";
import { Link } from "react-router-dom";

const ManagerSchedule = () => {
  return (
    <main className="manSch">
      <Link to="/manager-schedule/schedule-for-chbr" className="manSchSec">
        <img src={chbr} alt="" />
        <h1>Расписание ЧБР</h1>
      </Link>
      <Link to="/manager-schedule/schedule-for-aup" className="manSchSec">
        <img src={aup} alt="" />
        <h1>Расписание АУП</h1>
      </Link>
    </main>
  );
};

export default ManagerSchedule;
