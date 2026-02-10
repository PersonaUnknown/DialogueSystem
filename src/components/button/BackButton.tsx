import { IoCaretBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./index.css";

interface Props {
	href?: string;
}

/**
 * Returns user back to home page / target destination
 */
const BackButton = ({ href = "/" }: Props) => {
	return (
		<Link
			to={{
				pathname: href,
			}}
			className="back-button"
		>
			<IoCaretBackOutline size={20} color="black" />
			Back
		</Link>
	);
};

export default BackButton;
