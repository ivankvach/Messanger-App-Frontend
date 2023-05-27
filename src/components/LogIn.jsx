import React, { useState, useEffect } from 'react';
import { loginUser } from '../actions/loginUser';
import { setToken } from '../actions/token';
import { useSelector, useDispatch } from 'react-redux';

const LogIn = () => {

    const loginUserRedux = useSelector(state => state.loginUser);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [error, setError] = useState("");
    const [ifName, setIfName] = useState(false);
    const [ifPassword, setIfPassword] = useState(false);
    const [isSignOrLog, setIsSignOrLog] = useState(false);

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

    function sendToSignUp(e) {
        //alert("hi");

        if (name != "" && password != "") {

            //dispatch(loginUser({ "username": name, "password": password }));

            fetch("http://localhost:8000/users/signup", {
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
        e.preventDefault();
        setIsSignOrLog(false);
    }

    return (
        <div id="login">
            <form>
                {isSignOrLog ?
                    <h1>SignUp</h1>
                    :
                    <h1>Login</h1>
                }
                <div>
                    <label htmlFor="username">Username:</label>
                    <div><input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required /></div>
                    {ifName ? <h6 style={{ color: "red" }}>Fill the username</h6> : <h6></h6>}
                </div>
                {isSignOrLog == true &&
                    <div>
                        <label htmlFor="pwd">Firstname:</label>
                        <div><input
                            type="text"
                            value={firstname}
                            onChange={(e) => setPassword(e.target.value)}
                            required /></div>
                        {ifPassword ? <h6 style={{ color: "red" }}>Fill the firstname</h6> : <h6></h6>}
                    </div>
                }
                {isSignOrLog == true &&
                    <div>
                        <label htmlFor="pwd">Lastname:</label>
                        <div><input
                            type="text"
                            value={lastname}
                            onChange={(e) => setPassword(e.target.value)}
                            required /></div>
                        {ifPassword ? <h6 style={{ color: "red" }}>Fill the lastname</h6> : <h6></h6>}
                    </div>
                }
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

                {isSignOrLog ?
                    <div>
                        <button onClick={(e) => sendToSignUp(e)}>SignUp</button>
                        <span onClick={() => setIsSignOrLog(false)} style={{marginLeft: "10px"}}>LogIn</span>
                    </div>
                    :
                    <div>
                        <button onClick={(e) => sendToLogIn(e)}>LogIn</button>
                        <span onClick={() => setIsSignOrLog(true)} style={{marginLeft: "10px"}}>SignUp</span>
                    </div>
                }
            </form>
        </div>
    )
}

export default LogIn