//RECEBENDO OS DADOS DO JSON SERVER
let gastosTotaisFix = {};
let gastosTotaisVar = {};
let gastosMes1Fix = [];
let gastosMes2Fix = [];
let gastosMes3Fix = [];
let gastosMes1Var = [];
let gastosMes2Var = [];
let gastosMes3Var = [];

async function carregarDados() {
  const response = await fetch("/site/assets/db/dbmayer.json");
  const data = await response.json();

  // Inicializar objetos de soma para cada categoria
  data.mes1.gastosFix.forEach(categoria => {
    if (!gastosTotaisFix[categoria.categoria]) {
      gastosTotaisFix[categoria.categoria] = 0;
    }
    gastosTotaisFix[categoria.categoria] += parseFloat(categoria.valor);
    gastosMes1Fix.push({ categoria: categoria.categoria, valor: parseFloat(categoria.valor) });
  });

  data.mes2.gastosFix.forEach(categoria => {
    if (!gastosTotaisFix[categoria.categoria]) {
      gastosTotaisFix[categoria.categoria] = 0;
    }
    gastosTotaisFix[categoria.categoria] += parseFloat(categoria.valor);
    gastosMes2Fix.push({ categoria: categoria.categoria, valor: parseFloat(categoria.valor) });
  });

  data.mes3.gastosFix.forEach(categoria => {
    if (!gastosTotaisFix[categoria.categoria]) {
      gastosTotaisFix[categoria.categoria] = 0;
    }
    gastosTotaisFix[categoria.categoria] += parseFloat(categoria.valor);
    gastosMes3Fix.push({ categoria: categoria.categoria, valor: parseFloat(categoria.valor) });
  });

  data.mes1.gastosVar.forEach(categoria => {
    if (!gastosTotaisVar[categoria.categoria]) {
      gastosTotaisVar[categoria.categoria] = 0;
    }
    gastosTotaisVar[categoria.categoria] += parseFloat(categoria.valor);
    gastosMes1Var.push({ categoria: categoria.categoria, valor: parseFloat(categoria.valor) });
  });

  data.mes2.gastosVar.forEach(categoria => {
    if (!gastosTotaisVar[categoria.categoria]) {
      gastosTotaisVar[categoria.categoria] = 0;
    }
    gastosTotaisVar[categoria.categoria] += parseFloat(categoria.valor);
    gastosMes2Var.push({ categoria: categoria.categoria, valor: parseFloat(categoria.valor) });
  });

  data.mes3.gastosVar.forEach(categoria => {
    if (!gastosTotaisVar[categoria.categoria]) {
      gastosTotaisVar[categoria.categoria] = 0;
    }
    gastosTotaisVar[categoria.categoria] += parseFloat(categoria.valor);
    gastosMes3Var.push({ categoria: categoria.categoria, valor: parseFloat(categoria.valor) });
  });

  // Preparar dados para os gráficos de pizza
  const labelsFix = Object.keys(gastosTotaisFix);
  const dataFix = Object.values(gastosTotaisFix);

  const labelsVar = Object.keys(gastosTotaisVar);
  const dataVar = Object.values(gastosTotaisVar);

  // Configurar gráficos de pizza
  criarGraficoPizza('pie-chart1', labelsFix, dataFix);
  criarGraficoPizza('pie-chart2', labelsVar, dataVar);

  // Configurar gráficos de linha
  criarGraficoLinha('line-chart1', 'R$', [gastosMes1Fix, gastosMes2Fix, gastosMes3Fix]);
  criarGraficoLinha('line-chart2', 'R$', [gastosMes1Var, gastosMes2Var, gastosMes3Var]);
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
        borderColor: cores[index],
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
