const express = require("express");

const UserRepository = require("./repository/UserRepository");

const router = express.Router();

router.post("/users", async (request, response) => {
  try {
    const { name, email, followers } = request.body;
    const userRepository = new UserRepository();
    const user = await userRepository.insert({ name, email, followers })

    response.status(200).json(user);
  } catch (error) {
    response.status(error.status).json({ "mensage": error.mensage });
  }
});

router.get("/users", async (request, response) => {
  const userRepository = new UserRepository();
  const users = await userRepository.get()

  response.status(200).json(users);
});

router.get("/users/:id", async (request, response) => {

  try {
    const { id } = request.params;
    const userRepository = new UserRepository();
    const user = await userRepository.where(id);

    response.status(200).json(user);
  } catch (error) {
    response.status(error.status).json({ "mensage": error.mensage });
  }
})

router.put("/users/:id", async (request, response) => {
  try {
    const { id, name, email, followers } = request.body;
    const userRepository = new UserRepository();
    await userRepository.update(id, { name, email, followers });

    response.status(200).json({ "mensage": "Dados atualizados com sucesso!" });
  } catch (error) {
    response.status(error.status).json({ "mensage": error.mensage });
  }

})

router.delete("/users/:id", async (request, response) => {
  const { id } = request.params;
  const userRepository = new UserRepository();
  await userRepository.remove(id);

  response.status(200).json({ "mensage": "Usuário deletado com sucesso!" });
})

module.exports = router;