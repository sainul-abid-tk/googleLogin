import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {  getDatabase,ref, child, get } from "firebase/database";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import welcomeImage from '../assets/welcome-image.png'
function LandingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name:"",
    photoURL:""
  })
  const dbRef = ref(getDatabase());
  const GetUser = () => {
    console.log(location.state.uids);
    const displayName=location.state.uids
    const photo=location.state.photo
    if(displayName.length==28){
      get(child(dbRef, `users/${displayName}`))
      .then((snapshot) => {
        if (snapshot.exists()){
          setUser({...user,name:snapshot.val().username})

        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
    else{
      setUser({name:displayName,photoURL:photo})
    }
    
  };
  const signout = async () => {
    await signOut(auth);
    navigate("/");
  };
  useEffect(()=>{
    GetUser()
  },[])
  return (
    <div style={{ height: "100vh" }}>
      <Navbar >
        <Container>
          <Navbar.Brand  className="text-white" href="#home">
           
          </Navbar.Brand>
          <Navbar.Brand  className="text-white d-flex " href="#home">
            <div  style={{width:'40px',height:'40px',backgroundImage:`url(${user.photoURL})`,backgroundSize:'cover'}} className="d-flex justify-content-center align-items-center  border  border-white  rounded-5 me-3 ">
              {!user.photoURL&&<i class="fa-solid fa-user text-white "></i>}
            </div>
            <button
        onClick={signout}
        style={{height:'40px',width:'80px'}}
        className="btn btn-warning d-flex justify-content-center align-items-center fw-bold  "
      >
        Sign-Out
      </button>
          </Navbar.Brand>
        </Container>
      </Navbar>
    <div
    style={{height:'100%'}}
      className="row "
    >
    <div className="col-6 d-flex align-items-center justify-content-center ">
    <h1 className="welcome">HELLO <span className="text-warning">{user.name}</span></h1>
    </div>
    <div className="col-6 d-flex justify-content-center align-items-center ">
      <img width={800} src={welcomeImage} alt="" />
    </div>
    </div>
    </div>
  );
}

export default LandingPage;
