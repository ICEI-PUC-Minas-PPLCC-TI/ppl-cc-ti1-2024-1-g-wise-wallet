document.addEventListener("DOMContentLoaded", function() {
    fetch("/site/assets/db/faqs.json")
        .then(response => response.json())
        .then(data => {
            const faqContainer = document.getElementById("faq-container");
            data.faqs.forEach(faq => {
                const faqItem = document.createElement("details");
                faqItem.classList.add("faq-item");

                const faqQuestion = document.createElement("summary");
                faqQuestion.classList.add("faq-question");
                faqQuestion.textContent = faq.question;

                const faqAnswer = document.createElement("p");
                faqAnswer.classList.add("faq-answer");
                faqAnswer.textContent = faq.answer;

                faqItem.appendChild(faqQuestion);
                faqItem.appendChild(faqAnswer);
                faqContainer.appendChild(faqItem);
            });
        })
        .catch(error => console.error('Error loading the FAQ data:', error));
});
