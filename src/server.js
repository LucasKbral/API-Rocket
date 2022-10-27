 
 require("express-async-errors");

 const migrationsRun = require("./database/sqlite/migrations");

 const AppError = require("./utils/AppError");

 const express = require("express"); /* faz a chamada da express (importo o express) */

 const routes = require("./routes");
 
 migrationsRun();
 
 const app = express(); /*iniciar o express */
 
 app.use(express.json());

 app.use(routes);

 

 /* app error serve para indentificar de onde parte o erro se do cliente que fez um bad request (ex erro 400) ou o erro do proprio servidor (ex error 500) */
 /* aqui indentifica o erro interno do servidor erro 500*/ 

 app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
        status: "erro",
        message: error.message
    });
  }

console.error(error)

return response.status(500).json({
    status: "error",
    message: "Internal server error",
})

 });

 const PORT = 3333; /*indicar qual porta o express irá observar */
 app.listen(PORT, () => console.log(`server is running on port ${PORT} `)); /* irá executar a mensagem indicando que esta rodando na porta  ex 3333*/

