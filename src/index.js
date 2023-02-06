const express = require('express');

const { readTalker, readTalkerWithID } = require('./utils/readAndWriteFiles');

const generateToken = require('./utils/generateToken');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
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

app.post('/login', async (req, res) => {
  // const { email, password } = req.body;

  res.status(200).json({ token: generateToken() });
});

app.listen(PORT, () => {
  console.log('Online!');
});
