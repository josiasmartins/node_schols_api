import express from 'express'
import cors from 'cors'
import studentRoute from './routers/student-route'

// Porta do servidor
const PORT = process.env.PORT || 4001
// Host do servidor
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'

// App Express
const app = express()

// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Endpoint raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo!')
})
// Cors
app.use(cors({
    origin: ['http://localhost:3000']
}))
// Rotas
app.use('/api', studentRoute)
// Resposta padrão para quaisquer outras requisições:
app.use((req, res) => {
    res.status(404)
})
// Inicia o sevidor
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})