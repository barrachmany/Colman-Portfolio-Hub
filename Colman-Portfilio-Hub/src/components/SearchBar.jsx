import { useState, useContext } from "react";
import AppContext from "../AppContext";
import axios from "axios";
import "./projectslist/ProjectsList.css";

const SearchBar = () => {
  const { setProjects } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Internships");
  const [selectedYear, setSelectedYear] = useState("All Years");

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      search: searchQuery,
      category: selectedCategory !== "All Internships" ? selectedCategory : "",
      year: selectedYear !== "All Years" ? selectedYear : "",
    }).toString();

    axios
      .get(`/project/search?${queryParams}`)
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
        if (res.data.length === 0) {
          alert("No results found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const internships = [
    { value: "All Internships" },
    { value: "Full-Stack" },
    { value: "Deep Learning" },
    { value: "Data Science" },
    { value: "Cyber" },
    { value: "Fintech" },
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
    <div
      className="navbar-container"
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "flex-end",
      }}>
      <div className="inside-navbar-container">
        <input
          type="text"
          placeholder="Search"
          style={{ padding: "0" }}
          className="navbar-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select
          name="internship"
          className="navbar-select"
          onChange={handleCategoryChange}
          value={selectedCategory}>
          {internships.map((internship, idx) => (
            <option value={internship.value} key={idx}>
              {internship.value}
            </option>
          ))}
        </select>
        <select
          name="year"
          className="navbar-select"
          onChange={handleYearChange}
          value={selectedYear}>
          {years.map((year, idx) => (
            <option value={year.value} key={idx}>
              {year.value}
            </option>
          ))}
        </select>
        <button className="navbar-button" onClick={handleSearch}>
          {" "}
          Search{" "}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
