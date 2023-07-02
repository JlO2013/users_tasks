const express = require('express')
const usersBL = require('../models/usersBL')

const router = express.Router()

router.get('/', async function(req, res)
{
    let users = await usersBL.getUsers()
    return res.json(users)
})

router.get('/:id', async(req, res) =>
{
    let user = await usersBL.getUser(req.params.id)
    return res.json(user)
})

router.post('/', async(req, resp) => {
    let obj = req.body
    let data = await usersBL.addUser(obj)
    return resp.json(data)
})

router.put('/:id', async(req, resp) => {
    let id = req.params.id
    let obj = req.body
    let status = await usersBL.updateUser(id, obj)
    return resp.json(status)
})
router.patch('/tasks/:id', async(req, resp) => {
    let _id = req.params.id;
    let task = req.body;
    let status = await usersBL.addTask(_id, task)
    return resp.json(status)
})

router.patch('/posts/:id', async(req, resp) => {
    let _id = req.params.id;
    let post = req.body;
    let status = await usersBL.addPost(_id, post)
    return resp.json(status)
})

router.put('/:id/tasks/:taskid', async(req, resp) => {
    let userid = req.params.id;
    let tasid = req.params.taskid
    let obj = req.body;
    let status = await usersBL.updateTask(userid, tasid, obj)
    return resp.json(status)
})

router.delete('/:id', async(req, resp) => {
    let id = req.params.id
    let status = await usersBL.deleteUser(id)
    return resp.json(status)
})

module.exports = router