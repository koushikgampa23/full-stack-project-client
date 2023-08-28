import * as React from "react";
import { Form, Field } from "react-final-form";
import axios from "axios";
import classes from "./SignUp.module.css";
import { SignUpType } from "../types";
import LabelRequiredBadge from "../../Components/LabelRequiredBadge";
import { PiUserCirclePlusFill } from "react-icons/pi";

const CreateReg = () => {
  const [msg, setMsg] = React.useState("");
  const submit = (values: SignUpType) => {
    axios.post("http://localhost:3001/auth", values).then((response) => {
      setMsg(response.data);
    });
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.username) {
      errors.username = "Please Enter the Username";
    }
    if (!values.password) {
      errors.password = "Please Enter the Password";
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;
    if (!values.emailaddress) {
      errors.emailaddress = "Please Enter the Email Address";
    } else if (!emailRegex.test(values.emailaddress)) {
      errors.emailaddress = "Invalid Email Address";
    }

    return errors;
  };

  return (
    <>
      <Form
        onSubmit={submit}
        validate={validate}
        render={({ handleSubmit }) => (
          <div className={classes.container}>
            <form onSubmit={handleSubmit} className={classes.card}>
              <div className={classes.iconContainer}>
                <PiUserCirclePlusFill className={classes.iconStyle} />
                <span className={classes.heading}>Sign Up</span>
              </div>
              <Field
                name="username"
                render={({ input, meta }) => (
                  <>
                    <LabelRequiredBadge labelValue={"UserName"} />
                    <input type="text" {...input} placeholder="Username" />
                    {meta.touched && meta.error && (
                      <span className={classes.errorMessage}>{meta.error}</span>
                    )}
                  </>
                )}
              />
              <Field
                name="password"
                render={({ input, meta }) => (
                  <>
                    <LabelRequiredBadge labelValue={"Password"} />
                    <input type="password" {...input} placeholder="password" />
                    {meta.touched && meta.error && (
                      <span className={classes.errorMessage}>{meta.error}</span>
                    )}
                  </>
                )}
              />
              <Field
                name="emailaddress"
                render={({ input, meta }) => (
                  <>
                    <LabelRequiredBadge labelValue={"Email"} />
                    <input type="text" {...input} placeholder="Enter email" />
                    {meta.touched && meta.error && (
                      <span className={classes.errorMessage}>{meta.error}</span>
                    )}
                  </>
                )}
              />
              <label>Security Question</label>
              <Field
                name="securityquestion"
                component="input"
                placeholder="Enter Security Question"
              />
              <div className={classes.buttonAlign}>
                <button type="submit" className={classes.buttonStyle}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      />
      <h4>{msg}</h4>
    </>
  );
};

export default CreateReg;
