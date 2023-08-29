import * as React from "react";
import axios from "axios";
import classes from "./Comments.module.css";
import { useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import { CommentType } from "../types";
import { MdModeComment } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoSend } from "react-icons/io5";

interface Props {
  postId: string | undefined;
}

export const Comments = (postId: Props) => {
  const [commentsArr, setCommentsArr] = React.useState<CommentType[]>([]);
  const [comment, setComment] = React.useState("");
  const { authState } = useContext<any>(AuthContext);
  React.useEffect(() => {
    axios
      .get(`https://social-media-platform-486a5fef86e6.herokuapp.com/comments/${postId.postId}`)
      .then((response) => {
        setCommentsArr(response.data);
      });
  }, [postId.postId]);

  const deleteComment = (id: string) => {
    axios
      .delete(`https://social-media-platform-486a5fef86e6.herokuapp.com/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        const FilteredArray = commentsArr.filter((arr) => {
          return arr.id !== id;
        });
        setCommentsArr(FilteredArray);
      });
  };

  const content = commentsArr
    ? commentsArr.map((indPost, index) => {
        return (
          <div key={index} className={classes.commentContainer}>
            <div className={classes.alignContent}>
              <MdModeComment className={classes.subIcon} />
              <span>{indPost.commentBody}</span>
            </div>
            <div className={classes.alignContent}>
              <span className={classes.username}>{`~${indPost.username}`}</span>
              {authState.username === indPost.username && (
                <AiTwotoneDelete
                  onClick={() => deleteComment(indPost.id)}
                  className={classes.subIconDelete}
                />
              )}
            </div>
          </div>
        );
      })
    : undefined;

  const handleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };
  const submitPost = () => {
    axios
      .post(
        "https://social-media-platform-486a5fef86e6.herokuapp.com/comments/",
        {
          commentBody: comment,
          PostId: postId.postId,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setCommentsArr((prevState) => {
            return [
              ...prevState,
              {
                id: response.data.id,
                commentBody: comment,
                PostId: postId.postId,
                username: response.data.username,
              },
            ];
          });
        }
      });
  };
  return (
    <div className={classes.card}>
      {content}
      <div className={classes.commentSubContainer}>
        <span className={classes.heading}>Comment Section</span>
        <div className={classes.iconContainer}>
          <input
            type="text"
            onChange={(event) => handleComment(event)}
            placeholder="Enter Comment Here"
            className={classes.inputStyle}
          />
          <IoSend onClick={submitPost} className={classes.iconStyle} />
        </div>
      </div>
    </div>
  );
};
