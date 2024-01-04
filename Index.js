
//write basic express boilerplate code,
//with express.json() middleware
const express = require("express");
const { createTodo } = require("./types");
const { todo } = require("./db");
const app = express;

app.use(express.json());

app.post("/todo", async function(req, res){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.sucess){
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    todo.create ({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
    res.json({
        msg: "Todo created"
    })
})
app.get("/todos", function(req, res){
    const todos = todo.find({});
    res.json({
        todos
    })
})

app.put("/completed", async function(req, res){
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.sucess) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    await todo.update ({
        _id: req.body.id
    }, {
        completed: true
    })
    res.json({
        msg: "Todo marked as completed"
    })
})

app.listen(3000);