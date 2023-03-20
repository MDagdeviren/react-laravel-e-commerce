const token = JSON.parse(localStorage.getItem("token"));

export const useAuth = () => {
  return token && token.user && token.access_token;
};

export const useAdmin = () => {
  return (
    token && token.user && token.access_token && token.user.user_level === 0
  );
};

export const useOwner = () => {
  return (
    token &&
    token.user &&
    token.access_token &&
    (token.user.user_level === 1 || token.user.user_level === 2)
  );
};
