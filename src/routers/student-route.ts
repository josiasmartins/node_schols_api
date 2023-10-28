import express from "express";
import Student from "../models/student";
import studentRepository from "../repositories/student-repository";


const studentRouter = express.Router();

studentRouter.post('/students', (req, res) => {
    const student: Student = req.body
    studentRepository.criar(student, (id) => {
        console.log(student, id)
        if (id) {
            res.status(201).location(`/students/${id}`).send()
        } else {
            console.log("post", req.body, res)
            res.status(400).send()
        }
    })
})

studentRouter.get('/students', (req, res) => {
    studentRepository.lerTodos((itens) => res.json(itens))
})

studentRouter.get('/students/:id', (req, res) => {
    const id: number = +req.params.id
    studentRepository.ler(id, (item) => {
        if (item) {
            res.json(item)
        } else {
            res.status(404).send()
        }
    })
})
studentRouter.put('/students/:id', (req, res) => {
    const id: number = +req.params.id
    studentRepository.atualizar(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})
studentRouter.delete('/students/:id', (req, res) => {
    const id: number = +req.params.id
    studentRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})
export default studentRouter