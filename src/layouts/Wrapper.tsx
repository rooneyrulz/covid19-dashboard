import React from "react";
import Spinner from "./Spin";

const Wrapper: React.FC<any> = (props) => {
  return (
    <>
      {props.loading ? (
        <Spinner />
      ) : Boolean(props.error) ? (
        <span>{props.error}</span>
      ) : (
        props.children
      )}
    </>
  );
};

export default Wrapper;
