import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';

const RightBar = () => {

  const userRedux = useSelector(state => state.user);
  const loginUserRedux = useSelector(state => state.loginUser);
  console.log("loginUserRedux" + loginUserRedux.username)

  const [users, setUser] = useState([]);
  const [getmessage, setGetMessage] = useState([]);

  const [message, setMessage] = useState();
  const [messageStore, setMessageStore] = useState("start");
  const ref = useRef(null);


  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then(response => response.json())
      .then(result => setUser(result))
  }, [])
  console.log(users)

  useEffect(() => {
    fetch("http://localhost:8000/message", {
      method: 'GET',
      headers: {
        'Data': loginUserRedux.username + '+' + userRedux,
        'DataReverse': userRedux + '+' + loginUserRedux.username
      }
    })
      .then(response => response.json())
      .then(result => setGetMessage(result))
  }, [userRedux])

  useEffect(() => {
    fetch("http://localhost:8000/message", {
      method: 'GET',
      headers: {
        //'Data': 'IvanKvach+'+ userRedux,
        //'DataReverse': userRedux + '+IvanKvach'
        'Data': loginUserRedux.username + '+' + userRedux,
        'DataReverse': userRedux + '+' + loginUserRedux.username
      }
    })
      .then(response => response.json())
      .then(result => setGetMessage(result))
  }, [messageStore])

  console.log(messageStore)

  const handleChange = (event) => {
    setMessage({ ...message, [event.target.name]: event.target.value })
  }
  console.log(message)
  console.log('Ivankvach+' + userRedux)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ ...message, "ivan": message.message })
    fetch("http://localhost:8000/message", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true,
        'Data': 'IvanKvach+MartynKvach'
      },
      body: JSON.stringify({ "name": loginUserRedux.username + '+' + userRedux, "message": message.message + (new Date().toLocaleTimeString() + " " + new Date(Date.now()).toLocaleString().split(',')[0]) }),
      credentials: "same-origin"

    })
      .then(res => res.json())
      .then(res => {
        setMessageStore(res.message)
        ref.current.value = "";
      })
    //.then(data => console.log(data))
    //.then(data => dispatch(increment(data)))  
  }
  //localStorage.setItem('martin', JSON.stringify(message.message));
  //JSON.stringify(localStorage.setItem("ivan", { ...message, "ivan": message.message }))
  //   const handleSubmit = (event) => {
  //     event.preventDefault()
  //     console.log({ ...message, "ivan": message.message })
  //     //localStorage.setItem('martin', JSON.stringify(message.message));
  //   //JSON.stringify(localStorage.setItem("ivan", { ...message, "ivan": message.message }))
  //   localStorage.setItem("ivan", JSON.stringify({ ...message, "ivan": message.message }))
  //   setMessageStore(localStorage.getItem("ivan"))
  //   }

  return (
    <div>
       {userRedux ?
      <div>
      <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" style={{marginTop: "35px"}}>
        <div className="d-flex w-100 justify-content-between" >
          {/* <h5 className="mb-1">{users.map((customer) => customer.username =='IvanKvach' ? customer.username : ' ')}</h5> */}
          <h5 className="mb-1">{userRedux}</h5>
          <small className="text-muted">3 days ago</small>
        </div>
        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
        {/* <small className="text-muted">{'Ivan: ' + JSON.parse(localStorage.getItem("ivan")).message}</small> */}
      </a>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1"></label>

          <div className="form-group-messages" style={{ overflowY: "scroll", height: "500px" }}>
            {userRedux ? getmessage.map((messages) =>
              <p style={{ backgroundColor: "lightblue", borderRadius: "10px", paddingLeft: "10px", paddingRight: "10px", width: "max-content" }}>{messages.message}</p>
            ) : <p style={{ textAlign: "center"}}>no messages yet... choose the user</p>
            }
          </div>
          <div className="form-group-messages-text">
            {/*<textarea className="form-control" id="exampleFormControlTextarea1" rows="2"
            name="message"
            type="text"
            placeholder="message..."
            onChange={handleChange}
        ></textarea>*/}
            <input
              type="text"
              ref={ref}
              name="message"
              placeholder="message..."
              onChange={handleChange}
              style={{borderRadius: "6px", height: "35px", paddingLeft: "10px", border: "1px solid grey"}}
              />
            <button style={{borderRadius: "6px", height: "35px", border: "1px solid grey", backgroundColor: "lightblue"}}>send</button>
          </div>
        </div>
      </form>
    </div>
    : <div class="noMessage"><p style={{ textAlign: "center"}}>no messages yet... choose the user</p></div>}
    </div>
  )
}

export default RightBar