function myMiddleware( request, response, next){
    console.log("você passou pelo Middleware!");
    
    if(!request.body.isAdmin){
    return response.json({message: "user unauthorized"});
    }
    
    next();
}


const usersController = new UsersController();

 usersRouter.use(myMiddleware);   < < /* fazendo dessa maneira o middleware é aplicado para todos os metodos */

usersRouter.post("/", myMiddleware, usersController.create); /* o middleware aqui é para colocar em um metodo especifico*/