import { Link } from "react-router-dom";
import classes from "./NoPostsPage.module.css";
import { BiSolidBookContent } from "react-icons/bi";

const NoPostsYet = () => {
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.iconContainer2}>
          <BiSolidBookContent className={classes.iconStyle2} />
          <span className={classes.heading}>No Posts Yet</span>
        </div>
        <span>
          Kindly create a post To view the Posts:
          <Link to="/createpost">Create Post</Link>
        </span>
      </div>
    </div>
  );
};

export default NoPostsYet;
