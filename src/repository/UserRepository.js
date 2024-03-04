const con = require("../dbConnection");
const User = require("../model/User");
const ErrorLog = require("../errors/ErrorLog");


class UserRepository {

  constructor() {
    con.query("CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, name varchar(45), email varchar(200) UNIQUE, followers int, PRIMARY KEY(id));")
  }

  // insira um usuário
  async insert({ name, email, followers = 0 }) {
    try {
      const query = `INSERT INTO users (name,email,followers) VALUE ('${name}','${email}','${followers}')`;
      const [rows, fields] = await con.promise().query(query)
        .catch((err) => {
          throw err;
        })

      const id = rows.insertId;

      return new User({ id, name, email, followers });

    } catch (err) {

      switch (err.code) {
        case 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD':
          throw new ErrorLog("Algum valor inserido está incorreto", 400);
        case 'ER_DUP_ENTRY':
          throw new ErrorLog("Email já cadastrado no sistema", 400);
        default:
          console.log(err);
          break;
      }

    }
  }

  // Lista todos os usuários
  async get() {
    try {
      const query = "select * from users;";

      const [rows, fields] = await con.promise().query(query)
        .catch((err) => { throw err });

      return rows;
    } catch (err) {
      console.log(err)
    }
  }

  // Pega um usuário de acordo com id
  async where(id) {
    try {
      let query = `SELECT * FROM users WHERE id = ${id}`;

      const [rows, fields] = await con.promise().query(query)
        .catch((err) => { throw err })

      return rows;

    } catch (err) {
      switch (err.code) {
        case 'ER_BAD_FIELD_ERROR':
          throw new ErrorLog("Identificador inválido", 404);
        default:
          console.log(err);
          break;
      }
    }
  }

  // Atualiza colunas de um usuário
  async update(id, values) {
    // Values are a object
    try {
      // Extraindo as colunas que serão alteradas
      let columns = [];
      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          columns.push(`${key}="${value}"`);
        }
      });

      // Criação da query
      const columns_to_change = columns.join(", ");
      const query = `UPDATE users SET ${columns_to_change} WHERE id=${id};`;

      await con.promise().query(query)
        .catch(err => { throw err });

    } catch (err) {
      switch (err.code) {
        case 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD':
          throw new ErrorLog("Algum valor inserido está incorreto", 400);
        case 'ER_DUP_ENTRY':
          throw new ErrorLog("Email já cadastrado no sistema", 400);
        default:
          console.log(err);
          break;
      }
    }

  }

  // Deletar um usuário da tabela
  async remove(id) {
    const query = `DELETE FROM users WHERE id=${id}`;

    await con.promise().query(query);
  }
}

module.exports = UserRepository;