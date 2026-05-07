import User from '../models/User.js';

// Listar todos os usuários (Async)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar usuários", error: error.message });
    }
};

// Criar novo usuário (Async)
export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar usuário", error: error.message });
    }
};

// Buscar usuário por ID (Async)
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Erro na busca", error: error.message });
    }
};