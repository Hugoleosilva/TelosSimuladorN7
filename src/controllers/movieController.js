// Banco de dados em memória (Array) 
let movies = [
    {
        id: 1,
        title: "Inception",
        description: "Um ladrão que rouba segredos corporativos através do uso de tecnologia de compartilhamento de sonhos.",
        year: 2010,
        genres: ["Ficção Científica", "Ação"],
        image: "https://link-da-imagem.com/inception.jpg",
        video: "https://youtube.com/watch?v=trailer-inception"
    },
    {
        id: 2,
        title: "Interstellar",
        description: "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço.",
        year: 2014,
        genres: ["Drama", "Ficção Científica"],
        image: "https://link-da-imagem.com/interstellar.jpg",
        video: "https://youtube.com/watch?v=trailer-interstellar"
    }
];

let nextId = 3;

// GET /movies - Listar tarefas 
export const getAllMovies = (req, res) => {
    res.status(200).json(movies);
};

// POST /movies - Criar tarefa 
export const createMovie = (req, res) => {
    const { title, description, year, genres, image, video } = req.body;
    
    const newMovie = { 
        id: nextId++, 
        title, 
        description, 
        year, 
        genres, 
        image, 
        video 
    };

    movies.push(newMovie);
    res.status(201).json(newMovie);
};

// PUT /movies/:id - Atualizar tarefa 
export const updateMovie = (req, res) => {
    const { id } = req.params;
    const { title, description, year, genres, image, video } = req.body;
    
    const index = movies.findIndex(m => m.id === parseInt(id));
    
    if (index === -1) {
        return res.status(404).json({ message: "Filme não encontrado" });
    }

    movies[index] = { 
        ...movies[index], 
        title, 
        description, 
        year, 
        genres, 
        image, 
        video 
    };

    res.json(movies[index]);
};

// DELETE /movies/:id - Deletar tarefa 
export const deleteMovie = (req, res) => {
    const { id } = req.params;
    const initialLength = movies.length;
    
    movies = movies.filter(m => m.id !== parseInt(id));
    
    if (movies.length === initialLength) {
        return res.status(404).json({ message: "Filme não encontrado" });
    }

    res.status(204).send();
};