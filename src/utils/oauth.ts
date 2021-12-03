import { Token, Tokens } from "./oauth-tokens";

export const CLIENT_ID = "38587";
export const API_KEY = "21eef78849844426a9855a108fc1ba3a";
export const BASE_URL = "https://www.bungie.net/Platform";
const TOKEN_URL = `${BASE_URL}/App/OAuth/Token/`;

export function getAccessTokenFromCode(code: string): Promise<Tokens> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: CLIENT_ID,
  });
  return Promise.resolve(
    fetch(TOKEN_URL, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then(handleAccessToken)
  );
}

interface OAuthResponse {
  access_token: string;
  expires_in: number;
  membership_id: string;
  refresh_token?: string;
  refresh_expires_in: number;
}

function handleAccessToken(response: OAuthResponse | undefined): Tokens {
  console.log(response);
  if (response?.access_token) {
    const data = response;
    const inception = Date.now();
    const accessToken: Token = {
      value: data.access_token,
      expires: data.expires_in,
      name: "access",
      inception,
    };

    const tokens: Tokens = {
      accessToken,
      bungieMembershipId: data.membership_id,
    };

    if (data.refresh_token) {
      tokens.refreshToken = {
        value: data.refresh_token,
        expires: data.refresh_expires_in,
        name: "refresh",
        inception,
      };
    }

    return tokens;
  } else {
    throw new Error("No data or access token in response: " + JSON.stringify(response));
  }
}
