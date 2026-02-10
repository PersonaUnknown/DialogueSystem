import { createContext, useContext } from "react";
import type { User } from "../types/dialogue";

export interface UserContextType {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = createContext<UserContextType>(
	{} as UserContextType,
);

export const useUser = (): UserContextType => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within UserContext.Provider");
	}
	return context;
};
