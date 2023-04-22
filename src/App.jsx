import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import MainForm from "./components/MainForm";
import Home from "./pages/Home";
import { auth, googleProvider } from "./config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const signInWithGoogle = async () => {
  //   try {
  //     await signInWithPopup(auth, googleProvider);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // console.log(auth?.currentUser?.email);

  console.log("before email", email);

  const handleAction = (action) => {
    console.log("after email", email);

    if (action === "register") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          toast.success("Registered Successfully");
          navigate("/home");
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          );
        })
        .catch((err) => {
          console.error(err);
          if (err.code === "auth/email-already-in-use") {
            toast.error("Email Already in Use");
          }
        });
    }
    if (action === "login") {
      signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          toast.success("Logged in Successfully");
          navigate("/home");
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          );
        })
        .catch((err) => {
          console.error(err);
          if (err.code === "auth/wrong-password") {
            toast.error("please check the password");
          } else if (err.code === "auth/user-not-password") {
            toast.error("Please check the email");
          }
        });
    }
  };
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route
          path="/login"
          element={
            <MainForm
              title="Login"
              setEmail={setEmail}
              setPassword={setPassword}
              handleAction={() => handleAction("login")}
            />
          }
        />
        <Route
          path="/register"
          element={
            <MainForm
              title="Register"
              setEmail={setEmail}
              setPassword={setPassword}
              handleAction={() => handleAction("register")}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
