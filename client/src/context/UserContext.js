import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [isUserDeliverer, setIsUserDeliverer] = useState(false);
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
    const deliveryResponse = await fetch(`/api/check-deliverers/${user.email}`);
    const deliveryResult = await deliveryResponse.json();

    if (!result.success) {
      setError(result.message);
    }

    if (deliveryResult.success) {
      setIsUserDeliverer(true);
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
        isUserDeliverer,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
