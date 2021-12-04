import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { CLIENT_ID } from "../../constants";

export const Login = () => {
  const authorizationURL = useMemo(() => {
    const authorizationState = uuidv4();
    localStorage.setItem("authorizationState", authorizationState);
    const queryParams = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: "code",
      state: authorizationState,
    });
    return `https://www.bungie.net/en/OAuth/Authorize?${queryParams}`;
  }, []);

  const onLoginClick = () => {
    console.log("login");
  };

  return (
    <a rel="noopener noreferrer" onClick={onLoginClick} href={authorizationURL}>
      Login?
    </a>
  );
};
