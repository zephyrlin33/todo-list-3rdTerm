const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')


router.get('/new', (req, res) => {
  return res.render('new')
})


router.post('/', (req, res) => {
  const userId = req.user._id
  const name = req.body.name
  return Todo.create({ name , userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//詳情頁面
router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Todo.findOne({ _id, userId})//findOne()必須要名稱與資料庫一模一樣，所以改為(_id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

//編輯頁面
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Todo.findOne({_id, userId})
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

//修改(put)
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const { name, isDone } = req.body
  const userId = req.user._id
  return Todo.findOne({_id, userId})
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch(error => console.log(error))
})


router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Todo.findOne({_id, userId})
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router