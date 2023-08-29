import { Link } from "react-router-dom";
import classes from "./NoPostsPage.module.css";
import { BiSolidBookContent } from "react-icons/bi";

const NoPostsPage = () => {
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.iconContainer2}>
          <BiSolidBookContent className={classes.iconStyle} />
          <span className={classes.heading}>No Posts Available</span>
        </div>
        <span>
            Kindly login To view the Posts: <Link to="/login">Login/</Link><Link to="signup">Signup</Link>
          </span>
      </div>
    </div>
  );
};

export default NoPostsPage;
