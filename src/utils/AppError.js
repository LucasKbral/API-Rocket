/* aqui o erro é de fora do servidor será mostrado o error 400 bad request e está apontando pro user controller */

class AppError {
    message;
    statusCode;

    constructor(message, statusCode = 400){
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;