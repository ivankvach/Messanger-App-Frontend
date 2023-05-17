import React from 'react'

const LogIn = () => {
    return (
        <div id="login">
            <h1>Login</h1>
            <div>
            <label for="username">Username:</label>
            <div><input type="text" id="username" name="username"></input></div>
            </div>
            <div>
            <label for="pwd">Password:</label>
            <div><input type="password" id="pwd" name="pwd"></input></div>
            </div>
        </div>
    )
}

export default LogIn