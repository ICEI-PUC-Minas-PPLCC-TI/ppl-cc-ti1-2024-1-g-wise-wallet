document.addEventListener('DOMContentLoaded', () => {
    fetch('/path/to/data.json') // Certifique-se de fornecer o caminho correto para o arquivo JSON
      .then(response => response.json())
      .then(data => {
        const situation = data.normal;
        document.getElementById('title').innerText = situation.title;

        const tipsContainer = document.getElementById('tips');
        for (let key in situation) {
          if (key.startsWith('tip')) {
            const tip = situation[key];
            const tipElement = document.createElement('div');

            const subtitle = document.createElement('h3');
            subtitle.classList.add('section-title');
            subtitle.innerText = tip.subtitle;

            const content = document.createElement('p');
            content.innerText = tip.content;

            tipElement.appendChild(subtitle);
            tipElement.appendChild(content);

            tipsContainer.appendChild(tipElement);
          }
        }
      })
      .catch(error => console.error('Erro ao carregar o JSON:', error));
  });