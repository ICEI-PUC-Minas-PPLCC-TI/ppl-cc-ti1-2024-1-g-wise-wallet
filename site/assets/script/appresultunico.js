// Recebendo os dados do JSON Server
let meses = [];

async function carregarDados() {
  const response = await fetch("/site/assets/db/dbmayer.json");
  const data = await response.json();
  console.log(data);

  // Carregar os dados do mês1 (pode ser ajustado conforme a necessidade)
  meses = data.dados[0].mes1;

  // Preparar os dados para o gráfico
  const categorias = meses.map(item => item.categoria);
  const valores = meses.map(item => parseFloat(item.valor));

  // Configurando o gráfico para receber os dados
  const ctx = document.getElementById('pie-chart').getContext('2d');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: categorias,
      datasets: [{
        label: 'R$',
        data: valores,
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

// Carregar os dados ao carregar a página
window.onload = carregarDados;
