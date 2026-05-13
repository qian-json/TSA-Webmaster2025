import {createContext} from "react";
import {resources} from "../data/resources.js";

// eslint-disable-next-line react-refresh/only-export-components
export const ResourcesContext = createContext([]);

export function ResourcesProvider({children}) {
  return (
    <ResourcesContext.Provider value={resources}>
      {children}
    </ResourcesContext.Provider>
  );
}
