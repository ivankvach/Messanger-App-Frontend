import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import data from './data';
import RightBar from './RightBar';
import { sendUser } from '../actions';
import { useSelector, useDispatch } from 'react-redux';

const LeftBar = () => {

    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();

    const [users, setUser] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8000/users")
            .then(response => response.json())
            .then(result => setUser(result))
      }, [])
      console.log(users)

function click(username) {
    //alert(username);
    dispatch(sendUser(username));
}
      
    return (
        <div>
            <h1>I'm left bar</h1>
            <div>
                <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">List group item heading</h5>
                            <small>3 days ago</small>
                        </div>
                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                        <small>Donec id elit non mi porta.</small>
                    </a>
                    {users.map((customer) =>
           
                        <a href="#" onClick={ ()=> click(customer.username)} className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{customer.username}</h5>
                                <small className="text-muted">3 days ago</small>
                            </div>
                            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                            <small className="text-muted">Donec id elit non mi porta.</small>
                        </a>
                    
                    )}
                </div>
            </div>

        </div>
    )
}

export default LeftBar