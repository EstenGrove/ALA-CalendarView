import React, { useReducer, createContext } from "react";

export const initialState = {
  app: {
    isLoading: false,
    hasLoaded: false,
    isError: false,
    wasUpdated: false
  },
  residents: [],
  user: {
    firstName: null,
    lastName: null,
    userID: null,
    username: null,
    password: null,
    facilityID: null,
    isAdmin: false,
    currentFacility: {
      facilityID: null,
      facilityName: null
    },
    title: null,
    facilityAccess: [],
    MedTechRestrictedAccess: false
  },
  globals: {
    currentResident: {
      firstName: null,
      lastName: null,
      age: null,
      residentID: null,
      unit: null,
      height: null,
      weight: null,
      MDReportDue: null,
      ServicePlanDue: null,
      MonthlyMedReview: null,
      BathNotes: null,
      EscortNotes: null,
      DressNotes: null,
      GroomingNotes: null,
      HygieneNotes: null,
      MealNotes: null,
      MedNOtes: null,
      MentalNotes: null,
      residentPhoto: null
    },
    tasks: [],
    parsedTasks: {
      Ambulation: {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
      },
      Grooming: {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
      },
      Bathing: {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
      },
      Dressing: {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
      },
      Toileting: {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
      },
      StatusChecks: {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
      },
      SpecialCare: {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
      },
      Psychosocial: {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
      },
      MedAssist: {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
      },
      Meals: {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
      },
      Laundry: {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
      },
      Transfers: {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
      }
    },
    trackingTasks: [],
    adls: [],
    profile: {},
    charting: [],
    categories: [],
    activeTask: {}
  }
};

export const GlobalStateContext = createContext(initialState);

export const globalStateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING_STATE": {
      const newState = { ...state };

      return {
        ...newState,
        app: {
          hasLoaded: false,
          isLoading: true,
          isError: false,
          wasUpdated: false
        }
      };
    }
    case "SUCCESS_STATE": {
      const newState = { ...state };
      return {
        ...newState,
        app: {
          hasLoaded: true,
          isLoading: false,
          isError: false
        }
      };
    }
    case "ERROR_STATE": {
      const newState = { ...state };

      return {
        ...newState,
        app: {
          hasLoaded: false,
          isLoading: false,
          isError: true,
          wasUpdated: false
        }
      };
    }
    case "RESET_STATE": {
      const newInitialState = { ...initialState };
      return {
        ...newInitialState,

        app: {
          hasLoaded: false,
          isLoading: false,
          isError: false,
          wasUpdated: true
        }
      };
    }
    // when some global state is changed and should be reflected in the app
    case "REFRESH_STATE": {
      const newState = { ...state };

      return {
        ...newState,
        app: {
          isLoading: false,
          hasLoaded: true,
          isError: false,
          wasUpdated: false
        }
      };
    }
    case "SYNC_RESIDENTS_AND_USER": {
      const { newState } = action.data;
      return { ...newState };
    }
    case "LOAD_RESIDENT_DATA": {
      const { newState } = action.data; // provided by SearchSection dispatch
      return {
        ...newState,
        app: {
          hasLoaded: true,
          isLoading: false,
          isError: false,
          wasUpdated: false
        }
      };
    }
    case "CHANGE_RESIDENT": {
      const newState = { ...state };
      const { residents, user } = state;
      const { currentResident } = action.data;
      //@comment - clear resident data here
      return {
        ...newState,
        residents: [...residents],
        user: { ...user },
        globals: {
          ...newState.globals,
          currentResident: currentResident
        },
        app: {
          hasLoaded: false,
          isLoading: false,
          isError: false,
          wasUpdated: false
        }
      };
    }
    case "UPDATE_TASK": {
      const { newState } = action.data;

      return {
        ...newState,
        app: {
          hasLoaded: true,
          isLoading: false,
          isError: false,
          wasUpdated: true
        }
      };
    }
    case "UPDATE_RESOURCES": {
      const { data } = action;
      console.log("ACTION: DATA", data);

      const newState = { ...state };

      return { ...newState };
    }
    case "DELETE_RESOURCES": {
      return;
    }

    case "LOGOUT_STATE": {
      const newInitialState = { ...initialState };

      return { ...newInitialState };
    }
    default:
      return console.error("Warning: Invalid Action Provided", action);
  }
};

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
