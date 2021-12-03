import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <>
      <div>
        <h2>Not Found!</h2>
      </div>
      <div>
        <Link to="/">Return home</Link>
      </div>
    </>
  );
};
