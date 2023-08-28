import * as React from "react";
import classes from './Test.module.css';

const Test = () => {
  const [data, setData] = React.useState("");
  const [clikData, setClickData] = React.useState<any>([]);

  const handleData = () => {
    setData('');
    setClickData((prevState:any) => {
      return [...prevState, data];
    });
  };
  return (
    <>
      Test Page
      <input
        type="text"
        onChange={(e) => {
          setData(e.target.value);
        }}
        value={data}
      />
      <button onClick={handleData} className={classes.buttonStyle}>Click Me</button>
      <h3>{clikData}</h3>
    </>
  );
};

export default Test;
