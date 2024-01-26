import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import {signInWithEmailAndPassword, signInWithPopup,
  GoogleAuthProvider} from 'firebase/auth'
import google from '../assets/google.png'
import {auth} from '../firebase'
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate=useNavigate()
  const [loginEmail,setLoginEmail]=useState("")
  const [loginPassword,setLoginPassword]=useState("")
  const provider = new GoogleAuthProvider();

  const googleRegister = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        let log = {
          uids:user.displayName,
          photo:user.photoURL
        };
        navigate("/landing", {
          state: log,
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        alert(error)
        // ...
      });
  };
  
  const logIn= async (e)=>{
    e.preventDefault()
    try{
    const user = await signInWithEmailAndPassword(auth,loginEmail,loginPassword).then((credential)=>{
    const user=credential.user.uid
    let log={
      uids:user
    }
    navigate('/landing',{
      state:log
    })
    })
    }
    catch(error){
        alert(error.message);
    }
   }

  return (
    <div style={{height:'100vh'}} className='w-100 d-flex  justify-content-center align-items-center '>
        <div  className='bg-black p-2 border rounded-3  d-flex flex-column  justify-content-between'>
            <h1 className='text-center'>Login</h1>
            <Form >
            <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        style={{width:'350px'}}
        onChange={e=>setLoginEmail(e.target.value)}
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel
        onChange={e=>setLoginPassword(e.target.value)}
        style={{width:'350px'}}
       controlId="floatingPassword"
       label="Password">
        <Form.Control type="password" placeholder="Password" />
      </FloatingLabel>
      </Form>
      <Button onClick={e=>logIn(e)} type='submit' variant="success" className='w-100 fw-bold mt-3 '>Login</Button>
        <h6 className='text-end'>Are you a new user?<Link to={'/create'} className='fs-6 text-center text-info fw-bolder  text-decoration-none '>Sign-up</Link></h6>
        <h6 className="text-center mt-2 ">OR</h6>
        <Button
          onClick={(e) => googleRegister(e)}
          type="submit"
          variant="light"
          className="w-100 fw-bold mt-1 "
        >
        <img width={25} src={google} alt="" />  continue with <span className="fw-bolder">Google</span>
        </Button>
      </div>
    </div>
  )
}

export default Login