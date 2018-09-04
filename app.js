// const os = require("os");
const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const note = require("./note.js");

const titleOptions = {
	describe: "Title of note",
	demand: true,
	alias: "t"
};
const bodyOptions = {
	describe: "Body of note",
	demand: true,
	alias: "b"
};
const argv = yargs
	.command("add", "Add a new note", {
		title: titleOptions,
		body: bodyOptions
	})
	.command("list", "List all notes")
	.command("read", "Read a note", {
		title: titleOptions
	})
	.command("remove", "Remove a note", {
		title: titleOptions
	})
	.help()
	.argv;
var command = argv._[0]; 

// console.log("Command: ", command);
// console.log("Yargs: ", argv);

if (command === "add") {
	var notes = note.addNote(argv.title, argv.body);
	if (notes) {
		console.log("Note created");
		note.logNote(notes);
	} else {
		console.log("Note title taken");
	}
} else if (command === "list") {
	var allNotes = note.getAll();
	console.log(`Printing ${allNotes.length} note(s).`);
	allNotes.forEach((notes) => note.logNote(notes));
} else if (command === "read") {
	 var notes = note.getNote(argv.title);
	 if (notes) {
	 	console.log("Note found");
	 	note.logNote(notes);
	 } else {
	 	console.log("Note not found");
	 }
} else if (command === "remove") {
	var noteRemoved = note.getRemove(argv.title);
	var message = noteRemoved ? "Note was removed" : "Note not found";
	console.log(message);
} else {
	console.log("Command not recognized");
}






/* Example */
/*
// var filteredArray = _.uniq(["Dedek", 1, "Dedek", 1, 2, 3, 4]);
// console.log(filteredArray);

// console.log(_.isString(true));
// console.log(_.isString("Dedek"));

// console.log("Result :", note.add(9, 4));

// var res = note.addNote();
// console.log(res);

// var user = os.userInfo();
// // console.log(user);

// fs.appendFile("greetings.txt", `Hello ${user.username}! You are ${note.age}.`);
*/