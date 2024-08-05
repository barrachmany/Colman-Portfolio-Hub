import { IoAccessibilityOutline } from "react-icons/io5";

const SearchBar = () => {
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
        <select name="internship" className="navbar-select">
          {internships.map((intern, idx) => (
            <option value={intern.value} key={idx}>
              {intern.value}
            </option>
          ))}
        </select>
        <input type="text" placeholder="Project name" className="navbar-input" />
        <button className="navbar-select">Search</button>
        <IoAccessibilityOutline />
      </div>
    </div>
  );
};

export default SearchBar;
