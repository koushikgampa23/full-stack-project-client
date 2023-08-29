import * as React from "react";
import axios from "axios";
import classes from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { listPostType } from "./types";
import { TbUserCircle } from "react-icons/tb";
import { MdOutlineSubtitles } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import classnames from "classnames";
import { AuthContext } from "../helpers/AuthContext";
import { useContext } from "react";
import NoPostsPage from "./NoPostsPages/NoPostsPage";
import NoPostsYet from "./NoPostsPages/NoPostsYet";

const Home = () => {
  const [listPosts, setListPosts] = React.useState<listPostType[]>([]);
  const [likedPosts, setLikedPosts] = React.useState<any>([]);
  const [icon, setIcon] = React.useState(false);
  const { authState } = useContext<any>(AuthContext);

  const navigate = useNavigate();
  React.useEffect(() => {
    axios
      .get("https://social-media-platform-486a5fef86e6.herokuapp.com/posts", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setListPosts(response.data.listOfPosts);
        setLikedPosts(
          response.data.likedPosts?.map((like: any) => {
            return like.PostId;
          })
        );
      });
  }, []);

  const handleLike = (id: string) => {
    setIcon(!icon);
    axios
      .post(
        "https://social-media-platform-486a5fef86e6.herokuapp.com/likes",
        { PostId: id },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        setListPosts((prevState) => {
          return prevState.map((post) => {
            if (post.id === id) {
              if (response.data.liked) {
                return {
                  ...post,
                  Likes: [
                    ...post.Likes,
                    { id: "dummy", UserId: "dummy", PostId: "dummy" },
                  ],
                };
              } else {
                const likeArray = post.Likes;
                likeArray.pop();
                return { ...post, Likes: likeArray };
              }
            } else {
              return post;
            }
          });
        });
      });
    if (likedPosts.includes(id)) {
      setLikedPosts(
        likedPosts.filter((postId: any) => {
          return postId !== id;
        })
      );
    } else {
      setLikedPosts([...likedPosts, id]);
    }
  };

  const getContent = listPosts
    ? listPosts.map((post, index) => {
        return (
          <div className={classes.mainContainer} key={index}>
            <div className={classes.container}>
              <div className={classnames(classes.title)}>
                <div className={classes.alignContent}>
                  <Link
                    to={`/userprofile/${post.UserId}`}
                    className={classnames(
                      classes.linkStyle,
                      classes.alignContent
                    )}
                  >
                    <TbUserCircle className={classes.iconStyle} />
                    {post.username}
                  </Link>
                </div>
              </div>
              <div
                className={classes.postTitle}
                onClick={() => {
                  navigate(`/post/${post.id}`);
                }}
              >
                {post.postTitle}
              </div>
              <div className={classnames(classes.title, classes.subContainer)}>
                <div className={classes.alignContent}>
                  <MdOutlineSubtitles className={classes.subIcon} />
                  {post.title}
                </div>
                <div className={classes.alignContent}>
                  {likedPosts.includes(post.id) ? (
                    <FcLike
                      onClick={() => handleLike(post.id)}
                      className={classnames(classes.subIcon)}
                    />
                  ) : (
                    <FcLikePlaceholder
                      onClick={() => handleLike(post.id)}
                      className={classnames(classes.subIcon)}
                    />
                  )}
                  <label>{post.Likes.length}</label>
                </div>
              </div>
            </div>
          </div>
        );
      })
    : <NoPostsYet />;

  return (
    <div className={classes.layout}>
      {authState.status ? getContent : <NoPostsPage />}
    </div>
  );
};

export default Home;
