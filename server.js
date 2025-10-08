const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("."));

// Arquivo que guarda o contador
const dataFile = "data.json";

// Ler contador
function readCount() {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ hearts: 0 }));
  }
  const data = fs.readFileSync(dataFile);
  return JSON.parse(data).hearts;
}

// Escrever contador
function writeCount(count) {
  fs.writeFileSync(dataFile, JSON.stringify({ hearts: count }));
}

// Endpoints
app.get("/api/count", (req, res) => res.json({ hearts: readCount() }));
app.post("/api/add", (req, res) => {
  let count = readCount();
  count++;
  writeCount(count);
  res.json({ hearts: count });
});

// Start
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
