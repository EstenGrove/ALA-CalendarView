import { clearStorage } from "./storage_helpers";

const initialState = {
  residents: [],
  user: {
    firstName: null,
    lastName: null,
    userID: null,
    username: null,
    password: null,
    facilityID: null,
    isAdmin: false
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
      MentalNotes: null
    },
    tasks: {},
    activeTask: {},
    trackingTasks: [],
    adls: [],
    profile: {},
    charting: [],
    categories: []
  }
};

const clearResidentData = (oldState, initialStateObj) => {
  const { residents, user } = oldState;
  const newState = {};
  newState.residents = residents;
  newState.currentUser = user;
  newState.globals = initialStateObj.globals;
  //   set state here
};

const clearState = (callback = null) => {
  clearStorage();
};

// handles the initial fetch of data
// residents and user profile
const initialStateHydrate = (data, state) => {
  const {
    user,
    user: { ADVUSER },
    residents
  } = data;

  return {
    ...state,
    app: {
      hasLoaded: true,
      isLoading: false,
      isError: false,
      wasUpdated: false
    },
    residents: residents,
    user: {
      ...state.user,
      firstName: ADVUSER[0].strFirstName,
      lastName: ADVUSER[0].strLastName,
      username: ADVUSER[0].strEmail,
      title: ADVUSER[0].strTitle,
      userID: ADVUSER[0].guidUser,
      isAdmin: ADVUSER[0].alaAdmin,
      MedTechRestrictedAccess: ADVUSER[0].MedTechRestrictedAccess,
      currentFacility: {
        facilityID: ADVUSER[0].guidFacility,
        facilityName: null
      },
      facilityAccess: [...user.ADVUSERCOMMUNITIES]
    }
  };
};

export { initialStateHydrate, clearResidentData, clearState, initialState };
