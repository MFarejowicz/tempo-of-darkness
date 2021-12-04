import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { getToken, hasTokenExpired, removeToken, setToken, Tokens } from "../../utils/oauth-tokens";

interface UserContextValue {
  user: Tokens | null;
  setUser: (t: Tokens | null) => void;
}

const defaultUserContextValue = {
  user: null,
  setUser: () => null,
};

export const UserContext = createContext<UserContextValue>(defaultUserContextValue);

export const UserContextManager: React.FC = ({ children }) => {
  const [user, setUserBase] = useState<Tokens | null>(null);

  const setUser = useCallback((t: Tokens | null) => {
    if (t === null) {
      removeToken();
    } else {
      setToken(t);
    }

    setUserBase(t);
  }, []);

  // useEffect to "auto log in" if user refreshed page
  // but a token exists in local storage
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    if (hasTokenExpired(token.accessToken)) {
      return;
    }

    setUserBase(token);
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [setUser, user]
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
