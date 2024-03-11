import mongoose from "mongoose"
import * as dotenv from 'dotenv'
dotenv.config()

mongoose.connect(`mongodb+srv://user4000:U6ad8ROk9MaMsWRt@clustergabriel.vrbczvz.mongodb.net/?retryWrites=true&w=majority&appName=ClusterGabriel`)

const db = mongoose.connection;

export default db;