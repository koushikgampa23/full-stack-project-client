import { createContext } from "react";
import {AuthContextType} from "../pages/types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
