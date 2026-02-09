import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import {
	EXAMPLE_CONVERSATION,
	EXAMPLE_CONVERSATION_DYNAMIC,
	EXAMPLE_CONVERSATION_MULTI,
	EXAMPLE_CONVERSATION_ROUNDABOUT,
} from "./data/dialogue";
import ConversationDemo from "./pages/ConversationDemo";
import HomePage from "./pages/HomePage";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/multi"
					element={<ConversationDemo data={EXAMPLE_CONVERSATION_MULTI} />}
				/>
				<Route
					path="/dynamic"
					element={<ConversationDemo data={EXAMPLE_CONVERSATION_DYNAMIC} />}
				/>
				<Route
					path="/roundabout"
					element={<ConversationDemo data={EXAMPLE_CONVERSATION_ROUNDABOUT} />}
				/>
				<Route
					path="/default"
					element={<ConversationDemo data={EXAMPLE_CONVERSATION} />}
				/>
			</Routes>
		</Router>
	);
};

export default App;
