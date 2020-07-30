const fs = require("fs");
const chalk = require('chalk');

const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicatedNote = notes.find((note) => note.title === title);

  if(!duplicatedNote){
    notes.push({
        title : title,
        body : body
    });
    saveNotes(notes);
    console.log("New Notes Added");
  }else {
      console.log("Note title already taken..");
  }
  
};

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);

      if(notes.length > notesToKeep.length){
          console.log(chalk.green.inverse('Notes Removed'));
          saveNotes(notesToKeep);
      }else{
        console.log(chalk.red.inverse('Notes not found'));
      }
    
};

const listNotes = () =>{
    const notes = loadNotes();
    console.log(chalk.inverse('Your Notes'));

    notes.forEach((note) => {
        console.log(note.title);
    });
};

const readNotes = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);

    if(note){
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    }else{
        console.log(chalk.red.inverse('Note not found'));
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
};

const loadNotes =  () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};
module.exports = {
  addNotes: addNotes,
  removeNote : removeNote,
  listNotes : listNotes,
  readNotes : readNotes
};
