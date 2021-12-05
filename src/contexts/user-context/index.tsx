import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { Profile } from "../../utils/bungie-api";
import { getToken, hasTokenExpired, removeToken, setToken, Tokens } from "../../utils/oauth-tokens";

interface UserContextValue {
  user: Tokens | null;
  setUser: (t: Tokens | null) => void;
  profile: Profile | null;
  setProfile: (p: Profile | null) => void;
}

const defaultUserContextValue = {
  user: null,
  setUser: () => null,
  profile: null,
  setProfile: () => null,
};

export const UserContext = createContext<UserContextValue>(defaultUserContextValue);

export const UserContextManager: React.FC = ({ children }) => {
  const [user, setUserBase] = useState<Tokens | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

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
      profile,
      setProfile,
    }),
    [profile, setUser, user]
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
