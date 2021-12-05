import { DestinyProfileUserInfoCard } from "bungie-api-ts/destiny2";
import { UserInfoCard } from "bungie-api-ts/user";

export function formatBungieName(destinyAccount: DestinyProfileUserInfoCard | UserInfoCard) {
  return (
    destinyAccount.bungieGlobalDisplayName +
    (destinyAccount.bungieGlobalDisplayNameCode
      ? `#${destinyAccount.bungieGlobalDisplayNameCode.toString().padStart(4, "0")}`
      : "")
  );
}
