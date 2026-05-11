import {ResourcesContext} from "./ResourcesContextObject.jsx";
import {resources} from "../data/resources.js";

export function ResourcesProvider({children}) {
  return (
    <ResourcesContext.Provider value={resources}>
      {children}
    </ResourcesContext.Provider>
  );
}
