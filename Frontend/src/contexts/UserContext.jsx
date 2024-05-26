import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [myUser, setMyUser] = useState(null);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated && user) {
        try {
          const accessToken = await getAccessTokenSilently();
          console.log("accessToken", accessToken);
          const response = await axios.get(
            "http://localhost:4000/api/v1/users",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const filteredUser = response.data.find(
            (userData) => userData.email === user.email
          );

          setMyUser(filteredUser);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return (
    <UserContext.Provider
      value={{
        myUser,
        setMyUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
