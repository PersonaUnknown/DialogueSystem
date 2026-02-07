import "./App.css";
import ConversationController from "./components/dialogue/ConversationController";
import { EXAMPLE_CONVERSATION } from "./data/dialogue";

function App() {
	return <ConversationController conversation={EXAMPLE_CONVERSATION} />;
}

export default App;
