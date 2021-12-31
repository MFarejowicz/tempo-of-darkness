import { useContext, useEffect, useState } from "react";
import { Login } from "../../components/login";
import { ManifestContext } from "../../contexts/manifest-context";
import { UserContext } from "../../contexts/user-context";
import { Characters, getDestinyCharacters, getDestinyProfile } from "../../utils/bungie-api";

import "./styles.css";

export const Home = () => {
  const { manifest } = useContext(ManifestContext);
  const { user, setUser, setProfile } = useContext(UserContext);
  const [characters, setCharacters] = useState<Characters>();

  const onLogoutClick = () => {
    setUser(null);
  };

  useEffect(() => {
    async function getCharacters() {
      const profile = await getDestinyProfile(user);
      if (profile) {
        setProfile(profile);
        const chars = await getDestinyCharacters(user, profile);
        if (chars) {
          console.log(chars);
          setCharacters(chars);
        }
      }
    }

    // if (user) {
    //   getCharacters();
    // }
  }, [setProfile, user]);

  useEffect(() => {
    console.log(manifest);
  }, [manifest]);

  return (
    <div className="Home">
      <div className="Home-test"></div>
      <div className="Home-container">
        <h1 className="Home-title">Tempo of Darkness</h1>
        {user ? (
          <>
            <p className="Home-text">
              Next, choose a character to use on your adventure. Your playthrough will feature items
              currently equipped on that character, as well as items from your vault:
            </p>
            {characters &&
              Object.entries(characters).map(([id, char]) => (
                <div key={`char-${id}`}>
                  <div>{char.light}</div>
                  <img src={`https://bungie.net${char.emblemBackgroundPath}`} alt="char" />
                </div>
              ))}
            <button onClick={onLogoutClick}>logout</button>
          </>
        ) : (
          <>
            <p className="Home-text">
              A Destiny themed, card-based, deck-building, roguelike adventure
            </p>
            <p className="Home-text">
              Tempo of Darkness uses your Destiny characters and vault as the foundation for cards
              you find in a playthrough. To start an adventure, first allow ToD to view your Destiny
              info:
            </p>
            <Login />
          </>
        )}
      </div>
    </div>
  );
};
