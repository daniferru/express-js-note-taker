const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFile, writeFile } = require('fs/promises');

router.get('/notes', async (req, res) => {
    try {
    // const dbJSON = await JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    const rawNotes = await readFile("db/db.json", "utf8");
    const notesArray = [].concat(JSON.parse(rawNotes));
    res.json(notesArray)
    } catch (err) {
        res.status(500).json(err);
    }
    // res.json(dbJSON);
});

router.post('/notes', async (req, res) => {
    // const dbJSON = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    const rawNotes = await readFile("db/db.json", "utf8");
    const notesArray = [].concat(JSON.parse(rawNotes));
    const newFeed = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    console.log("New Note: ", newFeed);
    const newNoteArray = [...notesArray, newFeed]
    // dbJSON.push(newFeed);
    writeFile('db/db.json', JSON.stringify(newNoteArray))
    .then(() => res.json({ msg:"ok" }));
    // res.json(dbJSON);
});

// deletes the delete request
router.delete('/notes/:id', async (req, res) => {
    let data = await readFile('db/db.json', 'utf8');
    // const dataJSON = JSON.parse(data);
    const notesArray = [].concat(JSON.parse(data));
    const filteredArray = notesArray.filter((note) => note.id !== req.params.id)
    writeFile('db/db.json', JSON.stringify(filteredArray))
    .then(() => res.json({ msg:"Notes deleted" }));
});

module.exports = router;