const currentEmail = document.querySelector("#current-email")
const currentName = document.querySelector("#current-name")

const newEmail = document.querySelector("#email")
const newName = document.querySelector("#name")

const updateBtn = document.querySelector(".update-button")

function loadForm() {
    fetch("https://8bd457a9-c678-4f17-ae20-4589bd4d8882-00-2t2engj1f57g.kirk.replit.dev/usuarios/1").then((res) => {
        return res.json();
    }).then((data) => {
        currentEmail.value = data.email
        currentName.value = data.nome
    })
}

window.onload = loadForm

updateBtn.onclick = () => {
    fetch("https://8bd457a9-c678-4f17-ae20-4589bd4d8882-00-2t2engj1f57g.kirk.replit.dev/usuarios/1", {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: newName.value, email: newEmail.value })
    }).then(() => {
        loadForm()
    }).catch((err) => {
        alert(err)
    })
}
