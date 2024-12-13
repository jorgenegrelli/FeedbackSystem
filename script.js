document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    const stars = document.querySelectorAll('.star');
    let selectedStars = 0;

    // Verifica se as estrelas estão sendo selecionadas corretamente
    console.log(stars);  // Deve exibir as estrelas no console

    // Gerenciamento de Estrelas
    stars.forEach(star => {
        star.addEventListener('mouseover', handleMouseOver);
        star.addEventListener('mouseout', handleMouseOut);
        star.addEventListener('click', handleClick);
    });

    function handleMouseOver(event) {
        const starValue = event.target.getAttribute('data-value');
        console.log('Mouse over star: ' + starValue);  // Adiciona log
        highlightStars(starValue);
    }

    function handleMouseOut() {
        console.log('Mouse out');  // Adiciona log
        highlightStars(selectedStars);
    }

    function handleClick(event) {
        const starValue = event.target.getAttribute('data-value');
        selectedStars = starValue;
        console.log('Clicked star: ' + starValue);  // Adiciona log
        setSelected(starValue);
    }

    function highlightStars(starValue) {
        stars.forEach(star => {
            if (star.getAttribute('data-value') <= starValue) {
                star.classList.add('highlight');
            } else {
                star.classList.remove('highlight');
            }
        });
    }

    function setSelected(starValue) {
        stars.forEach(star => {
            if (star.getAttribute('data-value') <= starValue) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }

    // Enviar Feedback e salvar no localStorage
    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const sector = document.getElementById('sector').value;
        const comments = document.getElementById('comments').value;
        const feedback = {
            sector: sector,
            rating: selectedStars,
            comments: comments,
            timestamp: new Date().toLocaleString()  // Data atual formatada
        };

        // Salvar o feedback no localStorage
        saveFeedback(feedback);

        // Mostrar a mensagem de agradecimento
        document.getElementById('thankYouMessage').style.display = 'block';

        // Limpar o formulário
        feedbackForm.reset();
        selectedStars = 0;
        highlightStars(selectedStars);

        // Esconder a mensagem de agradecimento após 3 segundos
        setTimeout(function() {
            document.getElementById('thankYouMessage').style.display = 'none';
        }, 3000);
    });

    // Função para salvar o feedback no localStorage
    function saveFeedback(feedback) {
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        feedbacks.push(feedback);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    }

    // Função de logout
    function logout() {
        window.location.href = "login.html";  // Redireciona para a página de login
    }

    // Vincula a função de logout ao botão
    const logoutButton = document.querySelector('button[onclick="logout()"]');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});
