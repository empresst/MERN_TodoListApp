require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const TodoModel = require('./Models/Todo'); // Corrected path
const cors = require('cors'); // Added CORS

const app = express();

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors());

const uri = process.env.MONGODB_URI || ".env string";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.log(err));

  app.get('/get', (_req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => {
            console.error("Error fetching todos:", err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.put('/update/:id', (req,res) =>{
  const {id} = req.params;
  TodoModel.findByIdAndUpdate({_id:id},{done:true})
  .then(result => res.json(result))
  .catch(err =>  res.json(err))
})

app.delete('/delete/:id',(req,res) =>{
  const {id} = req.params;
  TodoModel.findByIdAndDelete({_id:id},{done:true})
  .then(result => res.json(result))
  .catch(err =>  res.json(err))
})

app.post('/add', (req, res) => {
  const task = req.body.task;
  TodoModel.create({ task: task })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

