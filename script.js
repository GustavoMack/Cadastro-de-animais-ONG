let cachorros = [];
let indiceEdicao = null;

document
  .getElementById("formCachorro")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const nomeCachorro = document.getElementById("nomeCachorro").value;
    const pesoCachorro = document.getElementById("pesoCachorro").value;
    const corCachorro = document.getElementById("corCachorro").value;
    const racaCachorro = document.getElementById("racaCachorro").value;

    if (indiceEdicao === null) {
      const cachorro = {
        id: cachorros.length + 1,
        nome: nomeCachorro,
        peso: pesoCachorro,
        cor: corCachorro,
        raca: racaCachorro,
      };
      cachorros.push(cachorro);
    } else {
      cachorros[indiceEdicao].nome = nomeCachorro;
      cachorros[indiceEdicao].peso = pesoCachorro;
      cachorros[indiceEdicao].cor = corCachorro;
      cachorros[indiceEdicao].raca = racaCachorro;
      indiceEdicao = null;
    }

    document.getElementById("nomeCachorro").value = "";
    document.getElementById("pesoCachorro").value = "";
    document.getElementById("corCachorro").value = "";
    document.getElementById("racaCachorro").value = "";

    atualizarListaCachorros();
  });

function atualizarListaCachorros() {
  const listaCachorros = document.getElementById("listaCachorros");
  listaCachorros.innerHTML = "";

  cachorros.forEach((cachorro, index) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
            <td>${cachorro.id}</td>
            <td>${cachorro.nome}</td>
            <td>${cachorro.peso} kg</td>
            <td>${cachorro.cor}</td>
            <td>${cachorro.raca}</td>
            <td class="acoes">
                <button class="editar" onclick="editarCachorro(${index})">Editar</button>
                <button class="excluir" onclick="excluirCachorro(${index})">Excluir</button>
            </td>
        `;
    listaCachorros.appendChild(linha);
  });
}

function editarCachorro(index) {
  document.getElementById("nomeCachorro").value = cachorros[index].nome;
  document.getElementById("pesoCachorro").value = cachorros[index].peso;
  document.getElementById("corCachorro").value = cachorros[index].cor;
  document.getElementById("racaCachorro").value = cachorros[index].raca;
  indiceEdicao = index;
}

function excluirCachorro(index) {
  cachorros.splice(index, 1);
  atualizarListaCachorros();
}

function gerarRelatorioTxt() {
  let relatorio = "Relatório de Cachorros Cadastrados:\n\n";
  cachorros.forEach((cachorro) => {
    relatorio += `ID: ${cachorro.id}, Nome: ${cachorro.nome}, Peso: ${cachorro.peso} kg, Cor: ${cachorro.cor}, Raça: ${cachorro.raca}\n`;
  });

  const blob = new Blob([relatorio], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "relatorio_cachorros.txt";
  link.click();
}

function gerarRelatorioPdf() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Relatório de Cachorros Cadastrados", 10, 10);

  cachorros.forEach((cachorro, index) => {
    doc.setFontSize(12);
    doc.text(
      `ID: ${cachorro.id} | Nome: ${cachorro.nome} | Peso: ${cachorro.peso} kg | Cor: ${cachorro.cor} | Raça: ${cachorro.raca}`,
      10,
      20 + index * 10
    );
  });

  doc.save("relatorio_cachorros.pdf");
}