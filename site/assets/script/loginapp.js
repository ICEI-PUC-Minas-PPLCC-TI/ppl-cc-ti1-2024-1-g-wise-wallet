document.addEventListener("DOMContentLoaded", function () {
    const formLogin = document.getElementById('formlogin');

    if(formLogin){
        formLogin.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const loginData = {
            login: username,
            senha: password,
        };
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => response.json().then(data => ({status: response.status, body: data}   )))
        .then(({status, body}) => {
            if(body.success){
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
        console.error('Elemento não encontrado.');
    }
});