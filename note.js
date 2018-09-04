const fs = require("fs");

var fetchNotes = () => {
	try {
		var notesString = fs.readFileSync("note-data.json");
		return JSON.parse(notesString);
	} catch(e) {
		return [];
	}
};

var saveNotes = (notes) => {
	fs.writeFileSync("note-data.json", JSON.stringify(notes));
};

var addNote = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title,
		body
	}

	var duplicateNotes = notes.filter((note) => note.title === title);
	if (duplicateNotes.length === 0) {
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};

var getAll = () => {
	return fetchNotes();
};

var getNote = (title) => {
	var notes = fetchNotes();
	var filteredNotes = notes.filter((note) => {
		return note.title === title
	});
	return filteredNotes[0];
};

var getRemove = (title) => {
	// fetch notes
	var notes = fetchNotes();
	// filter notes, removing the one with title of argument
	var filteredNotes = notes.filter((note) => note.title !== title );
	// save new notes array
	saveNotes(filteredNotes);

	return notes.length !== filteredNotes.length;
}

var logNote = (notes) => {
	// debugger;
	// Break on this line repl to output note
	// Use read command with --title
	console.log("-----");
	console.log(`Title: ${notes.title}`);
	console.log(`Body: ${notes.body}`);
}

module.exports = {
	addNote: addNote,
	getAll,
	getNote,
	getRemove,
	logNote
	/* or use ES6
	// addNote
	*/
}

/* Example */
/*
// module.exports.addNote = () => {
// 	console.log("addNote");
// 	return "New note";
// };

// module.exports.add = (a, b) => {
// 	return a + b;
// };
*/