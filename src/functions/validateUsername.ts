const ValidateUsername = (username: string): boolean => {
  return /^[a-zA-Z0-9_\-\.]{2,32}$/.test(username);
};

export default ValidateUsername;
