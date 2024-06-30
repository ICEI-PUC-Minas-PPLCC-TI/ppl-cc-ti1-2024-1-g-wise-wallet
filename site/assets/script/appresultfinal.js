//RECEBENDO OS DADOS DO JSON SERVER
let gastosTotais = {};
let gastosMes1 = [];
let gastosMes2 = [];
let gastosMes3 = [];

async function carregarDados() {
  const response = await fetch("/site/assets/db/dbmayer.json");
  const data = await response.json();

  // Inicializar objetos de soma para cada categoria
  data.dados[0].mes1.forEach(categoria => {
    if (!gastosTotais[categoria.categoria]) {
      gastosTotais[categoria.categoria] = 0;
    }
    gastosTotais[categoria.categoria] += parseFloat(categoria.valor);
    gastosMes1.push({ categoria: categoria.categoria, valor: parseFloat(categoria.valor) });
  });

  data.dados[1].mes2.forEach(categoria => {
    if (!gastosTotais[categoria.categoria]) {
      gastosTotais[categoria.categoria] = 0;
    }
    gastosTotais[categoria.categoria] += parseFloat(categoria.valor);
    gastosMes2.push({ categoria: categoria.categoria, valor: parseFloat(categoria.valor) });
  });

  data.dados[2].mes3.forEach(categoria => {
    if (!gastosTotais[categoria.categoria]) {
      gastosTotais[categoria.categoria] = 0;
    }
    gastosTotais[categoria.categoria] += parseFloat(categoria.valor);
    gastosMes3.push({ categoria: categoria.categoria, valor: parseFloat(categoria.valor) });
  });

  // Preparar dados para os gráficos de pizza
  const labels = Object.keys(gastosTotais);
  const dataValores = Object.values(gastosTotais);

  // Configurar gráficos de pizza
  criarGraficoPizza('pie-chart1', labels, dataValores);

  // Configurar gráficos de linha
  criarGraficoLinha('line-chart1', 'R$', [gastosMes1, gastosMes2, gastosMes3]);
}

function criarGraficoPizza(elementId, labels, data) {
  const ctx = document.getElementById(elementId);
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'R$',
        data: data,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    }
  });
}

function criarGraficoLinha(elementId, titulo, dadosMeses) {
  const ctx = document.getElementById(elementId);

  const categorias = Array.from(new Set(dadosMeses.flat().map(item => item.categoria)));
  const cores = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'];
  const datasets = categorias.map((categoria, index) => {
    return {
      label: categoria,
      data: dadosMeses.map(mes => {
        const item = mes.find(item => item.categoria === categoria);
        return item ? item.valor : 0;
      }),
      borderColor: cores[index % cores.length],
      fill: false
    };
  });

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mês 1', 'Mês 2', 'Mês 3'],
      datasets: datasets
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: titulo
        }
      }
    }
  });
}

//TESTES
window.onload = carregarDados;
