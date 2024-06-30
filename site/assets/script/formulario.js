document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('categoriaForm');
    const send = document.getElementById('enviarCategorias');

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

        const token = localStorage.getItem('authToken');

        fetch('http://localhost:3000/adicionarCategoria', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(dadosCategoria)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Categoria adicionada com sucesso!');
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
