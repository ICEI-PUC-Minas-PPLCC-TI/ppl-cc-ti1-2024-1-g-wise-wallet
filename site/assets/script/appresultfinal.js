//RECEBENDO OS DADOS DO JSON SERVER
let gastosTotais = {};
let gastosmeses = [];

// Função para buscar o ID do usuário logado

function getUserIdFromToken(token){
  const payLoadBase64 = token.split('.')[1];
  const decodedpayLoad = atob(payLoadBase64);
  const payLoad = JSON.parse(decodedpayLoad);
  return payLoad.id;
}

async function carregarDados() {
  const token = localStorage.getItem('authToken');
  const userId = getUserIdFromToken(token);

  const response = await fetch("/site/assets/db/db.json");
  const data = await response.json();
  const user = data.usuarios.find(user => user.id === userId);

  if(user){
    for(i = 0; i < 3; i++){
      const mesData = user.dados.find(d => d[`mes${i + 1}`])?.[`mes${i + 1}`];
      if(mesData){
        mesData.forEach(categoria =>{
          if(!gastosTotais[categoria.categoria]){
            gastosTotais[categoria.categoria] = 0;
          }
          gastosTotais[categoria.categoria] += parseFloat(categoria.valor);
        });
        gastosmeses.push(mesData.map(categoria => ({
          categoria: categoria.categoria,
          valor: parseFloat(categoria.valor)
        })));
      }
      else{
        console.warn(`Dados do mês ${i + 1} não encontrados para o usuário`)
      }
    }

    if(gastosmeses.length >= 3){
      //Preparar dados para o gráfico de pizza
      const labels = Object.keys(gastosTotais);
      const dataValores = Object.values(gastosTotais);

      //Configurar gráfico de pizza
      criarGraficoPizza('pie-chart1', labels, dataValores);

      //Configurar gráfico de linha
      criarGraficoLinha('line-chart1', 'R$', gastosmeses);
    }
    else{
      alert('Não há dados suficientes para gerar o gráfico');
    }
  } 
  else{
    alert('Usuário não encontrado');
  }
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
