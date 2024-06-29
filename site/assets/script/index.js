const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url, true);

    if (req.method === "POST" && pathname === "/processar_categorias") {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", () => {
            const categorias = JSON.parse(data).categorias;
            // Aqui você pode processar as categorias recebidas como desejar
            console.log("Categorias recebidas:", categorias);

            // Respondendo ao cliente
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify({
                    message: "Categorias recebidas com sucesso!",
                }),
            );
        });
    } else {
        let filePath = path.join(
            __dirname,
            "site",
            pathname === "/" ? "/telas/CadastroCategoria.html" : pathname,
        );

        // Verifica a extensão do arquivo para definir o tipo de conteúdo correto
        const extname = path.extname(filePath);
        let contentType = "text/html";
        switch (extname) {
            case ".js":
                contentType = "text/javascript";
                break;
            case ".css":
                contentType = "text/css";
                break;
            case ".json":
                contentType = "application/json";
                break;
            case ".png":
                contentType = "image/png";
                break;
            case ".jpg":
                contentType = "image/jpg";
                break;
        }

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data);
        });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
