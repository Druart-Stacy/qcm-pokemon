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