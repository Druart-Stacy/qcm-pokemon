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
