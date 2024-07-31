import { IoAccessibilityOutline } from "react-icons/io5";


const NavBar = () => {

    const internships = [
        { value: 'All' },
        { value: 'FullStack' },
        { value: 'Deep Learning' },
        { value: 'Data Science' },
        { value: 'Cyber' }
    ]

    return (
        <div className="navbar-container">
            <h1>Colman Portfilio Hub</h1>
            <div className="inside-navbar-container">
                <select name="internship" className="navbar-select">
                    {internships.map((intern, idx) => (
                        <option value={intern.value} key={idx}>{intern.value}</option>
                    ))}
                </select>
                <input type="text" placeholder="Search" className="navbar-input" />
                <IoAccessibilityOutline />
            </div>
        </div>

    );
}

export default NavBar;