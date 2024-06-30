document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const currentPasswordInput = document.getElementById("current-password");
    const newPasswordInput = document.getElementById("new-password");
    const confirmNewPasswordInput = document.getElementById("confirm-new-password");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const currentPassword = currentPasswordInput.value;
        const newPassword = newPasswordInput.value;
        const confirmNewPassword = confirmNewPasswordInput.value;

        if (newPassword !== confirmNewPassword) {
            alert("A nova senha e a confirmação não coincidem!");
            return;
        }

        const apiUrl = 'http://localhost:3000/alterar_senha';

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                form.reset();
            } else {
                alert(result.message || "Erro ao alterar a senha.");
            }
        } catch (error) {
            console.error("Erro ao atualizar a senha:", error);
            alert("Erro ao conectar com o servidor.");
        }
    });
});
