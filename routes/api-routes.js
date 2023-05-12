const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

router.get('/notes', async (req, res) => {
    const dbJSON = await JSON.parse(fs.readFilesSync('db/db.json', 'utf8'));
    res.json(dbJSON);
});

router.post('/notes', (req, res) => {
    const dbJSON = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    const newFeed = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    console.log("New Note: ", newFeed);

    dbJSON.push(newFeed);
    fs.writeFileSync('db/db.json', JSON.stringify(dbJSON));
    res.json(dbJSON);
});

// deletes the delete request
router.delete('/notes/:id', (req, res) => {
    let data = fs.readFileSync('db/db.json', 'utf8');
    const dataJSON = JSON.parse(data);
    const newBtn = dataJSON.filter((note) => {
        return note.id !== req.params.id;
    });
    fs.writeFileSync('db/db.json', JSON.stringify(newBtn));
    res.json("Notes deleted.");
});

module.exports = router;