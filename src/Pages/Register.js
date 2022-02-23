import "../App.css";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const baseUrl =
  process.env.REACT_APP_ENV === "STAGING"
    ? process.env.REACT_APP_stagingBaseUrl
    : process.env.REACT_APP_productionBaseUrl;

function Register() {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const nevigate = useNavigate();

  const userSignUP = (e) => {
    e.preventDefault();
    console.log(data);
    Axios.post(`${baseUrl}/user/register`, data)
      .then((response) => {
        nevigate("/");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      });
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  return (
    <div className="form-wrraper">
      <form name="registration_form">
        <div>
          <div className="form-group">
            <label htmlFor="name" className="label_text">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="label_text">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label_text">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn text-dark update"
              onClick={userSignUP}
            >
              Register
            </button>
          </div>
        </div>
      </form>
      <div className="form-group">
        <a href="/">Login</a>
      </div>
      {error && <div className="form-group">{error}</div>}
    </div>
  );
}

export default Register;
