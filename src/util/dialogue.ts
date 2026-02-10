import type {
	BranchType,
	ConversationEvent,
	User,
	UserBranchCheck,
} from "../types/dialogue";

/**
 * Check's if the conversation should proceed as usual or branch elsewhere
 * @param branch the type of branch condition
 * @param user user data that can be read for branch checks
 * @param field contains what field to compare, the value to compare with, and the index in the conversation to go if condition is met
 * @returns either -1 to proceed conversation as usual else the index to branch to next
 */
export const getBranchIndex = (
	branch: BranchType,
	user: User,
	value: UserBranchCheck,
): number => {
	const { branchTo, compare, field } = value;
	const currField = user[field];
	if (typeof currField !== typeof compare) {
		console.error(`Type mismatch between ${field} and ${compare}`);
		return -1;
	}
	const typedCompare = compare as typeof currField;
	let shouldBranch: boolean = false;
	switch (branch) {
		case "branch_equal":
			shouldBranch = currField === typedCompare;
			break;
		case "branch_greater":
			shouldBranch = currField > typedCompare;
			break;
		case "branch_greater_equal":
			shouldBranch = currField >= typedCompare;
			break;
		case "branch_less":
			shouldBranch = currField < typedCompare;
			break;
		case "branch_less_equal":
			shouldBranch = currField <= typedCompare;
			break;
		default:
			shouldBranch = currField !== typedCompare;
			break;
	}
	return shouldBranch ? branchTo : -1;
};

/**
 * Parses through dialogue and attempts to replace any instance
 * of a word within brackets with the appropriate User value (if applicable)
 * @param dialogue the line of text to parse
 * @param user acts as a dictionary snapshot of values to replace with
 * @returns parsed dialogue
 */
export const parseDynamicDialogue = (dialogue: string, user: User): string => {
	const userFieldMap = new Map(Object.entries(user));
	const parsedDialogue = dialogue.replace(/\{(\w+)\}/g, (match, fieldName) => {
		return userFieldMap.get(fieldName) ?? match;
	});
	return parsedDialogue;
};
