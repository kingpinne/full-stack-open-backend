const express = require('express')

const app = express()
app.use(express.json())
const PORT = 3001

let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (req,res)=>{
    res.send(data)
})

app.get('/api/persons/:id', (req,res)=>{

    const person = data.find(person => person.id === Number(req.params.id))

    if(!person){
       res.status(404).end() 
    } 
    res.send(person)  
})

app.get('/info', (req,res)=>{
    
    res.send(`Phonebook has info for ${data.length} people. <br/> ${new Date()}`)

})

app.delete('/api/persons/:id', (req,res) => {
    const person = data.find(person => person.id === Number(req.params.id))
    console.log(person);

    if(!person){
        res.status(404).end()
    }

    data = data.filter(entry => entry.id !== person.id)
    console.log(data);
    res.send(data)

})

app.post('/api/persons', (req,res) => {
    if(!req.body.name){
        return res.status(404).send('must contain name').end()
    }

    if(!req.body.number){
        return res.status(404).send('must contain number').end()
    }

    if(data.find(person => person.name === req.body.name)){
        return res.status(404).send('name must be unique').end()
    }


    let newId = Math.floor(Math.random() * 100000)

    const newPerson = {
        id: newId,
        name: req.body.name,
        number: req.body.number
    }
    data.push(newPerson)
    res.send(data)

})




app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})