import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Carrega as variáveis do arquivo .env que acabaram de ser criadas
dotenv.config();

const connectDB = async () => {
    try {
        // Agora o código busca a URL lá no .env de forma segura
        const uri = process.env.MONGODB_URI;
        
        if (!uri) {
            throw new Error("The MONGODB_URI variable was not defined in the .env file");
        }

        await mongoose.connect(uri);
        console.log("✅ Database connected successfully (via .env)");
    } catch (err) {
        console.error("❌ Failed to connect database", err.message);
        process.exit(1); // Fecha o servidor se não conseguir conectar
    }
};

export default connectDB;