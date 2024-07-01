// forum.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forumForm');
    const dataField = document.getElementById('data');

    // Preenche a data atual no campo de data
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    dataField.value = formattedDate;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const mensagem = document.getElementById('mensagem').value;

        const messageData = {
            nome: nome,
            mensagem: mensagem,
            data: formattedDate
        };

        try {
            const response = await fetch('http://localhost:3000/mensagens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar a mensagem.');
            }

            alert('Mensagem enviada com sucesso!');
            form.reset();
        } catch (error) {
            console.error('Erro ao enviar a mensagem:', error.message);
        }
    });

    loadMessages();
});

async function loadMessages() {
    try {
        const response = await fetch('http://localhost:3000/mensagens');
        const messages = await response.json();
        const messagesDiv = document.getElementById('mensagens');
        messagesDiv.innerHTML = '';

        messages.forEach(message => {
            const messageDiv = document.createElement('div');
            messageDiv.innerHTML = `
                <p><strong>Nome:</strong> ${message.nome}</p>
                <p><strong>Mensagem:</strong> ${message.mensagem}</p>
                <p><strong>Data:</strong> ${message.data}</p>
            `;
            messagesDiv.appendChild(messageDiv);
        });
    } catch (error) {
        console.error('Erro ao carregar mensagens:', error.message);
    }
}
