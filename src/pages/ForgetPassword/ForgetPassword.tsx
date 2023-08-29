import * as React from "react";
import axios from "axios";
import { FaUserLock } from "react-icons/fa";
import classes from "./ForgetPassword.module.css";
import LabelRequiredBadge from "../../Components/LabelRequiredBadge";

const ForgetPassword = () => {
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [securityPassword, setSecurityPassword] = React.useState("");
  const [reTypePassword, setReTypePassword] = React.useState("");
  const [msg, setMsg] = React.useState("");

  const handleForgetPassword = () => {
    axios
      .post("https://social-media-platform-486a5fef86e6.herokuapp.com/forgetpassword", {
        username: username,
        securityQuestion: securityPassword,
        newPassword: password,
        reTypePassword: reTypePassword,
      })
      .then((res) => {
        setMsg(res.data);
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.iconContainer}>
          <FaUserLock className={classes.iconStyle} />
          <span className={classes.heading}>Forget Password</span>
        </div>
        <LabelRequiredBadge labelValue={"UserName"} />
        <input
          type="username"
          placeholder="Enter Username"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <LabelRequiredBadge labelValue={"Security Question"} />
        <input
          type="text"
          placeholder="Enter Seurity Answer"
          onChange={(e) => {
            setSecurityPassword(e.target.value);
          }}
        />
        <LabelRequiredBadge labelValue={"Password"} />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <LabelRequiredBadge labelValue={"Retype Password"} />
        <input
          type="password"
          placeholder="ReEnter Password"
          onChange={(e) => {
            setReTypePassword(e.target.value);
          }}
        />
        <div className={classes.buttonAlign}>
          <button
            onClick={handleForgetPassword}
            className={classes.buttonStyle}
          >
            Forget Password
          </button>
        </div>
        <span className={classes.errorMessage}>{msg}</span>
      </div>
    </div>
  );
};
export default ForgetPassword;
