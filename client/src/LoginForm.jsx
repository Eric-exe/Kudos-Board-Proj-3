import { useState } from "react";
import API from "./api";
import propTypes from "prop-types";

LoginForm.propTypes = {
    userData: propTypes.array.isRequired,
    boardDataFunc: propTypes.func.isRequired,
};

function LoginForm(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");

    const handleResponse = (response, isRegister) => {
        if (response.status == 400) {
            setStatus("Bad username or password");
            return;
        }

        if (response.status == 409) {
            if (isRegister) {
                setStatus("Username taken");
            } else {
                setStatus("Bad username or password");
            }
            return;
        }

        bootstrap.Modal.getInstance(document.getElementById("loginFormModal")).hide();
        // reflect the board data to match up to that of the user
        setUsername("");
        setPassword("");
        setStatus("");
    };

    const handleRegister = async () => {
        let response = await API.registerUser(props.userData[1], username, password);
        console.log("UP>", props.userData[0]);
        handleResponse(response, true);
    };

    const handleLogin = async () => {
        let response = await API.loginUser(props.userData[1], username, password);
        handleResponse(response, false);
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-outline-light"
                data-bs-toggle="modal"
                data-bs-target="#loginFormModal"
            >
                {props.userData[0]["username"]}
            </button>

            <div className="modal fade in" id="loginFormModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-dark">Login</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body text-dark">
                            <p className="text-danger">{status}</p>
                            <div className="row mb-2 align-items-center">
                                <div className="col-3">Username:</div>

                                <div className="col-9">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="usernameInput"
                                        onChange={(event) => setUsername(event.target.value)}
                                        value={username}
                                    />
                                </div>
                            </div>

                            <div className="row align-items-center">
                                <div className="col-3">Password:</div>

                                <div className="col-9">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="passwordInput"
                                        onChange={(event) => setPassword(event.target.value)}
                                        value={password}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleRegister}>
                                Register
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleLogin}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginForm;
