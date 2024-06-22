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

        const novaMensagem = {
            nome: nome,
            mensagem: mensagem,
            data: data
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
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});

// forum.js

document.addEventListener("DOMContentLoaded", function() {
    const dataInput = document.getElementById("data");
    const hoje = new Date().toISOString().split('T')[0];
    dataInput.value = hoje;

    const form = document.getElementById("forumForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const mensagem = document.getElementById("mensagem").value;

        // Envia a nova mensagem usando a função enviarMensagem
        enviarMensagem(nome, mensagem);
    });
});

// forum.js

async function enviarMensagem(nome, mensagem) {
    try {
        const novaMensagem = {
            nome: nome,
            mensagem: mensagem,
            data: new Date().toISOString().split('T')[0],
            id: Date.now() // Gera um ID único baseado no timestamp
        };

        // Carrega as mensagens existentes do arquivo forum.json
        const existingMessages = await loadExistingMessages();

        // Adiciona a nova mensagem ao array de mensagens existentes
        existingMessages.push(novaMensagem);

        // Cria um objeto com o formato esperado pelo forum.json
        const data = {
            mensagens: existingMessages
        };

        // Atualiza o arquivo forum.json com os novos dados
        await fetch('/site/assets/db/forum.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        alert('Mensagem enviada com sucesso!');

        // Limpa o formulário e atualiza a data
        document.getElementById("forumForm").reset();
        document.getElementById("data").value = new Date().toISOString().split('T')[0];

        // Recarrega as mensagens na página
        loadMessages();
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error.message);
    }
}


