var express = require('express');
var router = express.Router();
var todos = require('../resource/todo');
const Todos = require('../models/Todo');
const Todo = require('../models/Todo');
//console.log(todos)

/* GET home page. */
router.get('/',async function(req, res, next) {
  
  //todoslist form database
  const todos = await Todos.find();
  console.log(todos);
  res.render('home',{todosList:todos});
});

router.get('/home',function(req,res,next){
  res.render('home');
})


router.get('/add-to-do',function(req,res,next){
  res.render('addTodo',{title:"Add to do"})
})

router.post('/save-to-do',async function(req,res,next){
  const todo = new Todos({
    title: req.body.title,
    description: req.body.description
  });
  await todo.save();

  //todo.save().then(() => console.log('todo inserted')).catch(())
  res.redirect('/');
})

// router.get('/delete-to-do/:index', function(req,res,next){
//   console.log(req.params.index);
//   todos.splice(req.params.index,1);
//   res.redirect('/');
// })

router.get('/delete-to-do/:id', async function(req,res,next){
 // console.log(req.params.id);
  await Todo.remove({_id:req.params.id});
  //const index = todos.findIndex(todo => todo._id === req.params.id);
  //todos.splice(index,1);
  res.redirect('/');
})

router.get('/open-update-form/:id',async function(req,res,next){
  const todo = await Todo.findOne({_id: req.params.id});
  //const todotodo = todos.find(todo => todo._id === req.params.id);
  res.render('editToDo',{ title: 'Edit to-do ',todo:todo});
})

router.post('/update-to-do/:id',async function(req,res,next){
// console.log(req.body,req.params);
//const index = todos.findIndex(todo => todo._id === req.params.id);
//todos.splice(index,1,{...req.body,_id: req.params.id});
 await Todo.updateOne({_id:req.params.id},{$set: {title:req.body.title,description:req.body.description}}); 
  
  res.redirect('/');
})

module.exports = router;
