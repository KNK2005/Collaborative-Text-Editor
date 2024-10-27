import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <div className="logo">
                <img src="/SyncWriteLogo.jpg" alt="Logo"/>
            </div>
            <div className="slogan"><span>Where Ideas Flow, Together</span></div>
            <div className="links">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/create-account">Sign Up</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;