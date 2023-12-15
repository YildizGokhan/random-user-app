import React from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Swal from 'sweetalert2'



function App() {
  const url = "https://randomuser.me/api/";
  const [user, setUser] = useState({})
  const [value, setValue] = useState("")
  const [title, setTitle] = useState("")
  const [userAdd, setUserAdd] = useState([])
  const [loading, setLoading] = useState(true)

  const getUser = () => {
    axios(url).then((res) => setUser(res.data.results[0])).catch((err) => console.log(err))
    setTitle("name")
    setValue("")
  }

  useEffect(() => {
    getUser()
    setTimeout(() => {
      setLoading(false)
    }, 2000);

  }, [])

  const handleName = () => {
    setTitle("name")
    setValue(`${name?.first} ${name?.last}`)
  }

  const handleEmail = () => {
    setTitle("email")
    setValue(email)
  }

  const handleAge = () => {
    setTitle("age")
    setValue(dob?.age)
  }

  const handleStreet = () => {
    setTitle("street")
    setValue(location?.street.name)
  }

  const handlePhone = () => {
    setTitle("phone")
    setValue(phone)
  }

  const handlePassword = () => {
    setTitle("password")
    setValue(login?.password)
  }

  const handleClick = () => {
    const newUser = {
      name: name?.first,
      age: dob?.age,
      email: email,
      phone: phone,
    }
    const control = userAdd.some((item) => item.name === newUser.name && item.email === newUser.email && item.password === newUser.password && item.age === newUser.age)

    if (control) {
      Swal.fire({
        icon: "error",
        title: "Sorry 😌",
        text: "This user has already been added!",
      });
    } else {
      setUserAdd([...userAdd, newUser])
    }

  }

  const { picture, name, email, gender, dob, location, phone, login } = user

  return (

    <main>
      {loading ?
        (
          <div className="load">
            <img src="https://media1.giphy.com/media/uIJBFZoOaifHf52MER/giphy.gif" alt="" />
          </div>) : (<>
            <div className="block bcg-blue">
            <svg width="200" height="200">
                <circle cx="50" cy="50" r="40" stroke="black" stroke-width="4" fill="white" />
                <circle cx="150" cy="50" r="40" stroke="black" stroke-width="4" fill="red" />
              </svg>
            </div>
            <div className="block">
              <div className="container">
                <img src={picture?.large} alt="random user" className="user-img" />
                <p className="user-title">My {title || "name"} is</p>
                <p className="user-value">{value || `${name?.first} ${name?.last}`}</p>
                <div className="values-list">
                  <button className="icon" data-label="name">
                    <img onMouseEnter={handleName} src={gender === "female" ? womanSvg : manSvg} alt="user" id="iconImg" />
                  </button>
                  <button className="icon" data-label="email">
                    <img onMouseEnter={handleEmail} src={mailSvg} alt="mail" id="iconImg" />
                  </button>
                  <button  className="icon" data-label="age">
                    <img onMouseEnter={handleAge} src={gender === "female" ? womanAgeSvg : manAgeSvg} alt="age" id="iconImg" />
                  </button>
                  <button className="icon" data-label="street">
                    <img onMouseEnter={handleStreet} src={mapSvg} alt="map" id="iconImg" />
                  </button>
                  <button className="icon" data-label="phone">
                    <img onMouseEnter={handlePhone} src={phoneSvg} alt="phone" id="iconImg" />
                  </button>
                  <button onMouseEnter={handlePassword} className="icon" data-label="password">
                    <img src={padlockSvg} alt="lock" id="iconImg" />
                  </button>
                </div>
                <div className="btn-group">
                  <button onClick={getUser} className="btn" type="button">
                    new user
                  </button>
                  <button onClick={handleClick} className="btn" type="button">
                    add user
                  </button>
                </div>

                <table className="table">
                  <thead>
                    <tr className="head-tr">
                      <th className="th">Firstname</th>
                      <th className="th">Email</th>
                      <th className="th">Phone</th>
                      <th className="th">Age</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userAdd.map(({ email, name, phone, age, login }, index) => (
                      <tr key={index} className="body-tr">
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>{age}</td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Footer />
            </div> </>)}

    </main>
  );
}

export default App;
