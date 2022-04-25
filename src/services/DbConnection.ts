import mongoose, { ConnectionStates } from "mongoose";

let isConnected: ConnectionStates

const DbConnection = async () => {
    try {
        if (isConnected) {
            return;
        }
        const { MONGO_DB_HOST, MONGO_DB_PORT, MONGO_DB_NAME, MONGO_DB_USER, MONGO_DB_PASSWORD } = process.env;
    
        const db = await mongoose.connect(`mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}?authSource=admin`);
        isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log('Falha ao conectar com banco de dados.');
        throw error;
    }
}

export default DbConnection;