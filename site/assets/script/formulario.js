document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('categoriaForm');
    const send = document.getElementById('enviarCategorias');
    const finalize = document.getElementById('finalizarRegistro');

    let categorias = [];

    send.addEventListener('click', function (){
        const categoria = document.getElementById('categoria1').value;
        const valor = document.getElementById('valor').value;

        if (!categoria || !valor) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const dadosCategoria = {
            categoria: categoria,
            valor: parseFloat(valor)
        };

        categorias.push(dadosCategoria);

        alert('Categoria adicionada com sucesso! Adicione outra categoria ou finalize o registro.');
        form.reset();
    });
        
    finalize.addEventListener('click', function (){
        if(categorias.length === 0){
            alert('Nenhuma categoria adicionada');
            return;
        }

        const token = localStorage.getItem('authToken');
        const dados = {
            mes: categorias
        }

        fetch('http://localhost:3000/finalizarRegistro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(dados)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(data.registroContagem)
                if(data.registroContagem % 3 === 0){
                    window.location.href = 'resultfinal.html';
                }
                else{
                    window.location.href = 'resultunico.html';
                }
                categorias = [];
                form.reset();
            } else {
                alert('Erro ao adicionar categoria: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao adicionar categoria.');
        });
    });
});
