// Simulação de carregamento do nome de usuário
document.addEventListener('DOMContentLoaded', function() {
    // Aqui você pode fazer uma requisição AJAX para obter o nome do usuário
    const userName = 'Usuário Exemplo'; // Substitua pelo nome do usuário obtido

    // Atualiza o elemento no DOM
    const userNamePlaceholder = document.getElementById('user-name-placeholder');
    if (userNamePlaceholder) {
        userNamePlaceholder.textContent = userName;
    }
});
