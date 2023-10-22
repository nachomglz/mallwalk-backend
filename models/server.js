const express = require("express");
const cors = require("cors");
const upload = require("express-fileupload");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.paths = {
      store: "/api/store",
<<<<<<< HEAD
      bill: "/api/bill",
      upload: "/api/upload"
=======
      dailytask: "/api/dailytask",
      ranking: "/api/ranking",
      bill: "/api/bill"
>>>>>>> f4b39eaa5cb5f9dea049f40d4461bb6222209d56
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
    this.app.use(this.paths.store, require("../routes/store"));
    this.app.use(this.paths.dailytask, require("../routes/dailyTask"));
    this.app.use(this.paths.ranking, require("../routes/ranking"));
    this.app.use(this.paths.bill, require("../routes/bill"));
    this.app.use(this.paths.upload, require("../routes/upload"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
