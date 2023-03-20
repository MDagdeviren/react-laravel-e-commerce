export default function authHeader(type) {
  const token = JSON.parse(localStorage.getItem("token"));

  if (token && token.user) {
    return {
      Authorization: `Bearer ${token.access_token}`,
      "Content-Type": type,
    };
  } else {
    return {};
  }
}
