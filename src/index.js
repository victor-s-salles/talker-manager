const express = require('express');

const { readTalker, readTalkerWithID, 
  changeTalker, insertTalker, deleteTalker } = require('./utils/readAndWriteFiles');

const generateToken = require('./utils/generateToken');
const validateLogin = require('./middlewares/loginValidate');
const tokenValidate = require('./middlewares/tokenValidate');
const { nameValidate, ageValidate, 
  watchedAtValidate, rateValidade } = require('./middlewares/registrationValidate');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', tokenValidate, async (req, res) => {
  const { q } = req.query;
  const data = await readTalker();
  const filtredData = data.filter((e) => e.name.toLowerCase().includes(q.toLowerCase()));
    res.status(200).json(filtredData);
});

app.get('/talker', async (req, res) => {
  const data = await readTalker();

  if (!data) {
    return res.status(200).json([]);
  }
  return res.status(200).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const person = await readTalkerWithID(id);

  if (!person) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(person);
});

app.post('/talker', tokenValidate, nameValidate, 
ageValidate, watchedAtValidate, rateValidade, async (req, res) => {
 const newData = await insertTalker(req.body);

  res.status(201).json(newData);
});

app.put('/talker/:id', tokenValidate, nameValidate, 
ageValidate, watchedAtValidate, rateValidade, async (req, res) => {
  const { id } = req.params;
  const newData = await changeTalker(req.body, id);
  res.status(200).json(newData);
});

app.delete('/talker/:id', tokenValidate, async (req, res) => {
  const { id } = req.params;
  await deleteTalker(id);
  res.sendStatus(204);
});

app.post('/login', validateLogin, (req, res) => {
  res.status(200).json({ token: generateToken() });
});

app.listen(PORT, () => {
  console.log('Online!');
});
