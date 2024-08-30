import { useState, useContext } from "react";
import AppContext from "../AppContext";
import axios from "axios";
import './projectslist/ProjectsList.css';


const SearchBar = () => {

  const { setProjects } = useContext(AppContext);

  const handleSearch = (e) => {

    axios.get(`/project/search?search=${e.target.value}`)
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  const handleCategory = (e) => {
    console.log(e.target.value);
    axios.get(`/project/get/category/${e.target.value}`)
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const internships = [
    { value: "All Internships" },
    { value: "Full-Stack" },
    { value: "Deep Learning" },
    { value: "Data Science" },
    { value: "Cyber" },
    { value: "Fintech" }
  ];

  const years = [
    { value: "All Years" },
    { value: 2024 },
    { value: 2023 },
    { value: 2022 },
    { value: 2021 },
    { value: 2020 },
  ];

  return (
    <div className="navbar-container"
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end'
      }}>
      <div className="inside-navbar-container">
        <input type="text" placeholder="Search" style={{ padding: '0' }} className="navbar-input" onChange={handleSearch} />
        <select name="internship" className="navbar-select" onChange={handleCategory} >
          {internships.map((year, idx) => (
            <option value={year.value} key={idx}>
              {year.value}
            </option>
          ))}
        </select>
        <select name="year" className="navbar-select" onChange={handleCategory} >
          {years.map((intern, idx) => (
            <option value={intern.value} key={idx}>
              {intern.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
