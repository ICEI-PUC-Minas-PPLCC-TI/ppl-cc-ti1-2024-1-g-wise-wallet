document.addEventListener("DOMContentLoaded", function() {
    const dataInput = document.getElementById("data");
    const hoje = new Date().toISOString().split('T')[0];
    dataInput.value = hoje;

    const form = document.getElementById("forumForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const mensagem = document.getElementById("mensagem").value;
        const data = document.getElementById("data").value;

        if (!nome || !mensagem || !data) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const novaMensagem = {
            nome: nome,
            mensagem: mensagem,
            data: data,
            id: Date.now() // Gera um ID único baseado no timestamp
        };

        fetch('http://localhost:3000/mensagens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novaMensagem)
        })
        .then(response => response.json())
        .then(data => {
            alert("Mensagem enviada com sucesso!");
            document.getElementById("forumForm").reset();
            document.getElementById("data").value = hoje;
            // Atualizar a lista de mensagens após adicionar uma nova mensagem (opcional)
            // chamar função para atualizar mensagens
        })
        .catch((error) => {
            console.error('Erro ao enviar mensagem:', error);
        });
    });

    // Função para carregar mensagem para edição
    function carregarMensagemParaEdicao(messageId) {
        fetch(`http://localhost:3000/mensagens/${messageId}`)
            .then(response => response.json())
            .then(data => {
                // Preencher os campos de edição com os dados da mensagem
                document.getElementById('nome').value = data.nome;
                document.getElementById('mensagem').value = data.mensagem;
                document.getElementById('data').value = data.data; // Pode não ser editável, dependendo da interface

                // Alterar o evento de submit do formulário para editar a mensagem
                form.removeEventListener('submit', handleSubmit);
                form.addEventListener('submit', function(event) {
                    event.preventDefault();

                    const mensagemEditada = {
                        nome: document.getElementById('nome').value,
                        mensagem: document.getElementById('mensagem').value,
                        data: document.getElementById('data').value
                    };

                    fetch(`http://localhost:3000/mensagens/${messageId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(mensagemEditada)
                    })
                    .then(response => response.json())
                    .then(data => {
                        alert('Mensagem editada com sucesso!');
                        document.getElementById('forumForm').reset();
                        document.getElementById('data').value = hoje;
                        // Atualizar a lista de mensagens após editar a mensagem (opcional)
                        // chamar função para atualizar mensagens
                    })
                    .catch(error => console.error('Erro ao editar mensagem:', error));
                });
            })
            .catch(error => console.error('Erro ao carregar mensagem para edição:', error));
    }

    // Exemplo de como chamar a função de edição ao clicar em um botão de editar na interface
    const botaoEditar = document.getElementById('botaoEditar');
    botaoEditar.addEventListener('click', function() {
        const messageIdParaEditar = 1; // Substitua pelo ID da mensagem que deseja editar
        carregarMensagemParaEdicao(messageIdParaEditar);
    });
});
