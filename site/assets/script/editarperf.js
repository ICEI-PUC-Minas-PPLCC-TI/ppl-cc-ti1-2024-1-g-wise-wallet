const currentEmail = document.querySelector("#current-email");
const currentName = document.querySelector("#current-name");

const newEmail = document.querySelector("#email");
const newName = document.querySelector("#name");

const updateBtn = document.querySelector(".update-button");
const userId = document.querySelector("#user-id").value;

function loadForm() {
    fetch(`/usuarios/${userId}`).then((res) => {
        return res.json();
    }).then((data) => {
        currentEmail.value = data.email;
        currentName.value = data.nome;
    }).catch((err) => {
        console.error('Erro ao carregar os dados do usuário:', err);
    });
}

window.onload = loadForm;

updateBtn.onclick = () => {
    fetch(`/usuarios/${userId}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: newName.value, email: newEmail.value })
    }).then(() => {
        loadForm();
    }).catch((err) => {
        alert('Erro ao atualizar o perfil:', err);
    });
}
