import { API_KEY, BASE_URL } from "../constants";
import { Tokens } from "./oauth-tokens";

export async function bungieGet(path: string, user: Tokens | null, params?: Record<string, any>) {
  if (!user) {
    console.log("user missing!");
    return;
  }

  const searchParams = new URLSearchParams(params);
  const url = `${BASE_URL}${path}?${searchParams}`;
  return fetch(url, {
    method: "GET",
    headers: {
      "X-API-Key": API_KEY,
      Authorization: "Bearer " + user.accessToken.value,
    },
  }).then((response) => (response.ok ? response.json() : Promise.reject(response)));
}
