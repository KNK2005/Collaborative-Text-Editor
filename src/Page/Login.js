import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const navigate = useNavigate();

    const login = async () => {
        //Write the code for login using firebase auth
        navigate('/');
    }
    return (
        <>
            <div className="main-content">
                <div id="login">
                    <h1>Welcome Back!</h1>
                    <input placeholder="Enter Your Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}></input>
                    <input type="password"
                        placeholder="Enter Your Password"
                        value={pass}
                        onChange={e => setPass(e.target.value)}></input>
                    <button onClick={login}>Login</button> <br /> <br />

                    <Link to="/create-account">Don't Have an Account? Create an Account.</Link>
                </div>
            </div>
        </>
    );
}

export default LoginPage;