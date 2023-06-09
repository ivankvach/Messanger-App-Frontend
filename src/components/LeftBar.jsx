import React, { useState, useEffect } from 'react';
import LogIn from './LogIn';
import { Link } from "react-router-dom";
import data from './data';
import RightBar from './RightBar';
import { sendUser } from '../actions';
import { loginUser } from '../actions/loginUser';
import { setToken } from '../actions/token';
import { setRerender } from '../actions/rerender';
import { useSelector, useDispatch } from 'react-redux';

const LeftBar = () => {

    const loginUserRedux = useSelector(state => state.loginUser);
    const tokenRedux = useSelector(state => state.token);
    const rerender = useSelector(state => state.rerender);
    const dispatch = useDispatch();

    const [users, setUser] = useState([]);
    // const [token, setToken] = useState(false);
    const [userOrAll, setUserOrAll] = useState("");
    const [all, setAll] = useState(false);
    const [myFriend, setMyFriend] = useState("");


    useEffect(() => {
        fetch("http://localhost:8000/users")
            .then(response => response.json())
            .then(result => setUser(result))
        setUserOrAll(loginUserRedux.username)
    }, [rerender])
    console.log(users)

    function click(username) {
        //alert(username);
        dispatch(sendUser(username));
    }

    /*
    const handleSubmit = () => {
    fetch("http://localhost:8000/users/login", {
    method: 'POST',
    headers: {
          'Content-Type': 'application/json'
         // 'Access-Control-Allow-Origin': true
    },
    body: JSON.stringify({"username": "OlehKvach", "password": "oleh"}),
    credentials: "same-origin"
    
    })
    .then(res => res.json())
    //.then(data => console.log({"username": data.user[0].username, "token": data.token}))
    .then(data => setToken({"OlehKvach": data.token}))
    }
    */

    function clickAll(boolean) {
        if (boolean == true) {
            //setUserOrAll(loginUserRedux)
            setAll(true)
        }
        if (boolean == false) {
            //setUserOrAll(loginUserRedux.username + 123)
            setAll(false);
        }
    }

    function addFriends(e, customer) {
        console.log(customer)
        fetch("http://localhost:8000/users/update", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": customer.username, "password": customer.password, "friends": loginUserRedux.username }),
            credentials: "same-origin"

        })
            .then(res => res.json())
            .then(data => console.log(data))
        dispatch(setRerender("addfriend" + customer.username + + Date.now()));
        e.preventDefault();
        e.stopPropagation();
    }

    function deleteFriends(e, customer) {
        fetch("http://localhost:8000/users/deletefriend", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": customer.username, "password": customer.password, "friends": loginUserRedux.username }),
            credentials: "same-origin"

        })
            .then(res => res.json())
            .then(data => console.log(data))
        dispatch(setRerender("deletefriend" + customer.username + Date.now()));
        e.preventDefault();
        e.stopPropagation();
    }

    function getFriend(item) {
        var isFriend = "";
        item.map((friend) => {
            if (friend == loginUserRedux.username) {
                isFriend = friend;
            }
        })
        return isFriend;
    }

    function myFunction(e) {
        let arrayNew = [];
        fetch("http://localhost:8000/users")
            .then(response => response.json())
            .then(result => {
                result.map((user) => { if (user.username.toLowerCase().includes(e.target.value.toLowerCase())) arrayNew.push(user) })
                setUser(arrayNew);
            })
    }

    function deleteUser(e) {
        //window.confirm("Your account was successfully deleted");
        if (window.confirm("Do You want delete Your account?")) {
            fetch("http://localhost:8000/users/deleteuser", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "username": loginUserRedux.username }),
                credentials: "same-origin"

            })
                .then(res => res.json())
                .then(data => console.log(data))
            dispatch(loginUser({}));
            dispatch(setToken(""))
            //e.preventDefault();
            //e.stopPropagation();   
            dispatch(setRerender("deleteuser" + loginUserRedux.username + Date.now()));
            alert("Your account was successfully deleted");
        }
    }

    function signOutUser(e) {
            dispatch(loginUser({}));
            dispatch(setToken(""));
            dispatch(sendUser(""));
            //e.preventDefault();
            //e.stopPropagation();   
            dispatch(setRerender("signOutUser" + loginUserRedux.username + Date.now()));
            //alert("Your account was successfully deleted");
    }    

    return (
        <div>

            <div style={{ marginTop: "20px", marginBottom: "10px" }}>{loginUserRedux.username ?
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                    <h4 >{loginUserRedux.username}</h4>
                    {/*<button style={{ width: "fit-content", height: "33px", fontSize: "20px", border: "1px solid grey", borderRadius: "3px" }} onClick={(e) => deleteUser(e)}>delete account</button>*/}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", alignItems: "center", justifyItems: "right"}}><button class="signOutUser" onClick={(e) => signOutUser(e)}>SignOut</button></div>
                </div>
                : <div></div>}
            </div>

            {/*<button onClick={handleSubmit}>token</button>*/}

            {tokenRedux ?
                <div>
                    <div className="list-group-search">
                        <button style={{ marginRight: "3px", backgroundColor: "lightblue", borderRadius: "3px", border: "1px solid blue" }} onClick={() => clickAll(true)}>All</button>
                        <button style={{ marginRight: "5px", backgroundColor: "lightblue", borderRadius: "3px", border: "1px solid blue" }} onClick={() => clickAll(false)}>My</button>
                        <input type="text" placeholder="search..." style={{ width: "100%", borderRadius: "4px", border: "1px solid grey", paddingLeft: "9px" }} onChange={myFunction} />
                    </div>
                    <div className="list-group" style={{ overflowY: "scroll", height: "600px" }}>
                        {/*<a href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">List group item heading</h5>
                                <small>3 days ago</small>
                            </div>
                            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                            <small>Donec id elit non mi porta.</small>
                            <button onClick={() => clickAll(true)}>All</button>
                            <button onClick={() => clickAll(false)}>My</button>
                        </a>
                        <div className="list-group-search">
                            <button onClick={() => clickAll(true)}>All</button>
                            <button onClick={() => clickAll(false)}>My</button>
                            <input type="text" placeholder="search..." style={{ width: "100%" }} />
                        </div>*/}
                        {users.map((customer) =>
                            all ?
                                <div className="d-flex w-100 justify-content-between">
                                    <a href="#" onClick={() => click(customer.username)} className="list-group-item list-group-item-action flex-column align-items-start">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">{customer.username}</h5>
                                            <small className="text-muted">{getFriend(customer.friends) != loginUserRedux.username ? <button class="addFriendButton" onClick={(e) => addFriends(e, customer)}>add</button> : null}</small>
                                        </div>
                                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                        <small className="text-muted">Donec id elit non mi porta.</small>
                                    </a>

                                </div>
                                :
                                getFriend(customer.friends) == loginUserRedux.username &&


                                <div className="d-flex w-100 justify-content-between">
                                    <a href="#" onClick={() => click(customer.username)} className="list-group-item list-group-item-action flex-column align-items-start">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">{customer.username}</h5>
                                            <small className="text-muted"><button class="deleteFriendButton" onClick={(e) => deleteFriends(e, customer)}>x</button></small>
                                        </div>
                                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                        <small className="text-muted">Donec id elit non mi porta.</small>
                                    </a>

                                </div>

                        )}
                    </div>
                </div> : <LogIn />
            }
        </div>
    )
}

export default LeftBar