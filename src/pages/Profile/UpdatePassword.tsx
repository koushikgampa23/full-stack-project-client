import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useState } from "react";
import classes from "./UpdatePassword.module.css";
import { RiUserSettingsFill } from "react-icons/ri";
import LabelRequiredBadge from "../../Components/LabelRequiredBadge";

const UpdatePassword = () => {
  const [msg, setMsg] = useState("");
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    reTypePassword: "",
  };
  const handleSubmit = (data: object) => {
    axios
      .put("https://social-media-platform-486a5fef86e6.herokuapp.com/profile/updatepassword", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setMsg(res.data);
      });
  };
  return (
    <div className={classes.container}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className={classes.card}>
            <div className={classes.iconContainer}>
              <RiUserSettingsFill className={classes.iconStyle} />
              <span className={classes.heading}>Update Password</span>
            </div>
            <LabelRequiredBadge labelValue={"Old Password"} />
            <Field
              type="password"
              name="oldPassword"
              placeholder="Enter Old Password"
            />
            <LabelRequiredBadge labelValue={"New Password"} />
            <Field
              type="password"
              name="newPassword"
              placeholder="Enter New Password"
            />
            <LabelRequiredBadge labelValue={"Retype Password"} />
            <Field
              type="password"
              name="reTypePassword"
              placeholder="ReEnter New Password"
            />
            <div className={classes.buttonAlign}>
              <button type="submit" className={classes.buttonStyle}>
                Update Password
              </button>
            </div>
          </Form>
        </Formik>
        <span className={classes.errorMessage}>{msg}</span>
      </div>
  );
};

export default UpdatePassword;
