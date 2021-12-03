import { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAccessTokenFromCode } from "../../utils/oauth";
import { setToken } from "../../utils/oauth-tokens";

export const Callback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleAuthReturn = useCallback(
    async (code: string) => {
      try {
        const token = await getAccessTokenFromCode(code);
        console.log(token);
        setToken(token);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    },
    [navigate]
  );

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      console.log("issue");
      return;
    }

    handleAuthReturn(code);
  }, [handleAuthReturn, searchParams]);

  return (
    <>
      <div>
        <h2>Welcome to the callback!</h2>
      </div>
    </>
  );
};
