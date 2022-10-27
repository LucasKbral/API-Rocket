const { hash } = require("bcryptjs")
const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UsersControllers {
async create(request, response){
    const {name, email, password} = request.body;
    
    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(checkUserExists){
        throw new AppError("Este email já está em uso")
    }
    
    const hashedPassword = await hash(password, 8);

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword]
    );
    
    
    return response.status(201).json();
    
 }

async update(request, response) {
    const {name, email} = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if(!user) {
        throw AppError("Usuário não encontrado.")
    }

  const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

  if(userWithUpdatedEmail && userWithUpdatedEmail.id !== id){
    throw new AppError("eSTE e-mail já está em uso.");
  }

 user.name = name;
 user.email = email;

}
}


module.exports = UsersControllers;



