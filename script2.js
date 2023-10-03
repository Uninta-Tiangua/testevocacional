let currentQuestion = 1;
let answersCount = [];

document.getElementById('question1').style.display = 'block';

function showNextQuestion() {
    const selectedOption = document.querySelector(`#question${currentQuestion} input[name=q${currentQuestion}]:checked`);

    if (selectedOption) {
        const answerValue = parseInt(selectedOption.value);
        if (!answersCount[currentQuestion - 1]) {
            answersCount[currentQuestion - 1] = [0, 0, 0, 0];
        }
        answersCount[currentQuestion - 1][answerValue - 1]++;
    }

    const currentQuestionDiv = document.getElementById(`question${currentQuestion}`);
    if (currentQuestionDiv) {
        document.querySelector(`#question${currentQuestion - 1} button`).style.display = 'none';
        currentQuestionDiv.style.display = 'block';
        window.scrollBy(0, currentQuestionDiv.getBoundingClientRect().top - 100);
        currentQuestion++;
    } else {
        calculateResult();
    }
}

const nextButtons = document.querySelectorAll('.question button');
nextButtons.forEach(button => {
    button.addEventListener('click', showNextQuestion);
});

function calculateResult() {
    const resultElement = document.getElementById('result');
    resultElement.style.display = 'block';

    let result = '';

    answersCount.forEach((questionOptions, index) => {
        result += `Pergunta ${index + 1}:\n`;

        const totalAnswers = questionOptions.reduce((total, count) => total + count, 0);
        questionOptions.forEach((count, optionIndex) => {
            const percentage = ((count / totalAnswers) * 100).toFixed(2);
            result += `Opção ${optionIndex + 1}: ${percentage}%\n`;
        });

        result += '\n';
    });

    document.getElementById('vocational-result').innerText = result;
}

    document.getElementById('vocational-result').innerText = result;

    const resultLabels = sortedResults.map(item => item.area);
    const resultPercentages = sortedResults.map(item => parseFloat(item.percentage));

    const chartData = {
        labels: resultLabels,
        datasets: [{
            label: 'Porcentagem',
            data: resultPercentages,
            backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(255, 206, 86, 0.5)'],
            borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1
        }]
    };

    const chartConfig = {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    };

    const resultElement = document.getElementById('result');
    resultElement.style.display = 'block';

    const canvas = document.getElementById('resultChart');
    const ctx = canvas.getContext('2d');
    new Chart(ctx, chartConfig);
}
