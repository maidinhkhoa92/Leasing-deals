import { createActions, createReducer } from "reduxsauce";

// Create actions
const prefix = "deals";

export const { Types, Creators } = createActions(
  {
    fetch: ["params"],
    fetchSuccess: ["payload"],

    search: ["params"]
  },
  {
    prefix: prefix
  }
);

const INITIAL_STATE = {
  list: [],
  filter: {
    engine_type: [],
    transmission: [],
    monthly_rental: {
      from: null,
      to: null
    }
  }
};

// Change state
const fetchSuccess = (state = INITIAL_STATE, { payload }) => {
  return { ...state, list: payload };
};

const search = (state = INITIAL_STATE, { params }) => {
  return { ...state, filter: params };
};

export const Reducers = createReducer(INITIAL_STATE, {
  [Types.FETCH_SUCCESS]: fetchSuccess,

  [Types.SEARCH]: search
});

// Selectors
export const Selectors = {
  getList: ({ deals }) => deals.list
};
