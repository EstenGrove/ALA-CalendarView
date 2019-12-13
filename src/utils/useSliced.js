import { useState, useEffect } from "react";

export const useSliced = (value, maxLength) => {
  const [sliced, setSliced] = useState(null);

  const cut = value.slice(0, maxLength) + "...";

  useEffect(() => {
    setSliced(cut);
  }, [value, cut]);

  return sliced;
};
