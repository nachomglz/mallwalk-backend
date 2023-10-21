const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.paths = {
      usuarios: "/api/usuarios",
      store: "/api/store",
      dailytask: "/api/dailytask",
      ranking: "/api/ranking",
    };

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
    this.app.use(this.paths.store, require("../routes/store"));
    this.app.use(this.paths.dailytask, require("../routes/dailyTask"));
    this.app.use(this.paths.ranking, require("../routes/ranking"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
