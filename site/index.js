const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('telas'));

// Cadastrar um novo usuário
app.post('/cadastrar', (req, res) => {
    const novoUsuario = req.body;

    const dbPath = './assets/db/db.json';

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            res.status(500).send('Erro ao ler o arquivo.');
            return;
        }
        const db = JSON.parse(data);

        const emailExiste = db.usuarios.some(user => user.email === novoUsuario.email);
        if (emailExiste) {
            res.status(400).json({ success: false, message: 'E-mail já cadastrado.' });
            return;
        }

        const usuarioExiste = db.usuarios.some(user => user.login === novoUsuario.login);
        if (usuarioExiste) {
            res.status(400).json({ success: false, message: 'Nome de usuário já cadastrado.' });
            return;
        }

        const senhaExiste = db.usuarios.some(user => user.senha === novoUsuario.senha);
        if (senhaExiste) {
            res.status(400).json({ success: false, message: 'Senha já cadastrada.' });
            return;
        } 

        db.usuarios.push(novoUsuario);

        fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo:', err);
                res.status(500).json({ success: false, message: 'Erro ao escrever no arquivo.' });
                return;
            }

            res.status(200).json({ success: true, message: 'Usuário cadastrado com sucesso.' });
        });
    });
});

// Autenticando login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Dados recebidos no login:', username, password); // Log para verificar os dados recebidos
    const dbPath = './assets/db/db.json';

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            res.status(500).json({ success: false, message: 'Erro ao ler o arquivo.' });
            return;
        }
        const db = JSON.parse(data);
        console.log('Usuários no banco de dados:', db.usuarios); // Log para verificar os usuários
        const user = db.usuarios.find(user => user.login === username && user.senha === password);
        if (user) {
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({ success: false, message: 'Nome de usuário ou senha incorretos.' });
        }
    });
});

// Obter todas as mensagens
app.get('/mensagens', (req, res) => {
    const dbPath = './assets/db/db.json';

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            res.status(500).send('Erro ao ler o arquivo.');
            return;
        }
        const db = JSON.parse(data);
        res.json(db.mensagens);
    });
});

// Adicionar uma nova mensagem
app.post('/mensagens', (req, res) => {
    const novaMensagem = req.body;

    const dbPath = './assets/db/db.json';

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            res.status(500).send('Erro ao ler o arquivo.');
            return;
        }
        const db = JSON.parse(data);

        db.mensagens.push(novaMensagem);

        fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo:', err);
                res.status(500).json({ success: false, message: 'Erro ao escrever no arquivo.' });
                return;
            }

            res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso.' });
        });
    });
});

// Editar uma mensagem
app.put('/mensagens/:id', (req, res) => {
    const messageId = parseInt(req.params.id);
    const updatedMessage = req.body;

    const dbPath = './assets/db/db.json';

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            res.status(500).send('Erro ao ler o arquivo.');
            return;
        }
        
        const db = JSON.parse(data);

        // Encontrar a mensagem pelo ID
        const messageToUpdate = db.mensagens.find(msg => msg.id === messageId);
        if (!messageToUpdate) {
            res.status(404).send('Mensagem não encontrada.');
            return;
        }

        // Atualizar os campos da mensagem encontrada
        Object.assign(messageToUpdate, updatedMessage);

        // Escrever de volta no arquivo db.json
        fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo:', err);
                res.status(500).send('Erro ao escrever no arquivo.');
                return;
            }

            res.status(200).json({ success: true, message: 'Mensagem editada com sucesso.' });
        });
    });
});


// Excluir uma mensagem
app.delete('/mensagens/:id', (req, res) => {
    const messageId = parseInt(req.params.id);

    const dbPath = './assets/db/db.json';

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            res.status(500).send('Erro ao ler o arquivo.');
            return;
        }
        const db = JSON.parse(data);

        const messageIndex = db.mensagens.findIndex(msg => msg.id === messageId);
        if (messageIndex === -1) {
            res.status(404).send('Mensagem não encontrada.');
            return;
        }

        db.mensagens.splice(messageIndex, 1);

        fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo:', err);
                res.status(500).send('Erro ao escrever no arquivo.');
                return;
            }

            res.status(200).json({ success: true, message: 'Mensagem excluída com sucesso!' });
        });
    });
});

// Trocar a senha
app.post('/alterar_senha', (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const dbPath = './assets/db/db.json';

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            res.status(500).send('Erro ao ler o arquivo.');
            return;
        }
        
        const db = JSON.parse(data);
        const userIndex = db.usuarios.findIndex(user => user.senha === currentPassword);

        if (userIndex === -1) {
            res.status(400).json({ success: false, message: 'Senha atual incorreta.' });
            return;
        }

        db.usuarios[userIndex].senha = newPassword;

        fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo:', err);
                res.status(500).send('Erro ao escrever no arquivo.');
                return;
            }

            res.status(200).json({ success: true, message: 'Senha alterada com sucesso.' });
        });
    });
});



// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
