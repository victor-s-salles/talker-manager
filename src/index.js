const express = require('express');

const { readTalker } = require('./utils/readAndWriteFiles');

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

  if (data) {
    return res.status(200).json(data);
  }
  return res.status(200).json([]);
});

app.listen(PORT, () => {
  console.log('Online!');
});
