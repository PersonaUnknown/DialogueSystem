import { useState } from "react";
import BackButton from "../components/button/BackButton";
import ConversationController from "../components/dialogue/ConversationController";
import { UserContext } from "../contexts/UserContext";
import type { Conversation, User } from "../types/dialogue";

interface Props {
	data: Conversation;
}

/**
 * Demos the ConversationController under different conversation data
 */
const ConversationDemo = ({ data }: Props) => {
	const [user, setUser] = useState<User>({
		username: "Bob",
	});
	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
			}}
		>
			<BackButton />
			<ConversationController conversation={data} />
		</UserContext.Provider>
	);
};

export default ConversationDemo;
