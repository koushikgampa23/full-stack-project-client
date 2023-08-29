import * as React from "react";
import axios from "axios";
import { Form, Field } from "react-final-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import classes from "./Login.module.css";
import { LoginType } from "../types";
import LabelRequiredBadge from "../../Components/LabelRequiredBadge";
import { FaUserCircle } from "react-icons/fa";

export const Login = () => {
  const [error, setError] = React.useState("");
  const { setAuthState } = useContext<any>(AuthContext);

  const navigate = useNavigate();
  const submit = (data: LoginType) => {
    axios
      .post("https://social-media-platform-486a5fef86e6.herokuapp.com/auth/login", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          navigate("/");
        }
      })
      .catch((e) => {
        setError(e.error);
      });
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.username) {
      errors.username = "Please Enter the Username";
    }
    if (!values.password) {
      errors.password = "Please Enter The Password";
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
                <FaUserCircle className={classes.iconStyle} />
                <h3 className={classes.heading}>Login In</h3>
              </div>
              <LabelRequiredBadge labelValue={"Username"} />
              <Field
                name="username"
                render={({ input, meta }) => (
                  <>
                    <input type="text" {...input} placeholder="username" />
                    {meta.touched && meta.error && (
                      <span className={classes.errorMessage}>{meta.error}</span>
                    )}
                  </>
                )}
              />
              <LabelRequiredBadge labelValue={"Password"} />
              <Field
                name="password"
                render={({ input, meta }) => (
                  <>
                    <input type="password" {...input} placeholder="password" />
                    {meta.touched && meta.error && (
                      <span className={classes.errorMessage}>{meta.error}</span>
                    )}
                  </>
                )}
              />
              <div className={classes.buttonAlign}>
                <button type="submit" className={classes.buttonStyle}>
                  Submit
                </button>
              </div>
              <Link to={"/forgetpassword"}>
                Forget Password? Security Question?
              </Link>
              <Link to={"/forgetpasswordemail"}>
                Reset password through email
              </Link>
            </form>
          </div>
        )}
      />
      <h3>{error}</h3>
    </>
  );
};
