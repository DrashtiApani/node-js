

const express = require('express');
const port = 2209;
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); 

let TodoList = [
  { id: 1, todo: 'writing' },
  { id: 2, todo: 'reading' },
  { id: 3, todo: 'coding' },
];

app.get('/', (req, res) => {
  return res.render('todo', { todoList: TodoList });
});

//edit todo
app.get('/editTodo', (req, res) => {
    let id = req.query.id;
    let singleTodo = TodoList.find((val) => val.id == id);
    return res.render('editTodo', { todo: singleTodo });
   
});

// Update todo

app.post('/updateTodo', (req, res) => {

    const { id, todo } = req.body; 
    let up = TodoList.map((val) => {
        if (val.id === parseInt(id)) {
            val.todo = todo;
        }
        return val;
    });
    TodoList = up;
    return res.redirect('/');
});




// Delete todo
app.get('/deleteTodo', (req, res) => {
    let id = req.query.id;

    let deleteData = TodoList.filter((todo) => todo.id != id);
    TodoList = deleteData;
    return res.redirect('/'); 

});

// add
app.post('/addTodo', (req, res) => {
  const obj = {
    id: Math.floor(Math.random() * 10000),           
    todo: req.body.todo,
  };
  TodoList.push(obj);
  return res.redirect('/');
});



app.listen(port, (err) => {
    if (err) {
        console.log('Error starting server:', err);
        return;
    }
    console.log(`Server is running on port ${port}`);
});
