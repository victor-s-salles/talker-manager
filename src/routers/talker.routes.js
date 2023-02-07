const express = require('express');

const router = express.Router();

const { readTalker, readTalkerWithID, changeTalker, 
        insertTalker, deleteTalker } = require('../utils/readAndWriteFiles');

const tokenValidate = require('../middlewares/tokenValidate');

const { nameValidate, ageValidate, 
        watchedAtValidate, rateValidade } = require('../middlewares/registrationValidate');

router.get('/search', tokenValidate, async (req, res) => {
    const { q } = req.query;
    const data = await readTalker();
    const filtredData = data.filter((e) => e.name.toLowerCase().includes(q.toLowerCase()));
      res.status(200).json(filtredData);
  });

router.get('/', async (_req, res) => {
    const data = await readTalker();
  
    if (!data) {
      return res.status(200).json([]);
    }
    return res.status(200).json(data);
  });
  
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const person = await readTalkerWithID(id);
  
    if (!person) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(person);
  });
  
router.post('/', tokenValidate, nameValidate, 
  ageValidate, watchedAtValidate, rateValidade, async (req, res) => {
   const newData = await insertTalker(req.body);
  
    res.status(201).json(newData);
  });
  
router.put('/:id', tokenValidate, nameValidate, 
  ageValidate, watchedAtValidate, rateValidade, async (req, res) => {
    const { id } = req.params;
    const newData = await changeTalker(req.body, id);
    res.status(200).json(newData);
  });
  
router.delete('/:id', tokenValidate, async (req, res) => {
    const { id } = req.params;
    await deleteTalker(id);
    res.sendStatus(204);
  });

  module.exports = router;