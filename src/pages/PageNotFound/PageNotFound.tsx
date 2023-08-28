import { Link } from "react-router-dom";
import classes from "./PageNotFound.module.css";
import { BiSolidError } from "react-icons/bi";

const PageNotFound = () => {
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.iconContainer}>
          <BiSolidError className={classes.iconStyle} />
          <span className={classes.heading}>Page Not Found</span>
          <span>
            Go to the home page: <Link to="/">Home</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
