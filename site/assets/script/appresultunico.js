
const ctx = document.getElementById('pie-chart1');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


/*new Chart(document.getElementById('pie-chart1'), {
    type: 'pie',
    data: {
        labels : ["HTML", "CSS", "JAVASCRIPT", "PHP", "PYTHON"],
        datasets: [{
            backgroundColor : ["#e63946", "#254BDD",
            "#ffbe0b", "#1d3557", "#326998"],
            data: [418, 263, 464,586, 332]
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Pie chart for result'
        },
        responsive: true
    }
});

new Chart(document.getElementById('pie-chart1'), {
    type: 'pie',
    data: {
        labels : ["HTML", "CSS", "JAVASCRIPT", "PHP", "PYTHON"],
        datasets: [{
            backgroundColor : ["#e63946", "#254BDD",
            "#ffbe0b", "#1d3557", "#326998"],
            data: [418, 263, 464,586, 332]
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Pie chart for result'
        },
        responsive: true
    }
});*/