const nameValidate = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};

const ageValidate = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (typeof age !== 'number') {
        return res.status(400).json({ message: 'O campo "age" deve ser do tipo "number"' });
    }
    if (!Number.isInteger(age)) { 
        return res.status(400)
        .json({ message: 'O campo "age" deve ser um "number" do tipo inteiro' }); 
    }
    if (age <= 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' }); 
    }
    next();
};

const watchedAtValidate = (req, res, next) => {
    const { talk } = req.body;
    const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    if (!talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    const { watchedAt } = talk;
     if (!watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!regexDate.test(watchedAt)) {
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

const rateValidade = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;
    if (rate === undefined) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (!Number.isInteger(rate) || rate > 5 || rate < 1) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

module.exports = { nameValidate, ageValidate, watchedAtValidate, rateValidade };