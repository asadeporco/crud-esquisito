const { response } = require('express');
var client = require('../redis/redis-client.js');

function createTodo({ id, title, description, done }) {
    (async () => {
        await client.hSet(id, { 'id': id, 'title': title, 'description': description, 'done': done ? 'true' : 'false' });
    })()
}

function deleteTodo(id) {
    (async () => {
        await client.del(id);
    })()
}

function getTodoById(id) {
    return new Promise(resolve => {
        resolve(client.hGetAll(id))
    })
}
async function getAllTodos() {

    const keys = []

    for await (const key of client.scanIterator()) {
        const todo = await client.hGetAll(key)
        keys.push(todo)
    }
    return new Promise(resolve => {
        resolve(keys)
    })
}



module.exports = {
    createTodo,
    deleteTodo,
    getTodoById,
    getAllTodos,
}