import "./App.css";
import ConversationController from "./components/dialogue/ConversationController";
import { EXAMPLE_CONVERSATION_ROUNDABOUT } from "./data/dialogue";

function App() {
	return (
		<ConversationController conversation={EXAMPLE_CONVERSATION_ROUNDABOUT} />
	);
}

export default App;
