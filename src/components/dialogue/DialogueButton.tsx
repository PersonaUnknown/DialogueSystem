interface Props {
	className?: string;
	label: string;
	onClick: () => void;
}

/**
 * Dialogue option button component
 */
const DialogueButton = ({ className = "", label, onClick }: Props) => {
	return (
		<button
			className={`${className} talk-dialogue-button`}
			onClick={onClick}
			type="button"
		>
			{label}
		</button>
	);
};

export default DialogueButton;
