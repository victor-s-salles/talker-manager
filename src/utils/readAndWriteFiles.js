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
const writeTalker = async (data) => {
    try {
        await fs.writeFile('src/talker.json', JSON.stringify(data));
        return data;
    } catch (error) {
        return error;
    }
};

const insertTalker = async (data) => {
    try {
    const oldData = await readTalker();
    const lastedID = oldData[oldData.length - 1].id;
    const newData = data;
   
    newData.id = (lastedID + 1);
    oldData.push(newData);

    await writeTalker(oldData);
    return newData;
    } catch (error) {
        return null;
    }
};

const changeTalker = async (data, id) => {
    const newData = data;
    const oldData = await readTalker();

    const arrayOfIds = oldData.map((e) => e.id);
    const indexToEdit = arrayOfIds.indexOf(Number(id)); 
    newData.id = Number(id);
    oldData[indexToEdit] = newData;

    await writeTalker(oldData);
    return newData;
};

const deleteTalker = async (id) => {
    const oldData = await readTalker();
    const arrayOfIds = oldData.map((e) => e.id);
    const indexToRemove = arrayOfIds.indexOf(Number(id)); 
    oldData.splice(indexToRemove, 1);
    await writeTalker(oldData);
};

module.exports = {
    readTalker,
    readTalkerWithID,
    writeTalker,
    changeTalker,
    insertTalker,
    deleteTalker,
};