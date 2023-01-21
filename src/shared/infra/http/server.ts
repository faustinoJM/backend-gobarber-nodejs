import express, { NextFunction, Request, request, Response, response } from "express";
import "reflect-metadata"
import 'express-async-errors'
import cors from 'cors'
import { AppDataSource } from "../typeorm/index";
import routes from "./routes";
import "../../../shared/container"
import upload from "../../../config/upload";
import AppError from "../../errors/AppError";


// try {
//   AppDataSource.initialize()
//   .then(() => {
//       console.log("Data Source has been initialized!")
//   })
//   .catch((err) => {
//       console.error("Error during Data Source initialization", err)
//   })

//   app.listen(3333, () => {
//     console.log("Server On port:", 3333)
//   })
// } catch(err) {
//   console.log("erro server e conex")
// }

const app = express();

app.use(cors());
app.use(express.json())
app.use('/files', express.static(upload.directory))
app.use(routes)


app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }
  console.log(err)
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.get('/', (req, res) => {
  return res.json("Esout aik server")
})

async function main() {
  try{
    await AppDataSource.initialize();
    console.log("Data source initialized")


  app.listen(3333, () => {
  console.log("Server On port:", 3333)
    })
  } catch (err) {
    console.log("Data source Error " + err)
  }
}

main();


// AppDataSource.initialize().then(() => {
//   const app = express();

//   app.use(express.json())
//   app.use(routes)
//   app.get('/', (req, res) => {
//     return res.json("Esout aik")
//   })
//   app.listen(3333, () => {
//   console.log("Server On port:", 3333)
//     })

// })


// async function main() {
//   try{
//     await AppDataSource.initialize();
//     console.log("Data source initialized")
//     const app = express();

//   app.use(express.json())
//   app.use(routes)
//   app.get('/', (req, res) => {
//     return res.json("Esout aik")
//   })
//   app.listen(3333, () => {
//   console.log("Server On port:", 3333)
//     })
//   } catch (err) {
//     console.log("Data source Error " + err)
//   }
// }

// main();
