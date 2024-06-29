document.addEventListener("DOMContentLoaded", function () {
    const formLogin = document.getElementById('formlogin');

    if(formLogin){
        formLogin.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const loginData = {
                username: username,
                password: password
            };

            console.log('Dados de login:', loginData); // Log para verificar os dados

            fetch('http://localhost:3000/login', { // Corrigido para /login
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
            .then(response => response.json().then(data => ({ status: response.status, body: data }))) // Tratamento da resposta
            .then(({ status, body }) => {
                console.log('Resposta do servidor:', status, body); // Log para verificar a resposta
                if(status === 200 && body.success){
                    alert('Login efetuado com sucesso!');
                    window.location.href = 'formulario.html';
                }
                else{
                    alert(body.message || 'Erro ao tentar logar');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao tentar logar');
            });
        });
    }
    else{
        console.error('Elemento formLogin não encontrado');
    }
});
