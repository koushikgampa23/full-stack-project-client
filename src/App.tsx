import * as React from "react";
import Home from "./pages/Home";
import { Post } from "./pages/Post/Post";
import CreatePost from "./pages/CreatePost/CreatePost";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import classes from "./App.module.css";
import CreateReg from "./pages/Registration/SignUp";
import { Login } from "./pages/Login/Login";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";
import Profile from "./pages/Profile/Profile";
import UserProfile from "./pages/UserProfile/UserProfile";
import UpdatePassword from "./pages/Profile/UpdatePassword";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ForgetPasswordThroughEmail from "./pages/ForgetPasswordThroughEmail/ForgetPasswordThroughEmail";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import NoPostsYet from "./pages/NoPostsPages/NoPostsYet";

function App() {
  const [authState, setAuthState] = React.useState({
    username: "",
    id: 0,
    status: false,
  });

  React.useEffect(() => {
    axios
      .get("https://social-media-platform-486a5fef86e6.herokuapp.com/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, [authState]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <>
      <Router>
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <div className={classes.navBar}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/createpost" className={classes.link}>
              CreatePost
            </Link>
            {authState.status ? (
              <>
                <Link to="/profile" className={classes.link}>
                  Profile
                </Link>
                <span className={classes.link}>{authState.username}</span>
                <button onClick={logout} className={classes.logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signup" className={classes.link}>
                  Sign Up
                </Link>
                <Link to="/login" className={classes.link}>
                  Login
                </Link>
              </>
            )}
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/signup" element={<CreateReg />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/userprofile/:id" element={<UserProfile />} />
            <Route path="/updatepassword" element={<UpdatePassword />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route
              path="/forgetpasswordemail"
              element={<ForgetPasswordThroughEmail />}
            />
            <Route path="/nopost" element={<NoPostsYet />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AuthContext.Provider>
      </Router>
    </>
  );
}

export default App;
