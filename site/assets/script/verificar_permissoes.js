document
    .getElementById("enviarCategorias")
    .addEventListener("click", function () {
        const categoriaInput = document.querySelector(
            'input[name="categoria"]',
        );
        const valorInput = document.querySelector('input[name="valor"]');

        const data = {
            categoria: categoriaInput.value,
            valor: valorInput.value,
        };
        fetch(
            "https://d9785d6e-affa-4a12-8d5f-c2321e97bb61-00-toke8mdh1vjb.riker.replit.dev/categorias",
            {
                // Atualize o endpoint conforme necessário
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            },
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Erro ao enviar categorias para o servidor.");
            })
            .then((data) => {
                console.log("Categorias enviadas com sucesso:", data);
                alert("Categorias enviadas com sucesso para o banco de dados.");
            })
            .catch((error) => {
                console.error("Erro:", error.message);
                alert("Erro ao enviar categorias para o banco de dados.");
            });
    });