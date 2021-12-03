import React from "react";
import { API_KEY, BASE_URL, CLIENT_ID } from "../../utils/oauth";
import { getToken } from "../../utils/oauth-tokens";

export const Home = () => {
  const authorizationURL = (reauth?: string) => {
    const queryParams = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: "code",
      ...(reauth && { reauth }),
    });
    return `https://www.bungie.net/en/OAuth/Authorize?${queryParams}`;
  };

  const onLoginClick = (_e: React.MouseEvent) => {
    console.log("login");
  };

  const pog = () => {
    const tokens = getToken();
    if (!tokens) {
      return;
    }

    fetch(`${BASE_URL}/User/GetCurrentBungieNetUser/`, {
      method: "GET",
      headers: {
        "X-API-Key": API_KEY,
        Authorization: "Bearer " + tokens.accessToken.value,
      },
    })
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((r) => console.log(r));
  };

  return (
    <>
      <div>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
        <a rel="noopener noreferrer" onClick={onLoginClick} href={authorizationURL()}>
          Login?
        </a>
        <button onClick={pog}>test auth</button>
      </div>
    </>
  );
};
