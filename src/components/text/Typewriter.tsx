import { Fragment } from "react";
import "./index.css";

interface Props {
	text: string;
}

/**
 * Typewriter component that renders text being typed out.
 * Characters are fully typed out and invisible to prevent autowrap
 * snapping characters to different lines.
 */
const Typewriter = ({ text }: Props) => {
	const words = text.split(" ");
	return (
		<div className="dialogue-text">
			{text}
			{/* {words.map((word, index) => {
                const key = `word-${index}`;
                if (index !== words.length - 1) {
                    return (
                        <Fragment key={key}>
                            {word.split("").map((char, index) => {
                                const charKey = `front-char-${index}`;
                                return (
                                    <span key={charKey}>
                                        {char}
                                    </span>
                                );
                            })}
                            <span>
                                &nbsp;
                            </span>
                        </Fragment>
                    );
                }
                return (
                    word.split("").map((char, index) => {
                        const charKey = `front-char-${index}`;
                        return (
                            <span key={charKey}>
                                {char}
                            </span>
                        )
                    })
                );
            })} */}
		</div>
	);
};

export default Typewriter;
