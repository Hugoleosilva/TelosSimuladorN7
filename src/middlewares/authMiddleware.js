import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    // 1. Verifica se o cabeçalho Authorization veio na requisição
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido ou acesso negado" });
    }

    // 2. O token geralmente vem como "Bearer <token>", então dividimos a string
    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(401).json({ message: "Erro no formato do token" });
    }

    const [scheme, token] = parts;

    // 3. Valida o token usando a sua chave secreta do .env
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido ou expirado" });
        }

        // Se estiver tudo ok, salva o ID do usuário na requisição e segue em frente
        req.userId = decoded.id;
        return next();
    });
};