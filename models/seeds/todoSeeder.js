const Todo = require('../todo')
const db = require ('../../config/mongoose')//一併執行檔案

db.once('open', () => {
  //console.log('mongodb connected!')

  for (let i = 0; i < 10; i++) {
    Todo.create({name:`name-${i}`})
  }

  console.log('done')

})