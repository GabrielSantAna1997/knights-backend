import express from 'express';
import db from './config/dbConnect.js'
import routes from './routes/index.js'
import cors from 'cors';
import * as dotenv from 'dotenv'
dotenv.config()

db.once("open", () => {
    console.log("Conexão com o banco feita com sucesso");
});

const app = express();

app.use(cors({
    origin: 'http://localhost:8080'
 }));
 
app.use(express.json())

routes(app)


export default app