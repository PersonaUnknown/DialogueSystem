import type { Conversation, Speaker, SpeakerState } from "../types/dialogue";

export const KIRUMI_TOJO_PORTRAITS: Map<SpeakerState, string> = new Map([
	["idle", "/src/assets/portraits/tojo/idle.png"],
	["smile", "/src/assets/portraits/tojo/smile.png"],
	["embarassed", "/src/assets/portraits/tojo/embarassed.png"],
	["point", "/src/assets/portraits/tojo/point.png"],
	["shy", "/src/assets/portraits/tojo/shy.png"],
	["thinking", "/src/assets/portraits/tojo/thinking.png"],
	["stern", "/src/assets/portraits/tojo/stern.png"],
]);

export const KIRUMI_TOJO_CHAR: Speaker = {
	portraits: KIRUMI_TOJO_PORTRAITS,
	displayName: "Kirumi Tojo",
};

/**
 * Basic conversation with singular and multiple lines of dialogue per Event
 */
export const EXAMPLE_CONVERSATION: Conversation = {
	speakerData: KIRUMI_TOJO_CHAR,
	events: [
		{
			speakerState: "idle",
			dialogue: ["Hello world"],
			callback: null,
		},
		{
			speakerState: "smile",
			dialogue: ["This is me smiling", ":) :) :) :) :) :)"],
			callback: null,
		},
	],
	questions: [],
};

/**
 * Conversation that tests out callback functions
 */
export const EXAMPLE_CONVERSATION_ROUNDABOUT: Conversation = {
	speakerData: KIRUMI_TOJO_CHAR,
	events: [
		{
			speakerState: "idle",
			dialogue: ["I am talking to you right now."],
			callback: null,
		},
		{
			speakerState: "embarassed",
			dialogue: ["I'm gonna keep talking...", "Blah blah blah blah blah..."],
			callback: ["jump_to", 3],
		},
		{
			speakerState: "stern",
			dialogue: ["I'm done talking to you!", "Good-bye. Peace out!!!"],
			callback: ["end_conversation", null],
		},
		{
			speakerState: "shy",
			dialogue: ['This conversation is gonna "jump" to a different point.'],
			callback: ["jump_to", 2],
		},
	],
	questions: [],
};

/**
 * Random multiple choice question to be used in example conversation below.
 * Questions are formatted as: [key, value] where key = response and value = index to jump to
 */
const exampleQuestion: Map<string, number> = new Map([
	["Is this a trick question? It's 4, obviously.", 4],
	["Ummm..... Threee?", 1],
	["Let's see. Carry the 2 and the 2... Aha! The answer is 5.", 3],
]);

/**
 * Conversation that involves multiple choice question.
 */
export const EXAMPLE_CONVERSATION_MULTI: Conversation = {
	speakerData: KIRUMI_TOJO_CHAR,
	events: [
		{
			speakerState: "idle",
			dialogue: ["I'm going to ask you a simple question.", "What's 2 + 2?"],
			callback: ["multiple_choice", 0],
		},
		{
			speakerState: "stern",
			dialogue: [
				"That's the wrong answer, you fool.",
				"How could you not know what the answer is?!?!",
			],
			callback: null,
		},
		{
			speakerState: "point",
			dialogue: ["I will ask you again. What is 2 + 2?"],
			callback: ["multiple_choice", 0],
		},
		{
			speakerState: "point",
			dialogue: ["Seriously? You did all that thinking and came up with 5?"],
			callback: ["jump_to", 2],
		},
		{
			speakerState: "smile",
			dialogue: [
				"Yes, that's correct. I'm glad you understand that 2 + 2 = 4.",
				"You're sooooo smart. Yippee!!!",
			],
			callback: ["end_conversation", null],
		},
	],
	questions: [exampleQuestion],
};

/**
 * Conversation that uses custom external logic to create dialogue
 */
export const EXAMPLE_CONVERSATION_DYNAMIC: Conversation = {
	speakerData: KIRUMI_TOJO_CHAR,
	events: [
		{
			speakerState: "idle",
			dialogue: ["I'm going to ask you a simple question.", "What's 2 + 2?"],
			callback: ["multiple_choice", 0],
		},
	],
	questions: [],
};
