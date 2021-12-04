import { useContext } from "react";
import { Login } from "../../components/login";
import { UserContext } from "../../contexts/user-context";
import { bungieGet } from "../../utils/bungie-api";

export const Home = () => {
  const { user, setUser } = useContext(UserContext);

  const onLogoutClick = () => {
    setUser(null);
  };

  const onTestClick = async () => {
    const res = await bungieGet("/User/GetCurrentBungieNetUser", user);
    console.log(res);
  };

  return (
    <>
      <div>
        <h2>Welcome to the homepage!</h2>
        {user ? (
          <>
            <button onClick={onTestClick}>test auth</button>
            <button onClick={onLogoutClick}>logout</button>
          </>
        ) : (
          <Login />
        )}
      </div>
    </>
  );
};
