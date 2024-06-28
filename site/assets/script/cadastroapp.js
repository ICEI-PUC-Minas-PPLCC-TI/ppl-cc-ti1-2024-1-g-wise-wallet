document.addEventListener("DOMContentLoaded", function () {
    const formCadastro = document.getElementById('formcadastro');

    formCadastro.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('As senhas não correspondem.');
            return;
        }

        const novoUsuario = {
            id: Date.now(),
            login: username,
            senha: password,
            nome: name,
            email: email
        };

        fetch('http://localhost:3000/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoUsuario)
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            formCadastro.reset();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao cadastrar usuário.');
        });
    });
});