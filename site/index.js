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
            res.status(400).send('E-mail já cadastrado.');
            return;
        }

        const usuarioExiste = db.usuarios.some(user => user.login === novoUsuario.login);
        if (usuarioExiste) {
            res.status(400).send('Nome de usuário já cadastrado.');
            return;
        }

        const senhaExiste = db.usuarios.some(user => user.senha === novoUsuario.senha);
        if (senhaExiste) {
            res.status(400).send('Senha já cadastrada.');
            return;
        } 

        db.usuarios.push(novoUsuario);

        fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo:', err);
                res.status(500).send('Erro ao escrever no arquivo.');
                return;
            }

            res.status(200).send('Usuário cadastrado com sucesso.');
        });
    });
});

// Autenticando login
app.post('/login', (req, res) => {
    const {username, password} = req.body;
    const dbPath = './assets/db/db.json';

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if(err){
            console.error('Erro ao ler o arquivo:', err);
            res.status(500).json({success: false, message: 'Erro ao ler o arquivo.'});
            return;
        }
        const db = JSON.parse(data);
        const user = db.usuarios.find(user => user.login === username && user.senha === password);
        if(user){
            res.status(200).json({success: true});
        }
        else{
            res.status(400).json({success: false, message: 'Usuário ou senha inválidos.'});
        }
    });
})

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
