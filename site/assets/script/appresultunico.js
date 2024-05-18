//CONFIGURANDO GRÁFICOS PARA RECEBER OS DADOS JSON DA PRÓXIMA SPRINT
const ctx = document.getElementById('pie-chart1');

new Chart(ctx, {
  type: 'pie',
  data: {
    labels: [
      'Gasto A',
      'Gasto B',
      'Gasto C'
    ],
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
    labels: [
      'Gasto A',
      'Gasto B',
      'Gasto C'
    ],
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






