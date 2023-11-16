var config = {
  "EN": {
    "questions": [
      {
        "name": "In which European city has the climate contract been signed in 2015?",
        "answers": [
          "Paris",
          "Oslo",
          "Vienna"
        ],
        "correctAnswer": "Paris"
      },
      {
        "name": "Why are Last Generation activists stopping car traffic by gluing themselves on streets?",
        "answers": [
          "Just for fun",
          "Traffic is a major driver of climate change",
          "Annoy car drivers"
        ],
        "correctAnswer": "Traffic is a major driver of climate change"
      },
      {
        "name": "How are the mountains called in western Europe?",
        "answers": [
          "Alps",
          "Chain",
          "Peaks"
        ],
        "correctAnswer": "Alps"
      },
      {
        "name": "How do we call the area of never melting ice and snow on top of mountains?",
        "answers": [
          "Sugar top",
          "Glacier",
          "Powder"
        ],
        "correctAnswer": "Glacier"
      },
      {
        "name": "Who is current United Nations Secretary General?",
        "answers": [
          "Donald Trump",
          "Kofi Annan",
          "António Guterres"
        ],
        "correctAnswer": "António Guterres"
      },
      {
        "name": "Which of these is a theory about the creation of the universe?",
        "answers": [
          "Galactic nebula",
          "Big Bang",
          "Starwars"
        ],
        "correctAnswer": "Big Bang"
      },
      {
        "name": "Who was anti-apartheid activist, peace nobel prize winner and former president of South Africa?",
        "answers": [
          "Mahatma Gandhi",
          "Nelson Mandela",
          "Che Guevara"
        ],
        "correctAnswer": "Nelson Mandela"
      }
    ]
  },
  "DE": {
    "questions": [
      {
        "name": "In welcher europäischen Stadt wurde der Klimavertrag im Jahr 2015 unterzeichnet?",
        "answers": [
          "Paris",
          "Oslo",
          "Wien"
        ],
        "correctAnswer": "Paris"
      },
      {
        "name": "Warum halten Last Generation-Aktivisten den Autoverkehr auf, indem sie sich auf Straßen kleben?",
        "answers": [
          "nur zum Spass",
          "weil Autoverkehr ein wesentlicher Treiber des Klimawandels ist",
          "um Autofahrer zu ärgern"
        ],
        "correctAnswer": "weil Autoverkehr ein wesentlicher Treiber des Klimawandels ist"
      },
      {
        "name": "Wie heißt das höchste Gebirge in Westeuropa?",
        "answers": [
          "Alpen",
          "Kette",
          "Brownies"
        ],
        "correctAnswer": "Alpen"
      },
      {
        "name": "Wie nennt man den Bereich eines Berges, der das ganze Jahr von Schnee bedeckt ist?",
        "answers": [
          "Sugar top",
          "Gletscher",
          "Puder"
        ],
        "correctAnswer": "Gletscher"
      },
      {
        "name": "Wer ist derzeitiger Generalsekretär der Vereinten Nationen?",
        "answers": [
          "Donald Trump",
          "Kofi Annan",
          "António Guterres"
        ],
        "correctAnswer": "António Guterres"
      },
      {
        "name": "Wie heißt die Theorie über die Entstehung des Universums?",
        "answers": [
          "Galaktischer Nebel",
          "Urknall",
          "Starwars"
        ],
        "correctAnswer": "Urknall"
      },
      {
        "name": "Wer war Anti-Apartheid-Aktivist, Friedensnobelpreisträger und ehemaliger Präsident von Südafrika?",
        "answers": [
          "Mahatma Gandhi",
          "Nelson Mandela",
          "Che Guevara"
        ],
        "correctAnswer": "Nelson Mandela"
      }
    ]
  },
  "ES": {
    "questions": [
      {
        "name": "¿En qué ciudad europea se firmó el acuerdo contra el cambio climático de 2015?",
        "answers": [
          "Paris",
          "Oslo",
          "Viena"
        ],
        "correctAnswer": "Paris"
      },
      {
        "name": "¿En qué disruptiva innovación se basan las criptomonedas?",
        "answers": [
          "Bicicleta",
          "Comida vegana",
          "Blockchain"
        ],
        "correctAnswer": "Blockchain"
      },
      {
        "name": "¿Cómo se llaman las montañas de Europa Occidental?",
        "answers": [
          "Alpes",
          "Cadena",
          "Bizcocho"
        ],
        "correctAnswer": "Alpes"
      },
      {
        "name": "¿Cómo se llama el área de la cumbre de las montañas que está siempre cubierta de hielo y nieve?",
        "answers": [
          "Cobertura de azúcar",
          "Glaciar",
          "Polvo"
        ],
        "correctAnswer": "Glaciar"
      },
      {
        "name": "¿Quién es el actual Secretario General de Naciones Unidas?",
        "answers": [
          "Donald Trump",
          "Kofi Annan",
          "António Guterres"
        ],
        "correctAnswer": "António Guterres"
      },
      {
        "name": "¿Cuál es una teoría sobre la creación del universo?",
        "answers": [
          "Big Bong",
          "Big Bang",
          "Big Ben"
        ],
        "correctAnswer": "Big Bang"
      },
      {
        "name": "¿Quién fue activista contra el apartheid, ganador del premio Nobel de la Paz y ex-presidente de Sudáfrica?",
        "answers": [
          "Mahatma Gandhi",
          "Nelson Mandela",
          "Che Guevara"
        ],
        "correctAnswer": "Nelson Mandela"
      }
    ]
  }
}

var selectedQuestion;


function checkAnswer() {
  var selection = document.getElementById("selection").value;
  document.getElementById("gender").value = selection;
}



function removeOptions(selectionList) {
  for(var i = selectionList.options.length; i > 0; i--) {
    selectionList.remove(i);
  }
}

function createOptions(selectionList) {
  for (var i = 0; i < selectedQuestion.answers.length; i++) {
    var option = document.createElement("option");
    option.value = selectedQuestion.answers[i];
    option.text = selectedQuestion.answers[i];

    selectionList.appendChild(option);
  }
}
