import { useContext, useEffect, useState } from "react";
import { Login } from "../../components/login";
import { ManifestContext } from "../../contexts/manifest-context";
import { UserContext } from "../../contexts/user-context";
import { Characters, getDestinyCharacters, getDestinyProfile } from "../../utils/bungie-api";

export const Home = () => {
  const { manifest } = useContext(ManifestContext);
  const { user, setUser, setProfile } = useContext(UserContext);
  const [characters, setCharacters] = useState<Characters>();

  const onLogoutClick = () => {
    setUser(null);
  };

  const onTestClick = async () => {
    const profile = await getDestinyProfile(user);
    if (profile) {
      setProfile(profile);
      const chars = await getDestinyCharacters(user, profile);
      if (chars) {
        console.log(chars);
        setCharacters(chars);
      }
    }
  };

  useEffect(() => {
    console.log(manifest);
  }, [manifest]);

  return (
    <>
      <div>
        <h2>Welcome to the homepage!</h2>
        {user ? (
          <>
            <button onClick={onTestClick}>test auth</button>
            <button onClick={onLogoutClick}>logout</button>
            {characters &&
              Object.entries(characters).map(([id, char]) => (
                <div key={`char-${id}`}>
                  <div>{char.light}</div>
                  <img src={`https://bungie.net${char.emblemBackgroundPath}`} alt="char" />
                </div>
              ))}
          </>
        ) : (
          <Login />
        )}
      </div>
    </>
  );
};
