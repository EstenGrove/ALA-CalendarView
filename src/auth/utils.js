const REACT_APP_ENV_AUTH = {
  development: {
    base: "http://localhost:5500/alaservices/v1/",
    user: "x-dev-user",
    password: "J99Hf2i3eY#2pqBj234tD2@H$%"
  },
  production: {
    base: "https://aladvantage.com/alaservices/v1/",
    user: "x-prod-user",
    password: "7U*hg%53^D*@bq-d@k8f2L$^fd4j"
  },
  testing: {
    base: "http://apitest.aladvantage.com/alaservices/v1/",
    user: "x-test-user",
    password: "M9hf^%2HHf3^$(sn@Kd23p#hsq"
  }
};

const endpoints = {
  auth: {
    login: "Security/Login",
    logout: "Security/Logout",
    loginStatus: "Security/LoginValid"
  },
  getData: {
    count: "Data/Count",
    get: "Data/Get",
    get2: "Data/Get2",
    delete: "Data/Delete",
    execute: "Data/Execute",
    insert: "Data/Insert",
    save: "Data/Save",
    update: "Data/Update"
  },
  downloads: {
    getFile: "Download/GetFile",
    getFileMany: "Download/GetFileMany",
    getFileRegistry: {
      byUser: "Download/GetFileRegistryByUser",
      byResident: "Download/GetFileRegistryByResident",
      byFacility: "Download/GetFileRegistryByFacility",
      byMeta: "Download/GetFileRegistryByMeta"
    }
  },
  uploads: {
    upload: "Upload/PutFile",
    uploadMany: "Upload/PutFileMany",
    saveFileRegistry: "Upload/SaveFileRegistry",
    saveFileRegistryMany: "Upload/SaveFileRegistryMany"
  },
  residents: {
    getResidents: "Advantage/GetResidents",
    getProfile: "Resident/GetResidentProfile",
    byUser: "Resident/GetResidentsByUser", // <== array of residents
    assessment: "Resident/GetResidentAssessment",
    summary: "Advantage/GetSummary",
    forTracker: "Resident/GetResidentForAdvantageTracker"
  }
};

const { testing: test } = REACT_APP_ENV_AUTH;
const { auth, residents } = endpoints;

export const login = async (username, password, appID, callback = null) => {
  let url = test.base + auth.login;
  url += "?loginId=" + username;
  url += "&loginPwd=" + password;
  url += "&loginApp=" + appID;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();

    return data;
  } catch (err) {
    console.log("An error has occurred" + err.message);
    return err;
  }
};

export const logout = async token => {
  let url = test.base + auth.logout;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(test.user + ":" + test.password),
        SecurityToken: token,
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    console.log(data);

    return data;
  } catch (err) {
    console.log("An error has occurred" + err.message);
    return err;
  }
};
export { auth, residents, test };
