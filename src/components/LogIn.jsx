import React, { useState, useEffect } from 'react';
import { loginUser } from '../actions/loginUser';
import { setToken } from '../actions/token';
import { setRerender } from '../actions/rerender';
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
    const [isSignOrError, setisSignOrError] = useState("");

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
        dispatch(setRerender("login"));
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
                //.then(data => dispatch(setToken(data.token)))
                .then(data => {
                    setisSignOrError(data)
                    if (isSignOrError.err != undefined) {
                        setIsSignOrLog(false);
                    } else if(isSignOrError.status != undefined){
                        setIsSignOrLog(true);
                    }
                })
                .catch((error) => {
                    //setError("Username or Password incorect")
                    console.log(error);
                });
        }
        dispatch(setRerender("signup"+ + Date.now()));
        e.preventDefault();


    }

console.log("isEEERRRROOOOR"+JSON.stringify(isSignOrError));

    return (
        <div id="login">
            <form>
                {isSignOrLog ?
                    <div>
                        <h1>SignUp</h1>
                    </div>
                    :
                    <h1>Login</h1>
                }
                <div>
                    <label htmlFor="username">Username:</label>
                    {isSignOrError ?
                        <div>
                            <h6>{isSignOrError.success? isSignOrError.status : ""}</h6>
                            <h6>{isSignOrError.err? isSignOrError.err.message : ""}</h6>
                        </div>
                        :
                        <div></div>
                    }
                    <div><input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ border: "1px solid grey", borderRadius: "6px", paddingLeft: "7px" }}
                    /></div>
                    {ifName ? <h6 style={{ color: "red" }}>Fill the username</h6> : <h6></h6>}
                </div>
                {isSignOrLog == true &&
                    <div>
                        <label htmlFor="pwd">Firstname:</label>
                        <div><input
                            type="text"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            style={{ border: "1px solid grey", borderRadius: "6px", paddingLeft: "7px" }}
                        /></div>
                        {ifPassword ? <h6 style={{ color: "red" }}>Fill the firstname</h6> : <h6></h6>}
                    </div>
                }
                {isSignOrLog == true &&
                    <div>
                        <label htmlFor="pwd">Lastname:</label>
                        <div><input
                            type="text"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            style={{ border: "1px solid grey", borderRadius: "6px", paddingLeft: "7px" }}
                        /></div>
                        {ifPassword ? <h6 style={{ color: "red" }}>Fill the lastname</h6> : <h6></h6>}
                    </div>
                }
                <div>
                    <label htmlFor="pwd">Password:</label>
                    <div><input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ border: "1px solid grey", borderRadius: "6px", paddingLeft: "7px" }}
                    /></div>
                    {ifPassword ? <h6 style={{ color: "red" }}>Fill the password</h6> : <h6></h6>}
                </div>
                {error ? <h6>{error}</h6> : <h6></h6>}

                {isSignOrLog ?
                    <div class="signup">
                        <button class="signupButton" onClick={(e) => sendToSignUp(e)}>SignUp</button>
                        <span onClick={() => setIsSignOrLog(false)} style={{ marginTop: "10px" }}>LOGIN</span>
                    </div>
                    :
                    <div class="login">
                        <button class="loginButton" onClick={(e) => sendToLogIn(e)}>LogIn</button>
                        <span onClick={() => setIsSignOrLog(true)} style={{ marginTop: "10px" }}>SIGNUP</span>
                    </div>
                }
            </form>
        </div>
    )
}

export default LogIn