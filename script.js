// Variables globales
        let questions = [];
        let questionIndex = 0;
        let score = 0;
        let totalQuestions = 0;
        let reponseSelectionnee = null;

        // Éléments du DOM
        const bouton = document.getElementById('monBouton');
        const message = document.getElementById('message');
        const questionText = document.getElementById('questionText');
        const reponsesDiv = document.getElementById('reponses');
        const imageQuestion = document.getElementById('imageQuestion');
        const scoreElement = document.getElementById('score');

        // Charger le fichier JSON
        fetch("qcm.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Impossible de charger le fichier qcm.json");
                }
                return response.json();
            })
            .then(data => {
                questions = data;
                totalQuestions = data.length;
                if (totalQuestions === 0) {
                    questionText.textContent = "Aucune question disponible.";
                    bouton.disabled = true;
                    return;
                }
                afficherQuestion();
            })
            .catch(error => {
                console.error("Erreur :", error);
                questionText.textContent = "Erreur lors du chargement des questions.";
                bouton.disabled = true;
            });

        // Afficher une question
        function afficherQuestion() {
            if (questionIndex >= questions.length) {
                questionText.textContent = `Quiz terminé !`;
                message.textContent = `Votre score final : ${score} / ${totalQuestions}`;
                bouton.textContent = "Recommencer";
                bouton.disabled = false;
                reponsesDiv.innerHTML = '';
                imageQuestion.style.display = 'none';
                return;
            }

            const question = questions[questionIndex];
            questionText.textContent = question.question;
            message.textContent = '';
            reponseSelectionnee = null;

            // Afficher l'image si présente
            if (question.img) {
                imageQuestion.src = question.img;
                imageQuestion.style.display = 'block';
            } else {
                imageQuestion.style.display = 'none';
            }

            // Vider les anciennes réponses
            reponsesDiv.innerHTML = '';

            // Créer les boutons de réponse
            const reponses = [question.rep1, question.rep2, question.rep3, question.rep4];
            const bonnesReponses = Array.isArray(question.bonneReponse) 
                ? question.bonneReponse 
                : [question.bonneReponse];

            reponses.forEach((reponse, index) => {
                if (reponse) {
                    const btn = document.createElement('button');
                    btn.className = 'reponse-btn';
                    btn.textContent = reponse;
                    btn.addEventListener('click', () => verifierReponse(index, bonnesReponses, btn));
                    reponsesDiv.appendChild(btn);
                }
            });

            // Mettre à jour le bouton
            bouton.textContent = questionIndex < questions.length - 1 ? "Suivant" : "Terminer";
            bouton.disabled = true;
        }

        // Vérifier la réponse
        function verifierReponse(index, bonnesReponses, btn) {
            if (reponseSelectionnee !== null) return; // Déjà répondu
            reponseSelectionnee = index;

            const boutons = reponsesDiv.querySelectorAll('.reponse-btn');

            if (bonnesReponses.includes(index)) {
                btn.classList.add('correct');
                score++;
                message.textContent = "✅ Bonne réponse !";
                message.style.color = "#28a745";
            } else {
                btn.classList.add('incorrect');
                message.textContent = "❌ Mauvaise réponse !";
                message.style.color = "#dc3545";
                // Montrer la bonne réponse
                bonnesReponses.forEach(idx => {
                    boutons[idx].classList.add('correct');
                });
            }

            // Désactiver tous les boutons
            boutons.forEach(b => b.disabled = true);
            bouton.disabled = false;

            // Mettre à jour le score
            scoreElement.textContent = `Score : ${score} / ${questionIndex + 1}`;
        }

        // Événement click sur le bouton
        bouton.addEventListener('click', function() {
            if (questionIndex < questions.length && reponseSelectionnee !== null) {
                questionIndex++;
                afficherQuestion();
            } else if (questionIndex >= questions.length) {
                // Recommencer le quiz
                questionIndex = 0;
                score = 0;
                scoreElement.textContent = `Score : 0 / ${totalQuestions}`;
                afficherQuestion();
            }
            // 1. Charger le fichier JSON
fetch("qcm.json")
  .then(response => response.json())
  .then(data => {
    // 2. Sélectionner une question au hasard
    const question = data[Math.floor(Math.random() * data.length)];
    
    // 3. Afficher la question
    console.log(question.question);
    console.log(question.rep1);
    console.log(question.img)
  });
const bouton = document.getElementById('monBouton');
// Sélection du bouton et du paragraphe
        
        const message = document.getElementById('message');

        // Compteur de clics
        let nombreDeClics = 0;

        // Ajout de l'événement click
        bouton.addEventListener('click', function() {
            nombreDeClics++;
            message.textContent = `Vous avez cliqué ${nombreDeClics} fois !`;

            // Changement de couleur aléatoire du bouton
            const couleur = `#${Math.floor(Math.random()*16777215).toString(16)}`;
            bouton.style.backgroundColor = couleur;
        });
        //bonne repone
        reponseChoice  = Number  (reponseChoice);
        if (reponseChoice === question.BonRep) {
      console.log("corect");
        }
        else
        {
          console.log("incorect");
        }
        
      
        });