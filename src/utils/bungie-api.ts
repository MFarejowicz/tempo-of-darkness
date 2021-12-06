import {
  BungieMembershipType,
  DestinyCharacterComponent,
  DestinyComponentType,
  DestinyLinkedProfilesResponse,
  DictionaryComponentResponse,
  ServerResponse,
} from "bungie-api-ts/destiny2";
import { API_KEY, BASE_URL } from "../constants";
import { Tokens } from "./oauth-tokens";
import { formatBungieName } from "./stuff";

export interface Profile {
  displayName: string;
  membershipId: string;
  membershipType: BungieMembershipType;
  lastPlayed: Date;
  crossSaveOverride: BungieMembershipType;
  isCrossSavePrimary: boolean;
  isOverridden: boolean;
  isPublic: boolean;
}

export interface Characters {
  [key: string]: DestinyCharacterComponent;
}

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

export async function getDestinyProfile(user: Tokens | null) {
  if (!user) {
    console.log("user missing!");
    return;
  }

  const response: ServerResponse<DestinyLinkedProfilesResponse> = await bungieGet(
    // @ts-ignore
    `/Destiny2/${BungieMembershipType.BungieNext}/Profile/${user.bungieMembershipId}/LinkedProfiles/`,
    user
  );

  // error check here maybe

  const profilesResponse = response.Response;
  const profiles: Profile[] = profilesResponse.profiles.map((account) => ({
    displayName: formatBungieName(account),
    membershipId: account.membershipId,
    membershipType: account.membershipType,
    lastPlayed: new Date(account.dateLastPlayed),
    crossSaveOverride: account.crossSaveOverride,
    isCrossSavePrimary: account.isCrossSavePrimary,
    isOverridden: account.isOverridden,
    isPublic: account.isPublic,
  }));

  if (profiles.length === 0) {
    console.log("issue");
    return;
  }

  const sortedProfiles = profiles.sort((a, b) => b.lastPlayed.getTime() - a.lastPlayed.getTime());

  return sortedProfiles[0];
}

interface DestinyCharactersResponse {
  readonly characters: DictionaryComponentResponse<DestinyCharacterComponent>;
}

export async function getDestinyCharacters(user: Tokens | null, profile: Profile | null) {
  if (!user || !profile) {
    return;
  }

  const response: ServerResponse<DestinyCharactersResponse> = await bungieGet(
    `/Destiny2/${profile.membershipType}/Profile/${profile.membershipId}/`,
    user,
    {
      // @ts-ignore
      components: [DestinyComponentType.Characters],
    }
  );

  const charactersResponse = response.Response;
  return charactersResponse.characters.data;
}
