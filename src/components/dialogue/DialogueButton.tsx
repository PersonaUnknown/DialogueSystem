interface Props {
	className: string;
	onClick: () => void;
}

/**
 * Dialogue option button component
 */
const DialogueButton = ({ className, onClick }: Props) => {
	return (
		<button
			className={`${className} talk-dialogue-button`}
			onClick={onClick}
			type="button"
		>
			Talk
		</button>
	);
};

export default DialogueButton;
