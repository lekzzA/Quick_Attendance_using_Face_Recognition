/*
  lecturer navbar
*/

//react
import React, { useContext } from "react";
import { Link } from "react-router-dom";

//antd
import { Avatar } from "antd";

//context
import { NavbarContext } from "../../context/navbar";

//comp
import LecturerMenu from "./LecturerMenu";

//style
import "./LecturerSiderNavbar.css";

export default () => {

  const { collapsed } = useContext(NavbarContext);

  return (
    <div className="lecturerSiderNavbar">
      <Link to="/dashboard">
        <div className="lecturerSiderNavbar__logo">
          <Avatar
            className="avatar"
            size="large"
            alt="Face In"
            src={process.env.PUBLIC_URL + "/img/logo.png"}
            onError={(err) => {
              console.log(err);
            }}
          />
          <div
            className={
              !collapsed
                ? "lecturerSiderNavbar__text"
                : "lecturerSiderNavbar__text__hidden"
            }
          >
            <span className="lecturerSiderNavbar__text__item">Lecturer</span>
            <span className="lecturerSiderNavbar__text__item">Version</span>
          </div>
        </div>
      </Link>
      
      <div className="lecturerSiderNavbar__menu">
        <LecturerMenu />
      </div>
    </div>
  );
};