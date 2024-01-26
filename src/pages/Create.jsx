import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { ref, set } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
function Create() {
  const navigate = useNavigate();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");

  const register = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      ).then((credential) => {
        set(ref(db, "users/" + credential.user.uid), {
          username: registerUsername,
          email: registerEmail,
          id: credential.user.uid,
        });
        const user = credential.user.uid;
        let log = {
          uids: user,
        };
        navigate("/landing", {
          state: log,
        });
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="w-100 d-flex  justify-content-center align-items-center "
    >
      <div className="bg-black p-2 border rounded-3  d-flex flex-column  justify-content-between">
        <h1 className="text-center">Sign-up</h1>
        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="Username"
            style={{ width: "350px" }}
            onChange={(e) => setRegisterUsername(e.target.value)}
            className="mb-3"
          >
            <Form.Control type="text" placeholder="name@example.com" />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            style={{ width: "350px" }}
            onChange={(e) => setRegisterEmail(e.target.value)}
            className="mb-3"
          >
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel
            onChange={(e) => setRegisterPassword(e.target.value)}
            style={{ width: "350px" }}
            controlId="floatingPassword"
            label="Password"
          >
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
        </Form>
        <Button
          onClick={(e) => register(e)}
          type="submit"
          variant="success"
          className="w-100 fw-bold mt-3 "
        >
          Sign-up
        </Button>
        <h6 className='text-end'>Already you have an account?<Link to={'/'} className='fs-6 text-center text-info fw-bolder  text-decoration-none '>Log-in</Link></h6>
      </div>
    </div>
  );
}

export default Create;
