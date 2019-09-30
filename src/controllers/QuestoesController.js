const connect = require("../connection");

module.exports = {
    async cadastraQuestao(request, response){
        const req = request.body
        let sql = 'INSERT INTO questoes(enunciado, alternativa1, alternativa2, alternativa3, alternativa4, alternativa5, alternativacorreta) VALUES($1, $2, $3, $4, $5, $6, $7)'

        let values = [
            req.enunciado,
            req.alternativa1,
            req.alternativa2,
            req.alternativa3,
            req.alternativa4,
            req.alternativa5,
            req.alternativacorreta
        ]

        await connect().query(sql, values, (error, results) => {
            if (error){
                throw(error)
            }else{
                return response.json({questao: true})
            }
        })
    }
}