//const { MongoClient, ObjectId } = require('mongodb');
//import {MongoClient, ObjectId} from mongodb

//const uri = "mongodb+srv://azulichis:Apb_9205@cluster0.ysrzdoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Reemplaza esto con tu cadena de conexión

//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Función para seleccionar una pregunta

//const userSchema = require("js/src/user")
function selectQuestion(questions, currentDifficulty) {
  const candidates = questions.filter(q => q.difficulty === currentDifficulty);
  return candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)] : null;
}
// Función para manejar la respuesta del usuario
function submitAnswer(idx) {
  answerPromiseResolver(idx); // Resolver la promesa con el índice del botón que se ha clicado
}

// Promesa para esperar la selección del usuario
let answerPromiseResolver;
let answerPromise;
let totalPointsEstiloAprendizaje = 0;
let datosUsuario = [];
async function generateForm(questions) {

  for (let x = 0; x < 4; x++) {
    let currentDifficulty = 3;
    let history = 0;  // Historial de preguntas por nivel
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
      history += currentDifficulty
      // Modificar la dificultad basada en el puntaje de la respuesta
      if (selectedAnswer.points === 2 && x < 3) {
        currentDifficulty = Math.min(5, currentDifficulty + 1); // Incrementar la dificultad hasta un máximo de 5
      } else if (selectedAnswer.points === 0 && x < 3) {
        if (currentDifficulty !== 1) { // No se puede restar más allá de 1
          currentDifficulty -= 1;
        }
      } else if (x == 3) {
        totalPointsEstiloAprendizaje += selectedAnswer.points
        console.log(totalPointsEstiloAprendizaje)
      }

      console.log(`Puntaje actual: ${currentDifficulty}\n`);
    }


    if (x == 3) {
      console.log("hola")
      determinarEstiloAprendizaje(totalPointsEstiloAprendizaje)
    } else {
      datosUsuario.push(history / 10)


    }
    console.log(datosUsuario)
  }
}




// Función para cargar el archivo JSON
async function loadQuestions() {
  const response = await fetch('../dictionary_quizz.json');
  const questions = await response.json();
  const questionsArray = Object.values(questions);

  return (questionsArray)
}
async function determinarEstiloAprendizaje(totalPoints) {
  let estiloAprendizaje = "";

  if (totalPoints >= 20 && totalPoints <= 27) {
    estiloAprendizaje = "Visual";
  } else if (totalPoints > 25 && totalPoints <= 30) {
    estiloAprendizaje = "Kinestésico";
  } else if (totalPoints > 27 && totalPoints <= 35) {
    estiloAprendizaje = "Auditivo";
  } else {
    estiloAprendizaje = "Otro estilo";
  }
  datosUsuario.push(estiloAprendizaje)

  let url = "http://localhost:9000/users"
  let data = JSON.stringify(datosUsuario)
  console.log("eeee")
  console.log(data)
 // const body ={data}
  //console.log()
  
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body:JSON.stringify({data:datosUsuario}),
  });
  console.log("data:", data);
}

// Recuperar los datos almacenados del formulario desde el almacenamiento local del navegador
var nombre = localStorage.getItem('nombre');
var correo = localStorage.getItem('correo');
var contraseña = localStorage.getItem('contraseña');

datosUsuario.push(nombre, correo, contraseña)

// Función principal
async function main() {
  const questions = await loadQuestions();
  await generateForm(questions);
  // Aquí deberías cargar tu modelo de TensorFlow.js
  // Suponiendo que el modelo ya está cargado en `model`

}

// Llamar a la función principal
main();
