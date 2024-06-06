document.addEventListener("DOMContentLoaded", function() {
    fetch('/site/assets/data/julio.json')
        .then(response => response.json())
        .then(data => {
            const problemButton = document.querySelector("button.problem");
            const solucaoButton = document.querySelector("button.solucao");

            if (problemButton) {
                problemButton.addEventListener("click", function() {
                    const newWindow = window.open("", "_blank");
                    newWindow.document.write(`
                        <html>
                            <head>
                                <title>O problema</title>
                                ${pageStyle}
                            </head>
                            <body>
                                <div class="container">
                                    <h1>O problema</h1>
                                    <p>${data.problema.replace(/\n/g, '<br>')}</p>
                                    <img class="money" src="/site/assets/images/dolar.jpeg" alt="Dinheiro subindo">
                                </div>
                            </body>
                        </html>
                    `);
                });
            }

            if (solucaoButton) {
                solucaoButton.addEventListener("click", function() {
                    const newWindow = window.open("", "_blank");
                    newWindow.document.write(`
                        <html>
                            <head>
                                <title>A solução</title>
                                ${pageStyle}
                            </head>
                            <body>
                                <div class="container">
                                    <h1>A solução</h1>
                                    <p>${data.solucao.replace(/\n/g, '<br>')}</p>
                                    <img class="lupa" src="/site/assets/images/LupaPagInicial.jpeg" alt="Lupa com gráfico">
                                </div>
                            </body>
                        </html>
                    `);
                });
            }
        })
        .catch(error => console.error('Error loading JSON:', error));

    const pageStyle = `
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f4f4f9;
                color: #333;
            }
            h1 {
                font-size: 2.5em; /* Alteração do tamanho da fonte */
                margin-bottom: 0.5em;
                color: #4CAF50;
                text-align: center;
            }
            p {
                font-size: 1.2em;
                line-height: 1.6;
                text-align: center;
            }
            .container {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .money,
            .lupa {
                max-width: 80%;
                height: auto;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                display: block;
                margin: 20px auto;
            }
        </style>
    `;
});