import mongoose from 'mongoose';

// Usando a sua nova string de conexão do Atlas
const uri = "mongodb+srv://hugollsilvadev_db_user:Za76KlyxnQjW3uyr@telos.9nkpwnz.mongodb.net/movie-api?retryWrites=true&w=majority&appName=Telos";

const connectDB = () => {
    mongoose
        .connect(uri)
        .then(() => {
            console.log("Database connected successfully"); // Mesma mensagem do professor 
        })
        .catch((err) => {
            console.log("Failed to connect database", err); // Mesma mensagem do professor 
        });
};

export default connectDB;