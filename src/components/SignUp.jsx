import React, { useState, useEffect } from 'react';
import { loginUser } from '../actions/loginUser';
import { setToken } from '../actions/token';
import { useSelector, useDispatch } from 'react-redux';

const SignUp = () => {

    const loginUserRedux = useSelector(state => state.loginUser);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [ifName, setIfName] = useState(false);
    const [ifPassword, setIfPassword] = useState(false);

    console.log("nameFrom Login " + name);
    console.log("LastnameFrom Login " + password);
    console.log("LOOOOOGGIINN" + loginUserRedux.username)

    function sendToLogIn(e) {

        if (name == "") {
            setIfName(true);
        } else {
            setIfName(false);
        }
        if (password == "") {
            setIfPassword(true);
        } else {
            setIfPassword(false);
        }

        if (name != "" && password != "") {

            dispatch(loginUser({ "username": name, "password": password }));

            fetch("http://localhost:8000/users/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Access-Control-Allow-Origin': true
                },
                body: JSON.stringify({ "username": name, "password": password }),
                credentials: "same-origin"

            })
                .then(res => res.json())
                //.then(data => console.log({"username": data.user[0].username, "token": data.token}))
                //.then(data => setToken({"OlehKvach": data.token}))
                .then(data => dispatch(setToken(data.token)))
                .catch((error) => {
                    setError("Username or Password incorect")
                });
        }
        e.preventDefault()
    }

    function signClick(){
        alert("hi");
    }

    return (
        <div id="login">
            <form>
                <h1>Login</h1>
                <div>
                    <label htmlFor="username">Username:</label>
                    <div><input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required /></div>
                    {ifName ? <h6 style={{ color: "red" }}>Fill the username</h6> : <h6></h6>}
                </div>
                <div>
                    <label htmlFor="pwd">Password:</label>
                    <div><input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required /></div>
                    {ifPassword ? <h6 style={{ color: "red" }}>Fill the password</h6> : <h6></h6>}
                </div>
                {error ? <h6>{error}</h6> : <h6></h6>}
                <div>
                    <button onClick={(e) => sendToSignUp(e)}>SignUp</button>
                    <span onClick={signClick}>LogIn</span>
                    </div>
            </form>
        </div>
    )
}

export default SignUp