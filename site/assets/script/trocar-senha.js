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

        // ID do usuário logado hardcoded
        const userId = 1;
        const apiUrl = `https://8bd457a9-c678-4f17-ae20-4589bd4d8882-00-2t2engj1f57g.kirk.replit.dev/usuarios/${userId}`;

        try {
            // Obter dados do usuário atual
            const response = await fetch(apiUrl);
            const userData = await response.json();

            if (userData.senha !== currentPassword) {
                alert("Senha atual incorreta!");
                return;
            }

            if (newPassword !== confirmNewPassword) {
                alert("A nova senha e a confirmação não coincidem!");
                return;
            }

            // Atualizar a senha do usuário
            const updateResponse = await fetch(apiUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...userData,
                    senha: newPassword
                })
            });

            if (updateResponse.ok) {
                alert("Senha alterada com sucesso!");
                form.reset();
            } else {
                alert("Erro ao alterar a senha.");
            }
        } catch (error) {
            console.error("Erro ao atualizar a senha:", error);
            alert("Erro ao conectar com o servidor.");
        }
    });
});
