import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {

    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [cpass, setCpass] = useState();
    const navigate = useNavigate();

    const Signup = async () => {
        //Write code to sign up using firebase auth
        navigate('/');
    }
    return (
        <>
            <div className="main-content">
                <div id="signup">

                    <h2>Welcome to SyncWrite</h2>
                    <h4>Please enter your details.</h4>
                    <input placeholder="Enter Your First Name"
                        value={fname}
                        onChange={e => setFname(e.target.value)}></input>
                    <input placeholder="Enter Your Last Name"
                        value={lname}
                        onChange={e => setLname(e.target.value)} />
                    <input placeholder="Enter Your Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input placeholder="Enter Your Password"
                        type="password"
                        value={pass}
                        onChange={e => setPass(e.target.value)} />
                    <input placeholder="Confirm Your Password"
                        type="password"
                        value={cpass}
                        onChange={e => setCpass(e.target.value)} />

                    <button onClick={Signup}>Create Account</button><br /><br />

                    <Link to="/login">Already Have an Account? Login Here.</Link>

                </div>
            </div>
        </>
    );
}

export default SignUp;