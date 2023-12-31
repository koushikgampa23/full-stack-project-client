import { useParams } from "react-router-dom";
import * as React from "react";
import axios from "axios";
import classes from "./UserProfile.module.css";
import { postType } from "../types";
import { FaLocationDot } from "react-icons/fa6";
import classnames from "classnames";

const UserProfile = () => {
  const { id } = useParams();
  const [posts, setPosts] = React.useState<postType[]>();
  React.useEffect(() => {
    axios
      .get(`https://social-media-platform-486a5fef86e6.herokuapp.com/posts/individualuserposts/${id}`)
      .then((res) => {
        setPosts(res.data);
      });
  }, [id]);
  const content = posts
    ? posts.map((post, index) => {
        return (
          <div key={index}>
            <div className={classes.container}>
              <div className={classes.subContainer}>
                <div
                  className={classnames(classes.title, classes.alignContent)}
                >
                  <FaLocationDot className={classes.subIcon} />
                  {post.title}
                </div>
                <div className={classes.postTitle}>{post.postTitle}</div>
              </div>
            </div>
          </div>
        );
      })
    : "";
  return (
    <>
      {posts === undefined ? (
        "No Post Avaliable"
      ) : (
        <div className={classes.layout}>
          <div className={classes.profileContainer}>
            <span className={classes.heading}>
              {`Welcome ${posts[0].username}!,`}
              <br />
              Below are your Posts
            </span>
          </div>
          {content}
        </div>
      )}
    </>
  );
};

export default UserProfile;
