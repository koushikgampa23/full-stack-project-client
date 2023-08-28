import * as React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import classes from "./CreatePost.module.css";
import { useNavigate } from "react-router-dom";
import LabelRequiredBadge from "../../Components/LabelRequiredBadge";
import { BsFillPatchPlusFill } from "react-icons/bs";

const CreatePost = () => {
  const initValues = {
    title: "",
    postTitle: "",
  };
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  const handleSubmit = (data: object) => {
    axios
      .post("http://localhost:3001/posts", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          navigate("/");
        }
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input the title"),
    postTitle: Yup.string().required("You must enter the content"),
  });

  return (
    <div>
      <Formik
        initialValues={initValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div className={classes.container}>
            <div className={classes.card}>
              <div className={classes.iconContainer}>
                <BsFillPatchPlusFill className={classes.iconStyle} />
                <span className={classes.heading}>Create Post</span>
              </div>
              <LabelRequiredBadge labelValue={"Title"} />
              <Field
                id="inputCreatPost"
                name="title"
                placeholder="john"
                autoComplete="off"
              />
              <ErrorMessage
                name="title"
                component="span"
                className={classes.errorMessage}
              />
              <LabelRequiredBadge labelValue={"Content"} />
              <Field id="inputPostTitle" name="postTitle" placeholder="Post" />
              <ErrorMessage
                name="postTitle"
                component="span"
                className={classes.errorMessage}
              />
              <div className={classes.buttonAlign}>
                <button type="submit" className={classes.buttonStyle}>
                  Create Post
                </button>
              </div>
              <span className={classes.errorMessage}>{error}</span>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
export default CreatePost;
