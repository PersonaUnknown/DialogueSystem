import { Link } from "react-router-dom";

/**
 * Main page, compiling list of example conversations to demonstrate features
 */
const HomePage = () => {
	return (
		<div className="">
			<h1 style={{ textAlign: "center" }}> Dialogue System </h1>
			<section
				style={{
					textAlign: "center",
					display: "flex",
					flexDirection: "column",
					gap: 5,
					fontSize: 20,
				}}
			>
				<Link to="/default">Basic Linear Conversation</Link>
				<Link to="/roundabout">Basic Non-Linear Conversation</Link>
				<Link to="/multi">Back-and-forth Multiple Choice Conversation</Link>
				<Link to="/dynamic">Conversation That Checks Dynamic Values</Link>
			</section>
		</div>
	);
};

export default HomePage;
