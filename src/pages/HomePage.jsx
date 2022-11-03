import { Navigate } from "react-router-dom";

export const HomePage = () => {
  console.log(
    "REACT_APP_WS_LOGIN_FONASA:" + process.env.REACT_APP_WS_LOGIN_FONASA
  );
  console.log("REACT_APP_AMBIENTE:" + process.env.REACT_APP_AMBIENTE);
  return (
    <div className="container">
      <Navigate to="/login" />
    </div>
  );
};
