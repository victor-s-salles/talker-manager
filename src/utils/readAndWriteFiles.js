const fs = require('fs/promises');

const readTalker = async () => {
    try {
    const data = await fs.readFile('src/talker.json', 'utf-8');
    const dataJSON = JSON.parse(data);

    return dataJSON;
    } catch (error) {
        return null;
    }
};

const readTalkerWithID = async (ID) => {
    try {
        const allData = await readTalker();
        const person = allData.find((e) => e.id === Number(ID));
        return person;
        } catch (error) {
            return null;
        }
};

module.exports = {
    readTalker,
    readTalkerWithID,
};