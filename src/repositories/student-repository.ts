import Student from '../models/student'
import database from './database'

const itensRepository = {
    criar: (student: Student, callback: (id?: number) => void) => {
        const sql = 'INSERT INTO student (nome, idade, nome_professor, nota_primeiro_semestre, nota_segundo_semestre, numero_da_sala) VALUES (?, ?, ?, ?, ?, ?)'
        const params = [
            student.nome,
            student.idade, 
            student.nome_professor, 
            student.nota_primeiro_semestre, 
            student.nota_segundo_semestre, 
            student.numero_da_sala
        ];

        database.run(sql, params, function(_err) {
            callback(this?.lastID)
        })
    },

    lerTodos: (callback: (student: Student[]) => void) => {
        const sql = 'SELECT * FROM student'
        const params: any[] = []
        database.all(sql, params, (_err, rows: Student[]) => callback(rows))
    },

    ler: (id: number, callback: (student?: Student) => void) => {
        const sql = 'SELECT * FROM student WHERE id = ?'
        const params = [id]
        database.get(sql, params, (_err, row: Student) => callback(row))
    },

    atualizar: (id: number, student: Student, callback: (notFound: boolean) => void) => {
        const sql = `UPDATE student SET 
            nome = ?, 
            idade = ?, 
            nome_professor = ?, 
            nota_primeiro_semestre = ?,
            nota_segundo_semestre = ?,
            numero_da_sala = ? WHERE id = ?`
        // const params = [item.nome, item.descricao, id]

        const params = [
            student.nome,
            student.idade, 
            student.nome_professor, 
            student.nota_primeiro_semestre, 
            student.nota_segundo_semestre, 
            student.numero_da_sala,
            id
        ];

        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },

    apagar: (id: number, callback: (notFound: boolean) => void) => {
        const sql = 'DELETE FROM student WHERE id = ?'
        const params = [id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },

}
export default itensRepository