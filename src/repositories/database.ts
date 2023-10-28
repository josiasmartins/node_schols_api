import sqlite3 from 'sqlite3'

const DBSOURCE = 'db.sqlite';

const SQL_STUDENT_CREATE = `
    CREATE TABLE student (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        idade TEXT,
        nota_primeiro_semestre TEXT,
        nota_segundo_semestre TEXT,
        nome_professor TEXT,
        numero_da_sala INTEGER
    )`
const database = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Base de dados conectada com sucesso.')
        database.run(SQL_STUDENT_CREATE, (err) => {
            if (err) {
                // Possivelmente a tabela já foi criada
            } else {
                console.log('Tabela student criada com sucesso.')
            }
        })
    }
})
export default database