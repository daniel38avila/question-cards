 // Lista de preguntas para el juego
 const questions = [
  "¿Cuál es tu recuerdo favorito que compartimos juntos?",
  "¿Qué es lo que más admiras de mí?",
  "¿Cuál fue tu primera impresión cuando me conociste?",
  "¿Cuál crees que ha sido nuestro mejor momento como pareja?",
  "Si pudieras cambiar algo de nuestra relación, ¿qué sería?",
  "¿Qué es lo que te hace sentir más amado/a?",
  "¿Cuál ha sido el regalo más significativo que te he dado?",
  "¿Cuál es tu fantasía que te gustaría cumplir conmigo?",
  "¿Qué es lo que más te gusta de mi forma de ser?",
  "¿Cuál es tu mayor miedo en nuestra relación?",
  "¿Qué actividad disfrutas más hacer conmigo?",
  "¿Cómo te imaginas que seremos como pareja en 10 años?",
  "¿Qué canción te recuerda a nosotros y por qué?",
  "¿Cuál fue el momento en que supiste que estabas enamorado/a de mí?",
  "¿Qué te gustaría que hiciéramos más a menudo juntos?",
  "¿Cuál es tu mayor sueño que quisieras cumplir conmigo?",
  "¿Qué es lo que más te molesta de mí?",
  "¿Cuál es tu lugar favorito para estar conmigo?",
  "¿Qué película o serie te recuerda a nuestra historia de amor?",
  "¿En qué momento te sientes más conectado/a conmigo?",
  "¿Qué cambio positivo he provocado en tu vida?",
  "¿Qué valoras más en nuestra comunicación como pareja?",
  "¿Cuál es tu posición favorita para dormir conmigo?",
  "¿Qué cualidad mía te enamoró primero?",
  "¿Hay algo que quieras decirme pero que no te has atrevido?",
  "¿Qué te hace sentir seguro/a en nuestra relación?",
  "¿Cómo podría apoyarte mejor en tus metas y sueños?",
  "¿Cuál es tu forma favorita de recibir afecto?",
  "¿Qué tradiciones te gustaría que creáramos juntos?",
  "¿Qué es lo que más extrañas cuando no estamos juntos?"
];

// Variables del juego
let currentQuestionIndex = 0;
let timerInterval;
let timeLeft = 30;
let isGameRunning = false;

// Elementos del DOM
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('resetBtn');
const timerElement = document.getElementById('timer');
const questionText = document.getElementById('questionText');
const questionNumber = document.getElementById('questionNumber');
const card = document.getElementById('card');
const timePerQuestionInput = document.getElementById('timePerQuestion');

// Función para iniciar el juego
function startGame() {
  isGameRunning = true;
  currentQuestionIndex = 0;
  timeLeft = parseInt(timePerQuestionInput.value);
  timerElement.textContent = timeLeft;
  
  // Mostrar la primera pregunta
  showQuestion(currentQuestionIndex);
  card.classList.add('flipped');
  
  // Iniciar el temporizador
  startTimer();
  
  // Actualizar los botones
  startBtn.disabled = true;
  nextBtn.disabled = false;
}

// Función para mostrar una pregunta
function showQuestion(index) {
  questionText.textContent = questions[index];
  questionNumber.textContent = `${index + 1}/${questions.length}`;
}

// Función para pasar a la siguiente pregunta
function nextQuestion() {
  // Detener el temporizador actual
  clearInterval(timerInterval);
  
  // Avanzar a la siguiente pregunta
  currentQuestionIndex++;
  
  // Verificar si hemos llegado al final de las preguntas
  if (currentQuestionIndex >= questions.length) {
      endGame();
      return;
  }
  
  // Mostrar la siguiente pregunta
  showQuestion(currentQuestionIndex);
  
  // Reiniciar el temporizador
  timeLeft = parseInt(timePerQuestionInput.value);
  timerElement.textContent = timeLeft;
  startTimer();
}

// Función para iniciar el temporizador
function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;
      
      if (timeLeft <= 0) {
          clearInterval(timerInterval);
          timerElement.textContent = "¡Tiempo!";
      }
  }, 1000);
}

// Función para finalizar el juego
function endGame() {
  isGameRunning = false;
  clearInterval(timerInterval);
  
  questionText.textContent = "¡Juego terminado! ¿Quieres jugar de nuevo?";
  
  startBtn.disabled = false;
  nextBtn.disabled = true;
  
  // Voltear la tarjeta para mostrar el mensaje final
  card.classList.add('flipped');
}

// Función para reiniciar el juego
function resetGame() {
  isGameRunning = false;
  clearInterval(timerInterval);
  
  // Reiniciar variables
  currentQuestionIndex = 0;
  timeLeft = parseInt(timePerQuestionInput.value);
  timerElement.textContent = timeLeft;
  
  // Voltear la tarjeta de vuelta al frente
  card.classList.remove('flipped');
  
  // Actualizar botones
  startBtn.disabled = false;
  nextBtn.disabled = true;
}

// Event listeners
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', nextQuestion);
resetBtn.addEventListener('click', resetGame);

// Event listener para cambiar el tiempo por pregunta
timePerQuestionInput.addEventListener('change', function() {
  // Asegurarnos de que el valor es un número entre 5 y 120
  let value = parseInt(this.value);
  if (isNaN(value) || value < 5) {
      value = 5;
  } else if (value > 120) {
      value = 120;
  }
  this.value = value;
  
  // Si el juego no está en marcha, actualizar el tiempo mostrado
  if (!isGameRunning) {
      timeLeft = value;
      timerElement.textContent = timeLeft;
  }
});