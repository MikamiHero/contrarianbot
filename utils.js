// Message variations for ContrarianBot to use
const MESSAGE_VARIATIONS = {
	1: (word) =>
		`How we can be sure you dislike ${word}? There's probably more facts to consider here...`,
	2: (word) =>
		`Are you absolutely certain your distaste for ${word} is substantiated? You may be missing something in your justification...`,
	3: (word) =>
		`Perhaps your hostility to ${word} is clouded by your emotions? Two sides to every story...`,
	4: (word) => `Okay, but can we really be certain you detest ${word}?`,
	5: (word) =>
		`I'm not trying to indigify you, but is it possible your aversion to ${word} is a simple misunderstanding of the situation?`,
};

// Function that constructs the message ContrarianBot will use
const constructMessage = (wordToOppose) => {
	// Determine which message to randomly use
	const messageIndex =
		Math.floor(Math.random() * Object.keys(MESSAGE_VARIATIONS).length) + 1;
	const messageFn = MESSAGE_VARIATIONS[messageIndex];

	// Now use the word ContrarianBot will oppose in the message
	return wordToOppose.includes("glitches")
		? messageFn("cheaters")
		: messageFn(wordToOppose);
};

module.exports = { constructMessage };
