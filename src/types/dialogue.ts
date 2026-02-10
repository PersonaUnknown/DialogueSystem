/**
 * Possible states Speaker could be in
 */
export type SpeakerState =
	| "idle"
	| "smile"
	| "embarassed"
	| "point"
	| "shy"
	| "thinking"
	| "stern";
/**
 * Possible types of branches the conversation can take
 */
export type BranchType =
	| "branch_equal"
	| "branch_not_equal"
	| "branch_greater"
	| "branch_greater_equal"
	| "branch_less"
	| "branch_less_equal";
/**
 * Possible conversation event callbacks
 */
export type EventFunc =
	| "jump_to"
	| "proceed"
	| "end_conversation"
	| "multiple_choice"
	| BranchType;
/**
 * Individual event consisting of what a character says and what to do afterwards
 */
export interface ConversationEvent {
	speakerState: SpeakerState;
	dialogue: string[];
	callback: [EventFunc, unknown] | null; // Logic that triggers once this point in the conversation has ended
}
/**
 * Speaker data of possible character portraits and character information
 */
export interface Speaker {
	portraits: Map<SpeakerState, string>; // Maps state keyword to appropriate image path
	displayName: string; // Name to display to user
}
/**
 * Stores conversation data, including the dialogue flow and Speaker the user is conversing with.
 * Only designed around talking to a single Speaker visualized through static images
 * Maps used to represent multiple choice questions that jump user to different parts in conversation
 */
export interface Conversation {
	speakerData: Speaker;
	events: ConversationEvent[];
	questions: Map<string, number>[];
}
/**
 * User Information that dynamic Dialogue can use to check
 */
export interface User {
	username: string;
}
/**
 * The fields needed to branch elsewhere in the conversation
 */
export interface UserBranchCheck {
	field: keyof User;
	compare: unknown;
	branchTo: number;
}
