const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const store = require('../db/store');

router.get('/api/notes', async (req, res) => {
    const dbJSON = await JSON.parse(fs.readFilesSync('db/db.json', 'utf8'));
    res.json(dbJSON);
});

router.post('/api/notes', (req, res) => {
    const dbJSON = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    const newFeed = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    bdJSON.push(newFeed);
    fs.writeFileSync('db/db.json', JSON.stringify(dbJSON));
    res.json(dbJSON);
});

router.delete('/notes/:id', (req, res) => {
    let data = fs.readFileSync('db/db.json', 'utf8');
    const dataJSON = JSON.parse(data);
    const newBtn = dataJSON.filter((none) => {
        return note.id !== req.params.id;
    });
    fs.writeFileSync('db/db.json', JSON.stringify(newBtn));
    res.json("Notes deleted.");
});

module.exports = router;