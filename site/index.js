const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const { userInfo } = require('os');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const SECRET_KEY = "meuSegredo";

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('telas'));

// Rota para cadastrar um novo usuário
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

        novoUsuario.id = Date.now(); // Gerando um ID simples para o novo usuário
        novoUsuario.dados = [];
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

// Rota para autenticar login e gerar token
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const dbPath = './assets/db/db.json';

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            res.status(500).json({ success: false, message: 'Erro ao ler o arquivo.' });
            return;
        }
        
        const db = JSON.parse(data);
        const user = db.usuarios.find(user => user.login === username && user.senha === password);

        if (user) {
            const token = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: '1h'})
            res.status(200).json({ success: true, token: token });
        } else {
            res.status(400).json({ success: false, message: 'Nome de usuário ou senha incorretos.' });
        }
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


// Função para verificar se o usuário está autenticado
function verificarAutenticacao(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Token de autenticação não fornecido.' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Token inválido.' });
        }

        req.userId = decoded.id; 
        next();
    });
}

// Rota para finalizar o registro de categorias
app.post('/finalizarRegistro', verificarAutenticacao, (req, res) => {
    const { mes } = req.body;
    const userId = req.userId;
    const dbPath = './assets/db/db.json';
    
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if(err){
            console.error('Erro ao ler o arquivo:', err);
            res.status(500).send('Erro ao ler o arquivo.');
            return;
        }
        const db = JSON.parse(data);
        const user = db.usuarios.find(user => user.id === userId);

        if(!user){
            res.status(401).json({success: false, message: 'Usuário não encontrado.'});
            return;
        }
        const mesIndex = user.dados.length + 1;
        user.dados.push({[`mes${mesIndex}`]: mes});

        fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
            if(err){
                console.error('Erro ao escrever no arquivo:', err);
                res.status(500).json({success: false, message: 'Erro ao escrever no arquivo.'});
                return;
            }

            // Verifica se o mêsIndex é 3, 6 ou 9 para redirecionar para resultfinal.html
            if (mesIndex % 3 === 0) {
                res.status(200).json({success: true, message: 'Registro finalizado com sucesso.', registroContagem: mesIndex, redirectToResultFinal: true});
            } else {
                res.status(200).json({success: true, message: 'Registro finalizado com sucesso.', registroContagem: mesIndex});
            }
        })
    });
})


// Rota para obter dados do usuário logado
app.get('/dadosUsuario', verificarAutenticacao, (req, res) => {
    const userId = req.userId;
    const dbPath = './assets/db/db.json';

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if(err){
            console.error('Erro ao ler o arquivo:', err);
            res.status(500).send('Erro ao ler o arquivo.');
            return;
        }
        const db = JSON.parse(data);
        const user = db.usuarios.find(user => user.id === userId);

        if(!user){
            res.status(401).json({success: false, message: 'Usuário não encontrado.'});
            return;
        }

        res.json({success: true, dados: user.dados});
    });
})

// index.js - Continuação
// ...
const dbPath = './assets/db/db.json';

// Rota para obter todas as mensagens
app.get('/mensagens', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            res.status(500).send('Erro ao ler o arquivo.');
            return;
        }
        const db = JSON.parse(data);
        res.status(200).json(db.mensagens);
    });
});

// Rota para obter uma mensagem específica
app.get('/mensagens/:id', (req, res) => {
    const messageId = parseInt(req.params.id, 10);
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            res.status(500).send('Erro ao ler o arquivo.');
            return;
        }
        const db = JSON.parse(data);
        const message = db.mensagens.find(msg => msg.id === messageId);
        if (!message) {
            res.status(404).send('Mensagem não encontrada.');
            return;
        }
        res.status(200).json(message);
    });
});

// Rota para criar uma nova mensagem
app.post('/mensagens', (req, res) => {
    const novaMensagem = req.body;
    novaMensagem.id = Date.now(); // Gerando um ID simples para a nova mensagem

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
                res.status(500).send('Erro ao escrever no arquivo.');
                return;
            }
            res.status(201).json(novaMensagem);
        });
    });
});

// Rota para atualizar uma mensagem
app.put('/mensagens/:id', (req, res) => {
    const messageId = parseInt(req.params.id, 10);
    const mensagemAtualizada = req.body;

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
        db.mensagens[messageIndex] = { id: messageId, ...mensagemAtualizada };

        fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo:', err);
                res.status(500).send('Erro ao escrever no arquivo.');
                return;
            }
            res.status(200).json(db.mensagens[messageIndex]);
        });
    });
});

// Rota para excluir uma mensagem
app.delete('/mensagens/:id', (req, res) => {
    const messageId = parseInt(req.params.id, 10);

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
            res.status(204).send();
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});




