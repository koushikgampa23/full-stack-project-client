import axios from "axios";
import * as React from "react";
import { postType } from "../types";
import classes from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import { PiSubtitlesFill } from "react-icons/pi";
import classnames from "classnames";

const Profile = () => {
  const [posts, setPosts] = React.useState<postType[]>();
  const { authState } = useContext<any>(AuthContext);
  const navigate = useNavigate();
  React.useEffect(() => {
    axios
      .get("http://localhost:3001/profile", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => setPosts(res.data));
  }, []);

  const content = posts?.map((post, index) => {
    return (
      <div key={index} className={classes.mainContainer}>
        <div className={classes.container}>
          <div className={classnames(classes.title, classes.alignContent)}>
            <PiSubtitlesFill className={classes.subIcon} />
            {post.title}
          </div>
          <div className={classes.postTitle}>{post.postTitle}</div>
        </div>
      </div>
    );
  });
  return (
    <div className={classes.layout}>
      <div className={classes.profileContainer}>
        <span
          className={classes.heading}
        >{`Welcome ${authState.username}`}</span>
        <span>Do you want to update the password?</span>
        <div className={classes.buttonAlign}>
          <button
            onClick={() => {
              navigate("/updatepassword");
            }}
            className={classes.buttonStyle}
          >
            Update Password
          </button>
        </div>
      </div>
      {posts?.length === 0 ? "No Post Avaliable" : content}
    </div>
  );
};

export default Profile;
