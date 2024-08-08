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
        <input type="text" placeholder="Project name" className="navbar-input" />
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
