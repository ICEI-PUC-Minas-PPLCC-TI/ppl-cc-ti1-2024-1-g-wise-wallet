//RECEBENDO OS DADOS DO JSON SERVER
let gastosjsFix = []
let gastosjsVar = []
let valorjsFix = []
let valorjsVar = []
async function carregarDados() {
  const response = await fetch("/site/assets/db/dbmayer.json")
  const data = await response.json()
  console.log(data)
  data.mes1.gastosFix.forEach(categoria => gastosjsFix.push(categoria.categoria))
  data.mes1.gastosVar.forEach(categoria => gastosjsVar.push(categoria.categoria))

  data.mes1.gastosFix.forEach(valor => valorjsFix.push(valor.valor))
  data.mes1.gastosVar.forEach(valor => valorjsVar.push(valor.valor))
  
  //CONFIGURANDO GRÁFICOS PARA RECEBER OS DADOS JSON DA PRÓXIMA SPRINT
  const ctx = document.getElementById('pie-chart1');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: gastosjsFix,
      datasets: [{
        label: 'R$',
        data: valorjsFix,
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
      labels: gastosjsFix,
      datasets: [{
        label: 'R$',
        data: valorjsVar,
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
