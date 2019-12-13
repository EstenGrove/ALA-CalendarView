import { useState } from "react";

// custom console logging
function logger(RESULT = null, msg = null, variable = null) {
  switch (RESULT) {
    case "SUCCESS":
      return console.log(`✅Success, ${msg}`);
    case "ERROR":
      return console.log(`❌Sorry, ${msg}`);
    case "CUSTOM":
      return console.log(`${msg}`, variable);
    default:
      break;
  }
}

export const useLocalStorage = () => {
  const [savedItems, setSavedItems] = useState(null);
  const [archived, setArchived] = useState(null);

  const saveToStorage = (key, item) => {
    setSavedItems(item);
    window.localStorage.setItem(key, JSON.stringify(item));
    return logger("SUCCESS", "Items were saved...", null);
  };

  const getFromStorage = key => {
    if (!key) {
      const strArchive = { ...localStorage };
      const archive = JSON.parse(Object.values(strArchive));
      setArchived(archive);
      logger("CUSTOM", "✅Archived Items: ", archive);
      return archive;
    }
    const archive = JSON.parse(window.localStorage.getItem(key));

    if (archive === null) {
      return logger("CUSTOM", "❌No items found", null);
    }

    logger("CUSTOM", "✅Archived Items: ", archive);
    setArchived(archive);
    return archive;
  };

  const updateArchive = (archiveKey, item) => {
    if (!archiveKey) {
      return logger("CUSTOM", "❌No key was provided", null);
    }
    if (window.localStorage.getItem(archiveKey) === null) {
      return logger("ERROR", "Nothing found in localStorage :(", null);
    }
    const archivedItems = JSON.parse(window.localStorage.getItem(archiveKey));
    const keys = Object.keys(item);
    const vals = Object.values(item);

    keys.map((key, index) => (archivedItems[key] = vals[index]));
    window.localStorage.setItem(archiveKey, JSON.stringify(archivedItems));

    return logger(
      "SUCCESS",
      `${JSON.stringify(item)} was added to "${archiveKey}"`
    );
  };

  const clearStorage = () => {
    window.localStorage.clear();
    return logger("CUSTOM", "✅Items Removed: there are no items...", null);
  };

  const removeFromStorage = key => {
    const inStorage = { ...localStorage };
    if (!key) {
      return logger("CUSTOM", "❌Sorry, no key provided :(", null);
    }
    if (!inStorage) {
      return logger("ERROR", "no items found in storage :(", null);
    }
    if (window.localStorage.getItem(key) === null) {
      return logger("ERROR", "no matching key found in storage.", null);
    }
    window.localStorage.removeItem(key);
    return logger("SUCCESS", `Item "${key}" was removed`, null);
  };

  return {
    savedItems,
    archived,
    saveToStorage,
    updateArchive,
    getFromStorage,
    removeFromStorage,
    clearStorage
  };
};
