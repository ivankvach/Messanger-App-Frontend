import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

const RightBar = () => {

  const userRedux = useSelector(state => state.user);

  const [users, setUser] = useState([]);
  const [getmessage, setGetMessage] = useState([]);

  const [message, setMessage] = useState();
  const [messageStore, setMessageStore] = useState("start")
  const [changeData, setChangeData] = useState([]);

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
        'Data': 'IvanKvach+'+ userRedux,
        'DataReverse': userRedux + '+IvanKvach'
  }})
      .then(response => response.json())
      .then(result => setGetMessage(result))
  }, [userRedux])

  useEffect(() => {
    fetch("http://localhost:8000/message", {
      method: 'GET',
      headers: {
        'Data': 'IvanKvach+'+ userRedux,
        'DataReverse': userRedux + '+IvanKvach'
  }})
      .then(response => response.json())
      .then(result => setGetMessage(result))
  }, [messageStore])

  console.log(messageStore)

  const handleChange = (event) => {
    setMessage({ ...message, [event.target.name]: event.target.value })
  }
  console.log(message)
  console.log('Ivankvach+'+ userRedux)

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
      body: JSON.stringify({ "name": "IvanKvach+OlehKvach", "message": message.message }),
      credentials: "same-origin"

    })
      .then(res => res.json())
      .then(res => setMessageStore(res.message))
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
      <h1>I'm right bar</h1>
      <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          {/* <h5 className="mb-1">{users.map((customer) => customer.username =='IvanKvach' ? customer.username : ' ')}</h5> */}
          <h5 className="mb-1">{userRedux}</h5>
          <small className="text-muted">3 days ago</small>
        </div>
        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
        {/* <small className="text-muted">{'Ivan: ' + JSON.parse(localStorage.getItem("ivan")).message}</small> */}
      </a>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="exampleFormControlTextarea1"></label>
          {userRedux ? getmessage.map((messages) =>
            <p>{messages.message}</p>
          ) : <p>no messages yet... choose the user</p>}
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
            name="message"
            type="text"
            placeholder="message..."
            onChange={handleChange}
          ></textarea>
          <button>send</button>
        </div>
      </form>
    </div>
  )
}

export default RightBar