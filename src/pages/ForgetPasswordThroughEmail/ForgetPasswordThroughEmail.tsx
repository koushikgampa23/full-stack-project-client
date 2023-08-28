import axios from "axios";
import * as React from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import classes from "./ForgetPasswordThroughEmail.module.css";
import LabelRequiredBadge from "../../Components/LabelRequiredBadge";

const ForgetPasswordThroughEmail = () => {
  const [username, setUserName] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const handleForgetPassword = () => {
    axios
      .get(`http://localhost:3001/forgetpasswordemail/${username}`)
      .then((res) => {
        setMsg(res.data);
      });
  };

  return (
    <form onSubmit={handleForgetPassword} action="#">
      <div className={classes.container}>
        <div className={classes.card}>
          <div className={classes.iconContainer}>
            <RiLockPasswordFill className={classes.iconStyle} />
            <span className={classes.heading}>Forget Password</span>
          </div>
          <LabelRequiredBadge labelValue={"Username"} />
          <input
            type="text"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="Enter username"
            required
          />
          <div className={classes.buttonAlign}>
            <button type="submit" className={classes.buttonStyle}>
              Forget Password
            </button>
          </div>
          <span className={classes.errorMessage}>{msg}</span>
        </div>
      </div>
    </form>
  );
};

export default ForgetPasswordThroughEmail;
