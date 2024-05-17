// Función para seleccionar una pregunta
function selectQuestion(questions, currentDifficulty) {
  console.log(currentDifficulty)
  const candidates = questions.filter(q => q.difficulty === currentDifficulty);
  console.log(candidates)
  return candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)] : null;
}
// Función para manejar la respuesta del usuario
function submitAnswer(idx) {
  answerPromiseResolver(idx); // Resolver la promesa con el índice del botón que se ha clicado
}

// Promesa para esperar la selección del usuario
let answerPromiseResolver;
let answerPromise;

async function generateForm(questions) {

for(let x=0;x<3;x++){
  let currentDifficulty = 3;
  const history = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};  // Historial de preguntas por nivel
  for (let i = 0; i < 10; i++) {  // Suponiendo 10 preguntas en el formulario
    // Seleccionar la pregunta
    const question = selectQuestion(questions[x], currentDifficulty);

    // Mostrar la pregunta y respuestas
    const questionTitle = document.getElementById("question-title");
    const questionText = document.getElementById("question-text");
    questionTitle.innerText = `Pregunta ${i + 1} (Dificultad ${currentDifficulty}):`;
    questionText.innerText = question.text;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = ""; // Limpiar las respuestas anteriores

        // Reiniciar la promesa para esperar la selección del usuario
        answerPromiseResolver = null;
        answerPromise = new Promise(resolve => {
          answerPromiseResolver = resolve;
        });
    
    // Crear una promesa que se resolverá cuando se haga clic en un botón de respuesta

      question.answers.forEach((answer, idx) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="card-header" role="tab" id="heading${idx + 1}">
                <button class="panel-title collapsed" onclick="submitAnswer(${idx})" aria-expanded="false">
                    <h6 class="panel-title-edit mbr-semibold mbr-fonts-style mb-0 display-5">${answer.text}</h6>
                </button>
            </div>
        `;
        answersContainer.appendChild(card);
      });
    ;

    // Esperar a que se resuelva la promesa antes de continuar con la siguiente iteración
    const userChoice = await answerPromise;
    const selectedAnswer = question.answers[userChoice];

    // Actualizar el historial
    history[currentDifficulty] += 1;

    // Modificar la dificultad basada en el puntaje de la respuesta
    if (selectedAnswer.points === 2) {
      currentDifficulty = Math.min(5, currentDifficulty + 1); // Incrementar la dificultad hasta un máximo de 5
    } else if (selectedAnswer.points === 0) {
      if (currentDifficulty !== 1) { // No se puede restar más allá de 1
        currentDifficulty -= 1;
      }
    }
    
    console.log(`Puntaje actual: ${currentDifficulty}\n`);
  }}

  // Determinar el nivel del usuario
  const userLevel = Object.keys(history).reduce((a, b) => history[a] > history[b] ? a : b);
  console.log(`Nivel final del usuario: ${userLevel}`);
  return history;
}

// Función para cargar el archivo JSON
async function loadQuestions() {
  const response = await fetch('../dictionary_quizz.json');
  const questions = await response.json();
  const questionsArray = Object.values(questions);
  
  return(questionsArray)
}

// Función principal
async function main() {
  const questions = await loadQuestions();
  await generateForm(questions);
  // Aquí deberías cargar tu modelo de TensorFlow.js
  // Suponiendo que el modelo ya está cargado en `model`
  
}

// Llamar a la función principal
main();
