import { createActions, createReducer } from "reduxsauce";

// Create actions
const prefix = "deals";

export const { Types, Creators } = createActions(
  {
    fetch: ["params"],
    fetchSuccess: ["payload"],
  },
  {
    prefix: prefix
  }
);

const INITIAL_STATE = {
  list: [],
};

// Change state
const fetchSuccess = (state = INITIAL_STATE, { payload }) => {
  return { ...state, list: payload };
};

export const Reducers = createReducer(INITIAL_STATE, {
  [Types.FETCH_SUCCESS]: fetchSuccess,
});

// Selectors
export const Selectors = {
  getList: ({ deals }) => deals.list
};
