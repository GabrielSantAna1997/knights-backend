import mongoose from "mongoose"

mongoose.connect(`mongodb+srv://user2000:xCyBeqsowL0zwiss@clustergabriel.vrbczvz.mongodb.net/?retryWrites=true&w=majority&appName=ClusterGabriel`)

const db = mongoose.connection;

export default db;