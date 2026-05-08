import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    // 1. Verifica se o cabeçalho Authorization veio na requisição
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token not provided or access denied" });
    }

    // 2. O token geralmente vem como "Bearer <token>", então dividimos a string
    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(401).json({ message: "Token format error" });
    }

    const [scheme, token] = parts;

    // 3. Valida o token usando a sua chave secreta do .env
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        // Se estiver tudo ok, salva o ID do usuário na requisição e segue em frente
        req.userId = decoded.id;
        return next();
    });
};