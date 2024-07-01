//Autor: Gabriel Mayer
async function carregarDados() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    alert('Token não encontrado, por favor faça login novamente.');
    return;
  }

  const response = await fetch('http://localhost:3000/dadosUsuario', {
    method: 'GET',
    headers: {
      contentType: 'application/json',
      'Authorization': token
    }
  });

  const data = await response.json();
  if(!data.success){
    alert('Erro ao carregar dados: ' + data.message);
    return;
  }
  const dados = data.dados;

  // Levantando o último mês registrado
  const ultimosMes = dados[dados.length - 1];
  const mesKey = Object.keys(ultimosMes)[0];
  const meses = ultimosMes[mesKey];

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
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)'
        ],
        hoverOffset: 4
      }]
    }
  })
}

// Carregar os dados ao carregar a página
window.onload = carregarDados;
