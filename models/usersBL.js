const users = require('./usersModel')
const task = require('./usersModel')
const post = require('./usersModel')


const getUsers = () => {
  return users.find({})
}
const getUser = (id) =>
{
    return users.findById(id)
}
const addUser = async (newUser) =>
{
    const user = new users(newUser)  
    await user.save()
    return user.id
}
const addTask = async (id, newTask) => 
{
  const userid = { _id: id };
  const ta = new task([])
  ta.tasks = newTask
  const update = { 
   $push : { tasks : ta.tasks }};
  await users.updateOne(userid, update)
  return "Task added"
}
const updateTask = async (userid, taskid, obj) => 
{
  const user = users.findOneAndUpdate(
    {"_id": userid, "tasks._id": taskid},
    {
      $set: {
        "tasks.$": obj
      }
    }
  )
  
  return user
}
const addPost = async (id, newPost) => 
{
  const userid = { _id: id };
  const po = new post([])
  po.posts = newPost
  const update = { 
   $push : { posts : po.posts }};
  await users.updateOne(userid, update)
  return "Post added "
}
const updateUser = async (id, user) => 
{
    await users.findByIdAndUpdate(id, user)
    return 'Updated succeeded'
}
const deleteUser = async (id) =>
{
  await users.findByIdAndDelete({_id:id})
  return id + " deleted"
}


module.exports = {getUsers, getUser, addUser, addTask, addPost, updateUser, updateTask, deleteUser}