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
        })
        .catch((error) => {
            console.error('Erro ao enviar mensagem:', error);
        });
    });
});
