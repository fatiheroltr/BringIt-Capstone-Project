import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState();

  const setUser = async (user) => {
    setCurrentUser(user);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    const response = await fetch(`/api/create-user`, requestOptions);
    const result = await response.json();

    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        setUser,
        error,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
