import { useState, useEffect, useContext } from "react";
import "./SmartSearchPage.css";
import axios from "axios";
import AppContext from "../../AppContext";

const SmartSearchPage = () => {

    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const { projects, setProjects } = useContext(AppContext);

    const handleSearch = () => {
        axios.get(`http://localhost:5000/project/findbestfit?search=${search}`)
            .then((res) => {
                console.log(res.data.results);
                setResults(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
    }, [projects]);

    return (
        <div className="smart-search-page">
            <h1>Smart AI Search</h1>
            <input type="text" onChange={handleChange} placeholder='Example: " i want to search a project that about cyber serurity " ' />
            <button onClick={handleSearch} >Search</button>
            {results && results.map((result) => {
                return (
                    <div key={result.name} className="result">
                        <h1>{result.name}</h1>
                        <p>{result.relevance}</p>
                        <p>{result.description}</p>
                    </div>
                );
            })}
        </div>
    );

};

export default SmartSearchPage;
