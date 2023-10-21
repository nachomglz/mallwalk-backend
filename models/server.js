const express = require("express");
const cors = require("cors");
const upload = require("express-fileupload");
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
      bill: "/api/bill"
    };

    // Conectar a base de datos
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // Cors
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Carga de archivos
    this.app.use(
      upload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
<<<<<<< HEAD
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
    this.app.use(this.paths.store, require("../routes/store"));
    this.app.use(this.paths.dailytask, require("../routes/dailyTask"));
    this.app.use(this.paths.ranking, require("../routes/ranking"));
=======
    this.app.use(this.paths.store, require("../routes/store"));
    this.app.use(this.paths.bill, require("../routes/bill"));
>>>>>>> 5db1aa4b1602f1116fce081eae331c0a1227f616
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
