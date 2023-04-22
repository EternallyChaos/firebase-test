import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Crud from "./Crud";
const Home = () => {
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = sessionStorage.getItem("Auth Token");
    if (authToken) {
      navigate("/home");
    }
    if (!authToken) {
      navigate("/login");
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem("Auth Token");
    navigate("/login");
    // try {
    //   await signOut(auth);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userEmail = user.email;
      setCurrentLoggedInUser(userEmail);
    }
  });
  return (
    <div className="flex flex-col">
      <div className="flex justify-between mx-20 my-10">
        <div>
          <p className="font-semibold">Welcome: {currentLoggedInUser}</p>
        </div>
        <button
          className="p-1.5 hover:bg-gray-300 border-gray-500 border rounded"
          onClick={logout}
        >
          Signout
        </button>
      </div>
      <div>
        <Crud />
      </div>
    </div>
  );
};

export default Home;
