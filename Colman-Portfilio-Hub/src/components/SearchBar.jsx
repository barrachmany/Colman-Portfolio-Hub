import { useState } from "react";
import axios from "axios";


const SearchBar = () => {


  const handleSearch = (e) => {

    axios.get(`http://localhost:5000/project/search?search=${e.target.value}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  const internships = [
    { value: "All" },
    { value: "FullStack" },
    { value: "Deep Learning" },
    { value: "Data Science" },
    { value: "Cyber" },
  ];

  return (
    <div className="navbar-container">
      <div className="inside-navbar-container">
        <input type="text" placeholder="Project name" className="navbar-input" onChange={handleSearch} />
        <select name="internship" className="navbar-select">
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
