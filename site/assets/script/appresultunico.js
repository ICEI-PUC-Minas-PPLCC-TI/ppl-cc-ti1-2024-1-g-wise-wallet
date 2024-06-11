//RECEBENDO OS DADOS DO JSON SERVER
let gastosjsFix = []
let gastosjsVar = []
async function carregarDados() {
  const response = await fetch("../db/dbmayer.json")
  const data = await response.json()
  console.log(data)
  data.gastosFix.forEach(categoria => gastosjsFix.push(categoria.categoria))
  data.gastosVar.forEach(categoria => gastosjsVar.push(categoria.categoria))
  
  //CONFIGURANDO GRÁFICOS PARA RECEBER OS DADOS JSON DA PRÓXIMA SPRINT
  const ctx = document.getElementById('pie-chart1');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: gastosjsFix,
      datasets: [{
        label: 'R$',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    }
  });


  const ctx2 = document.getElementById('pie-chart2');

  new Chart(ctx2, {
    type: 'pie',
    data: {
      labels: gastosjsVar,
      datasets: [{
        label: 'R$',
        data: [300, 50, 100],
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

//TESTES
window.onload = carregarDados;
console.log(gastosjsFix)
console.log(gastosjsVar)


//BASE DE DADOS FICTÍCIO COMO A RESPOSTA REAL NECESSITA DA "LINKAGEM DO BD DE OUTROS PARTICIPANTES