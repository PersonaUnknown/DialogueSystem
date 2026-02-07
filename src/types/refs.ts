import type { SpeakerState } from "./dialogue";

export interface CharacterPortraitRef {
	updatePortrait: (state: SpeakerState) => void;
}

export interface DialogueBoxRef {
	updateDialogueIndex: (index: number) => void;
	finishAnimation: () => void;
}
