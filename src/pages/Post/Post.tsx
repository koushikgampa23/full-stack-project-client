import * as React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import classes from "./Post.module.css";
import { Comments } from "../Comments/Comments";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import { useRef } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbUserCircle } from "react-icons/tb";
import classnames from "classnames";

export const Post = () => {
  let { id } = useParams();
  const [post, setPost] = React.useState<any>();
  const { authState } = useContext<any>(AuthContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputTextRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  React.useEffect(() => {
    axios.get(`http://localhost:3001/posts/byid/${id}`).then((response) => {
      setPost(response.data);
    });
  }, [id]);

  const deletePost = () => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/");
      });
  };
  const [edit, setEdit] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(post?.title);

  const editTitle = () => {
    setEdit(true);
    inputRef.current?.focus();
  };

  const handleEdit = () => {
    axios
      .put(
        "http://localhost:3001/posts/postTitle",
        { newTitle: newTitle, id: id },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        setPost({ ...post, title: newTitle });
        setEdit(false);
      });
  };

  const [editText, setEditText] = React.useState(false);
  const [newText, setNewText] = React.useState(post?.postTitle);
  const handleEditText = () => {
    axios
      .put(
        "http://localhost:3001/posts/postText",
        { newText: newText, id: id },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        setPost({ ...post, postTitle: newText });
        setEditText(false);
      });
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        <div className={classnames(classes.title, classes.subContainer)}>
          <div className={classes.alignContent}>
            <TbUserCircle className={classes.iconStyle} />
            {post?.username}
          </div>
          {authState.username === post?.username ? (
            <RiDeleteBin5Line onClick={deletePost} />
          ) : (
            ""
          )}
        </div>
        <div
          className={classes.postTitle}
          onClick={() => {
            setEditText(true);
            inputTextRef.current?.focus();
          }}
        >
          {editText && authState.username === post.username ? (
            <>
              <textarea
                rows={4}
                cols={25}
                defaultValue={post?.postTitle}
                onChange={(e) => {
                  setNewText(e.target.value);
                }}
              />
              <button onClick={handleEditText}>Done</button>
            </>
          ) : (
            post?.postTitle
          )}
        </div>
        <div className={classnames(classes.title)} onClick={editTitle}>
          {edit && authState.username === post.username ? (
            <>
              <input
                type="text"
                defaultValue={post?.title}
                ref={inputRef}
                onChange={(event) => {
                  setNewTitle(event.target.value);
                }}
              />
              <button onClick={handleEdit}>Done</button>
            </>
          ) : (
            post?.title
          )}
        </div>
      </div>
      <Comments postId={id} />
    </div>
  );
};
