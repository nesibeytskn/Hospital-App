import { combineReducer, creaateStore } from "redux";

import hastalarReducer from "./reducers/hastalarReducer";
import randevularReducer from "./reducers/randevularReducer";
import islemlerReducer from "./reducers/islemlerReducer";

const rootReducer = combineReducer({
  hastalarState: hastalarReducer,
  randevularState: randevularReducer,
  islemlerState: islemlerReducer,
});

const store = creaateStore(rootReducer);

export default store;
