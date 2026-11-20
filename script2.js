const canvas = document.getElementById("reseau");
const ctx = canvas.getContext("2d");

let largeur;
let hauteur;
let points = [];

const distanceMax = 150;
const nombrePoints = 90;

// Adapter le Canvas à l'écran
function redimensionner() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    largeur = window.innerWidth;
    hauteur = window.innerHeight;

    canvas.width = largeur * ratio;
    canvas.height = hauteur * ratio;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

// Créer les points
function creerPoints() {
    points = [];

    for (let i = 0; i < nombrePoints; i++) {
        points.push({
            x: Math.random() * largeur,
            y: Math.random() * hauteur,

            // Direction et vitesse
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,

            // Taille
            rayon: Math.random() * 3 + 1,

            // Certains points ont un cercle lumineux
            cercle: Math.random() > 0.7
        });
    }
}

// Dessiner les points et les lignes
function animer() {

    ctx.clearRect(0, 0, largeur, hauteur);

    // Déplacer les points
    points.forEach(point => {

        point.x += point.vx;
        point.y += point.vy;

        // Rebond sur les bords
        if (point.x < 0 || point.x > largeur) {
            point.vx *= -1;
        }

        if (point.y < 0 || point.y > hauteur) {
            point.vy *= -1;
        }

        // Dessiner les points
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.rayon, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(0, 240, 255, 0.8)";
        ctx.fill();

        // Dessiner les cercles autour de certains points
        if (point.cercle) {

            ctx.beginPath();
            ctx.arc(point.x, point.y, point.rayon + 5, 0, Math.PI * 2);

            ctx.strokeStyle = "rgba(0, 240, 255, 0.5)";
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
    });

    // Relier les points proches
    for (let i = 0; i < points.length; i++) {

        for (let j = i + 1; j < points.length; j++) {

            const p1 = points[i];
            const p2 = points[j];

            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < distanceMax) {

                const opacite = 1 - distance / distanceMax;

                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);

                ctx.strokeStyle = `rgba(0, 230, 255, ${opacite * 0.4})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animer);
}

// Initialisation
redimensionner();
creerPoints();
animer();

window.addEventListener("resize", () => {
    redimensionner();
    creerPoints();
});
       
// ==========================================
// 1. DONNÉES ET ÉTAT DU QUIZ
// ==========================================

let toutesLesQuestions = [];
let questions = [];
let niveauxDisponibles = [];
let niveauChoisi = null;
let questionIndex = 0;
let score = 0;
let reponseSelectionnee = false;

// Correspondance entre les niveaux du jeu et du JSON
const niveaux = {
    1: "Facile",
    2: "Normal",
    3: "Difficile",
    4: "Expert"
};

// ==========================================
// 2. ÉLÉMENTS HTML
// ==========================================

const ecranAge = document.getElementById("ecran-age");
const ecranNiveau = document.getElementById("ecran-niveau");
const ecranQuiz = document.getElementById("ecran-quiz");
const ecranResultat = document.getElementById("ecran-resultat");

const questionText = document.getElementById("questionText");
const reponsesDiv = document.getElementById("reponses");
const imageQuestion = document.getElementById("imageQuestion");
const boutonSuivant = document.getElementById("monBouton");
const message = document.getElementById("message");
const scoreElement = document.getElementById("score");
const progression = document.getElementById("progression");

// ==========================================
// 3. AFFICHER UN ÉCRAN
// ==========================================

function afficherEcran(ecranActif) {
    [ecranAge, ecranNiveau, ecranQuiz, ecranResultat]
        .forEach(ecran => ecran.classList.remove("actif"));

    ecranActif.classList.add("actif");
}

// ==========================================
// 4. CHARGER LE JSON
// ==========================================

async function chargerQuestions() {
    try {
        const response = await fetch("pokemon.json");

        if (!response.ok) {
            throw new Error("Impossible de charger pokemon.json");
        }

        const data = await response.json();

        if (!Array.isArray(data.questions)) {
            throw new Error("Le tableau questions est introuvable.");
        }

        // Garder uniquement les questions actives
        toutesLesQuestions = data.questions.filter(
            question => question.active === true
        );

        console.log("Questions chargées :", toutesLesQuestions.length);

    } catch (erreur) {
        console.error("Erreur :", erreur);

        alert("Impossible de charger pokemon.json.");
    }
}

// ==========================================
// 5. CHOISIR LE PROFIL
// ==========================================

function configurerJeu(profil) {

    if (profil === "mineur") {
        niveauxDisponibles = [1, 2];
    } else {
        niveauxDisponibles = [1, 2, 3, 4];
    }
    //ouvrir    pokédex
   

    afficherChoixNiveaux();
    afficherEcran(ecranNiveau);
}

function afficherChoixNiveaux() {

    const zone = document.getElementById("choix-niveaux");
    const texte = document.getElementById("texte-niveaux");

    zone.innerHTML = "";

    texte.textContent = "Niveaux disponibles :";

    niveauxDisponibles.forEach(niveau => {

        const bouton = document.createElement("button");

        bouton.type = "button";
        bouton.textContent = "Niveau " + niveau + " - " + niveaux[niveau];

        bouton.addEventListener("click", () => {
            demarrerNiveau(niveau);
        });

        zone.appendChild(bouton);
    });
}

// ==========================================
// 6. DÉMARRER UN NIVEAU
// ==========================================

function demarrerNiveau(niveau) {

    niveauChoisi = niveau;

    questions = toutesLesQuestions.filter(
        question => question.level === niveaux[niveau]
    );

    if (questions.length === 0) {
        alert("Aucune question disponible pour ce niveau.");
        return;
    }

    // Mélanger les questions
    questions.sort(() => Math.random() - 0.5);

    questionIndex = 0;
    score = 0;

    afficherEcran(ecranQuiz);
    afficherQuestion();
}

// ==========================================
// 7. AFFICHER UNE QUESTION
// ==========================================

function afficherQuestion() {

    if (questionIndex >= questions.length) {
        afficherResultat();
        return;
    }

    const question = questions[questionIndex];

    questionText.textContent = question.Question;

    progression.textContent =
        "Niveau " + niveauChoisi +
        " - Question " + (questionIndex + 1) +
        " / " + questions.length;

    message.textContent = "";

    reponseSelectionnee = false;
    boutonSuivant.disabled = true;

    // Image facultative
    imageQuestion.style.display = "none";
    imageQuestion.removeAttribute("src");

    reponsesDiv.innerHTML = "";

    // Lire les propositions depuis options
    question.options.forEach((reponse, index) => {

        const bouton = document.createElement("button");

        bouton.type = "button";
        bouton.className = "reponse-btn";
        bouton.textContent = reponse;

        bouton.addEventListener("click", () => {
            verifierReponse(index, question);
        });

        reponsesDiv.appendChild(bouton);
    });

    boutonSuivant.textContent =
        questionIndex === questions.length - 1
            ? "Voir le résultat"
            : "Suivant";

    scoreElement.textContent =
        "Score : " + score + " / " + questionIndex;
}

// ==========================================
// 8. VÉRIFIER LA RÉPONSE
// ==========================================

function verifierReponse(indexChoisi, question) {

    if (reponseSelectionnee) return;

    reponseSelectionnee = true;

    const boutons = reponsesDiv.querySelectorAll(".reponse-btn");

    // correct commence à 0 dans le JSON
    const bonneIndex = Number(question.correct);

    if (
        !Number.isInteger(bonneIndex) ||
        bonneIndex < 0 ||
        bonneIndex >= question.options.length
    ) {
        message.textContent = "Erreur dans la bonne réponse du JSON.";
        message.style.color = "#dc3545";

    } else if (indexChoisi === bonneIndex) {

        boutons[indexChoisi].classList.add("correct");

        score++;

        message.textContent = "Bonne réponse !";
        message.style.color = "#28a745";

    } else {

        boutons[indexChoisi].classList.add("incorrect");

        boutons[bonneIndex].classList.add("correct");

        message.textContent = "Mauvaise réponse !";
        message.style.color = "#dc3545";
    }

    // Afficher l'explication
    if (question.explanation) {
        message.textContent += " " + question.explanation;
    }

    boutons.forEach(bouton => {
        bouton.disabled = true;
    });

    boutonSuivant.disabled = false;

    scoreElement.textContent =
        "Score : " + score + " / " + (questionIndex + 1);
}

// ==========================================
// 9. QUESTION SUIVANTE
// ==========================================

boutonSuivant.addEventListener("click", () => {

    if (!reponseSelectionnee) return;

    questionIndex++;

    afficherQuestion();
});

// ==========================================
// 10. RÉSULTAT FINAL
// ==========================================

function afficherResultat() {

    document.getElementById("resultatFinal").textContent =
        "Tu as obtenu " + score +
        " bonne(s) réponse(s) sur " +
        questions.length +
        " au niveau " + niveauChoisi + ".";

    afficherEcran(ecranResultat);
}

// ==========================================
// 11. NAVIGATION
// ==========================================

function retourNiveaux() {
    afficherEcran(ecranNiveau);
}

function retourProfil() {
    afficherEcran(ecranAge);
};
// ==========================================
// ==========================================

chargerQuestions();
// ==========================================
// OUVERTURE DU POKÉDEX APRÈS 10 SECONDES
// ==========================================

setTimeout(() => {
    const pokedex = document.getElementById("pokedex");
    console.log("Ouverture du Pokédex !");
    pokedex.classList.add("ouvert");
}, 1000);