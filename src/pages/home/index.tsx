import { useContext, useState } from "react";
import { Login } from "../../components/login";
import { UserContext } from "../../contexts/user-context";
import { Characters, getDestinyCharacters, getDestinyProfile } from "../../utils/bungie-api";

export const Home = () => {
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
        setCharacters(chars);
      }
    }
  };

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
                  <img src={`https://bungie.net${char.emblemBackgroundPath}`} />
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
