import { useCallback, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../../contexts/user-context";
import { getAccessTokenFromCode } from "../../utils/oauth";

export const Callback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser } = useContext(UserContext);

  const handleAuthReturn = useCallback(
    async (code: string, state: string) => {
      const authorizationState = localStorage.getItem("authorizationState");
      if (!authorizationState) {
        console.log("No stored state :(");
        return;
      }

      if (authorizationState !== state) {
        console.log("State mismatch :(");
        return;
      }

      try {
        const token = await getAccessTokenFromCode(code);
        setUser(token);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    },
    [navigate, setUser]
  );

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    if (!code) {
      console.log("No auth code from Bungie :(");
      return;
    }
    if (!state) {
      console.log("No state from Bungie :(");
      return;
    }

    handleAuthReturn(code, state);
  }, [handleAuthReturn, searchParams]);

  return (
    <>
      <div>
        <h2>Welcome to the callback!</h2>
      </div>
    </>
  );
};
