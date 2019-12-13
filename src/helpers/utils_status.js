const isActive = status => {
  if (status === "COMPLETED") return false;
  return true;
};

const isFinal = status => {
  if (status === "COMPLETED" || status === 2) return true;
  return false;
};

export { isFinal, isActive };
