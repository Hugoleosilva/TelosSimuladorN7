import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    }
}, { 
    timestamps: true 
});

// --- LÓGICA DE SEGURANÇA (HOOK PRE-SAVE) ---
// Esta versão usa async/await sem o parâmetro 'next' para evitar o erro "next is not a function"
userSchema.pre('save', async function () {
    // Se a senha não foi modificada, não faz nada e sai
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw error;
    }
});

// --- MÉTODO DE COMPARAÇÃO (Para ser usado no Controller de Login) ---
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;