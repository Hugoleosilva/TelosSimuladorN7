import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Procurar o usuário pelo email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }

        // 2. Comparar a senha usando o método criado no Model
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }

        // 3. Gerar o Token JWT (usando a SECRET do .env)
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Token expira em 1 dia
        );

        // 4. Retornar o token e dados básicos do usuário
        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};