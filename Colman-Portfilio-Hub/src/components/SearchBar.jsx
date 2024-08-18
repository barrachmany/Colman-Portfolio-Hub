import { useState, useContext } from "react";
import AppContext from "../AppContext";
import axios from "axios";


const SearchBar = () => {

  const { setProjects } = useContext(AppContext);

  const handleSearch = (e) => {

    axios.get(`http://localhost:5000/project/search?search=${e.target.value}`)
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
    axios.get(`http://localhost:5000/project/get/category/${e.target.value}`)
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const internships = [
    { value: "All" },
    { value: "Full-Stack" },
    { value: "Deep Learning" },
    { value: "Data Science" },
    { value: "Cyber" },
    { value: "Fintech" }
  ];

  return (
    <div className="navbar-container">
      <div className="inside-navbar-container">
        <input type="text" placeholder="Search" className="navbar-input" onChange={handleSearch} />
        <select name="internship" className="navbar-select" onChange={handleCategory}>
          {internships.map((intern, idx) => (
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
