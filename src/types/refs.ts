import type { Conversation, SpeakerState } from "./dialogue";

export interface CharacterPortraitRef {
	updatePortrait: (state: SpeakerState) => void;
}

export interface DialogueBoxRef {
	updateDialogueIndex: (index: number) => void;
}

export interface TypewriterRef {
	typeAnim: () => void;
	isAnimationFinished: () => boolean;
	finishAnimation: () => void;
	hideText: () => void;
}

export interface MultipleChoiceOverlayRef {
	showOverlay: () => void;
	hideOverlay: () => void;
	updateChoices: (options: Map<string, number>) => void;
}

export interface ConversationControllerRef {
	updateConversationData: (data: Conversation) => void;
}
