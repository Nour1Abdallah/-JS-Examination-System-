class Quiz {
    constructor(questions) {
        this.questions = questions; // بحفظ الاسئله جوه الكلاس 
        this.currentQuestion = 0;
        this.score = 0;
        this.timer = null;
        this.examContainer = document.getElementById("exam-container"); // ال div اللي فيه الاسئله 
        this.timerElement = document.getElementById("timer");
        this.nextButton = document.getElementById("next-btn");
        
        this.nextButton.addEventListener("click", () => this.nextQuestion());
        this.loadQuestion();
    }

    loadQuestion() {
        let question = this.questions[this.currentQuestion];
        this.timerElement.style.color = "red";
        
        this.examContainer.innerHTML = `                                                                             
                   <h2>${question.title}</h2>                
            <img src="${question.image}" alt="Question Image" class="question-img">                                               
            ${question.answers.map(answer => 
                `<button class="answer-btn" onclick="quiz.selectAnswer(this, '${answer}')">${answer}</button>`
            ).join("")}
        `;
        
        this.nextButton.disabled = true;
        this.startTimer();
    }

    startTimer() {
        let timeLeft = 10;
        this.timerElement.textContent = `Time Left: ${timeLeft}s`;

        clearInterval(this.timer);
        this.timer = setInterval(() => {
            timeLeft--;
            this.timerElement.textContent = `Time Left: ${timeLeft}s`;
            
            if (timeLeft === 0) {
                clearInterval(this.timer);
                this.nextQuestion();
            }
        }, 1000);
    }

    selectAnswer(button, answer) {
        let correctAnswer = this.questions[this.currentQuestion].correct;
        document.querySelectorAll(".answer-btn").forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = "0.6";
            btn.style.backgroundColor = "green"; // اللون أخضر دائمًا سواء صح أو خطأ
        });

        if (answer === correctAnswer) {
            this.score++;
        }
        this.nextButton.disabled = false;
        clearInterval(this.timer);
    }

    nextQuestion() {
        this.currentQuestion++;
        if (this.currentQuestion < this.questions.length) {
            this.loadQuestion();
        } else {
            this.nextButton.style.display = "none";
            this.showResult();
        }
    }

    showResult() {
        let percentage = (this.score / this.questions.length) * 100;
        let resultImage = percentage >= 50 ? "./img/sucss.jpeg" : "1.jpeg";
        let resultMessage = percentage >= 50 ? "والله وعملوها الرجاله" : "ابقو ذاكروا الاول متقرفوناش";
    
        // Hide the timer element
        this.timerElement.style.display = "none"; 
    
        let circleRadius = 50;
        let circumference = 2 * Math.PI * circleRadius;
        let progress = circumference * (1 - percentage / 100);
    
        this.examContainer.innerHTML = `
            <img src="${resultImage}" alt="Result Image" class="result-img">
            <h2 style="font-size: 24px;">Your Score: ${percentage.toFixed(2)}%</h2>
            <div class="progress-container">
                <svg width="140" height="140" viewBox="0 0 120 120">
                    <circle class="progress-background" cx="60" cy="60" r="${circleRadius}" stroke-width="10"></circle>
                    <circle class="progress-circle" cx="60" cy="60" r="${circleRadius}" stroke-width="10"
                        stroke-dasharray="${circumference}" stroke-dashoffset="${progress}"></circle>
                    <text x="60" y="60" text-anchor="middle" font-size="20px" fill="#333"
                        transform="rotate(90, 60, 60)">${percentage.toFixed(1)}%</text>
                </svg>
            </div>
            <p style="font-size: 24px;">${resultMessage}</p>
        `;
    }
    
    
    
}

const questions = [
    { title: "What is the name of this dish?", image: "./img/pizza_image.jpg", answers: ["Pizza", "Burger", "Pasta"], correct: "Pizza" },
    { title: "Which country is famous for this sushi?", image: "./img/sushi_image.jpg", answers: ["Japan", "China", "Korea"], correct: "Japan" },
    { title: "What type of dessert is this?", image: "./img/cake_image.jpg", answers: ["Brownie", "Cake", "Donut"], correct: "Cake" },
    { title: "Which fast food item is shown here?", image: "./img/burger_image.jpg", answers: ["Burger", "Hotdog", "Sandwich"], correct: "Burger" },
    { title: "What is this healthy food called?", image: "./img/salad_image.jpg", answers: ["Salad", "Soup", "Rice"], correct: "Salad" },
    { title: "Which drink is shown in the image?", image: "./img/coffee_image.jpg", answers: ["Tea", "Coffee", "Juice"], correct: "Coffee" }
];

const quiz = new Quiz(questions);