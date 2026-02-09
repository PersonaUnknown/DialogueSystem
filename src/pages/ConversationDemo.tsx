import BackButton from "../components/button/BackButton";
import ConversationController from "../components/dialogue/ConversationController";
import type { Conversation } from "../types/dialogue";

interface Props {
	data: Conversation;
}

/**
 * Demos the ConversationController under different conversation data
 */
const ConversationDemo = ({ data }: Props) => {
	return (
		<div>
			<BackButton />
			<ConversationController conversation={data} />
		</div>
	);
};

export default ConversationDemo;
