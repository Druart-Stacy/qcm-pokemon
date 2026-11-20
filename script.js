// ==========================================
/* 0. FOND ANIMÉ : RÉSEAU DE POINTS
   Cette partie reprend ton code d'origine. */
// ==========================================

const canvas = document.getElementById("reseau");
const ctx = canvas ? canvas.getContext("2d") : null;

let largeur;
let hauteur;
let points = [];

const distanceMax = 150;
const nombrePoints = 90;

function redimensionner() {
    if (!canvas || !ctx) return;

    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    largeur = window.innerWidth;
    hauteur = window.innerHeight;

    canvas.width = largeur * ratio;
    canvas.height = hauteur * ratio;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0); 
}

function creerPoints() {
    if (!canvas || !ctx) return;

    points = [];

    for (let i = 0; i < nombrePoints; i++) {
        points.push({
            x: Math.random() * largeur,
            y: Math.random() * hauteur,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            rayon: Math.random() * 3 + 1,
            cercle: Math.random() > 0.7
        });
    }
}

function animer() {
    if (!canvas || !ctx) return;

    points.forEach(point => {
        point.x += point.vx;
        point.y += point.vy;

        if (point.x < 0 || point.x > largeur) point.vx *= -1;
        if (point.y < 0 || point.y > hauteur) point.vy *= -1;

        ctx.beginPath();
        ctx.arc(point.x, point.y, point.rayon, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 240, 255, 0.8)";
        ctx.fill();

        if (point.cercle) {
            ctx.beginPath();
            ctx.arc(point.x, point.y, point.rayon + 5, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(0, 240, 255, 0.5)";
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
    });

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

if (canvas && ctx) {
    redimensionner();
    creerPoints();
    animer();

    window.addEventListener("resize", () => {
        redimensionner();
        creerPoints();
    });
}


// ==========================================
// 1. LANGUES ET TRADUCTIONS DE L'INTERFACE
// ==========================================

let langueActuelle = "fr";

const textes = {
    fr: {
        titreProfil: "Choisis ton profil",
        descriptionProfil: "Cette sélection détermine les niveaux disponibles.",
        mineur: "Moins de 18 ans",
        majeur: "18 ans ou plus",
        titreNiveau: "Choisis ton niveau",
        retour: "Retour",
        langue: "Langue",
        niveauxDisponibles: "Niveaux disponibles :",
        niveau: "Niveau",
        facile: "Facile",
        normal: "Normal",
        difficile: "Difficile",
        expert: "Expert",
        aucuneQuestion: "Aucune question disponible pour ce niveau.",
        erreurChargement: "Impossible de charger pokemon.json.",
        erreurBonneReponse: "Erreur dans la bonne réponse du JSON.",
        bonneReponse: "Bonne réponse !",
        mauvaiseReponse: "Mauvaise réponse !",
        suivant: "Suivant",
        voirResultat: "Voir le résultat",
        score: "Score",
        question: "Question",
        resultat: "Tu as obtenu",
        bonnesReponses: "bonne(s) réponse(s) sur",
        auNiveau: "au niveau",
        point: "."
    },

    en: {
        titreProfil: "Choose your profile",
        descriptionProfil: "This selection determines the available levels.",
        mineur: "Under 18",
        majeur: "18 or older",
        titreNiveau: "Choose your level",
    retour: "Back",
        langue: "Language",
        niveauxDisponibles: "Available levels:",
        niveau: "Level",
        facile: "Easy",
        normal: "Normal",
        difficile: "Hard",
        expert: "Expert",
        aucuneQuestion: "No questions are available for this level.",
        erreurChargement: "Unable to load pokemon.json.",
        erreurBonneReponse: "Error in the correct answer in the JSON file.",
        bonneReponse: "Correct answer!",
        mauvaiseReponse: "Wrong answer!",
        suivant: "Next",
        voirResultat: "See results",
        score: "Score",
        question: "Question",
        resultat: "You got",
        bonnesReponses: "correct answer(s) out of",
        auNiveau: "at level",
        point: "."
    },

    nl: {
        titreProfil: "Kies je profiel",
        descriptionProfil: "Deze keuze bepaalt welke niveaus beschikbaar zijn.",
        mineur: "Jonger dan 18",
        majeur: "18 jaar of ouder",
        titreNiveau: "Kies je niveau",
        retour: "Terug",
        langue: "Taal",
        niveauxDisponibles: "Beschikbare niveaus:",
        niveau: "Niveau",
        facile: "Makkelijk",
        normal: "Normaal",
        difficile: "Moeilijk",
        expert: "Expert",
        aucuneQuestion: "Er zijn geen vragen beschikbaar voor dit niveau.",
        erreurChargement: "Kan pokemon.json niet laden.",   
        erreurBonneReponse: "Fout in het juiste antwoord in het JSON-bestand.",
        bonneReponse: "Goed antwoord!",
        mauvaiseReponse: "Fout antwoord!",
        suivant: "Volgende",
        voirResultat: "Resultaat bekijken",
        score: "Score",
        question: "Vraag",
        resultat: "Je hebt",
        bonnesReponses: "goed(e) antwoord(en) van de",
        auNiveau: "op niveau",
        point: "."
    },

    de: {
        titreProfil: "Wähle dein Profil",
        descriptionProfil: "Diese Auswahl bestimmt die verfügbaren Schwierigkeitsstufen.",
        mineur: "Unter 18",
        majeur: "18 Jahre oder älter",
        titreNiveau: "Wähle deinen Schwierigkeitsgrad",
        retour: "Zurück",
        langue: "Sprache",
        niveauxDisponibles: "Verfügbare Schwierigkeitsstufen:",
        niveau: "Stufe",
        facile: "Einfach",
        normal: "Normal",
        difficile: "Schwierig",
        expert: "Experte",
        aucuneQuestion: "Für diese Stufe sind keine Fragen verfügbar.",
        erreurChargement: "pokemon.json konnte nicht geladen werden.",
        erreurBonneReponse: "Fehler bei der richtigen Antwort in der JSON-Datei.",
        bonneReponse: "Richtige Antwort!",
        mauvaiseReponse: "Falsche Antwort!",
        suivant: "Weiter",
        voirResultat: "Ergebnis anzeigen",
        score: "Punktzahl",
        question: "Frage",
        resultat: "Du hast",
        bonnesReponses: "richtige Antwort(en) von",
        auNiveau: "auf Stufe",
        point: "."
    }
};

function texte(cle) {
    return textes[langueActuelle][cle] || textes.fr[cle] || cle;
}

// Les valeurs du JSON restent en français : elles servent à filtrer les questions.
const niveaux = {
    1: "Facile",
    2: "Normal",
    3: "Difficile",
    4: "Expert"
};

function nomNiveau(niveau) {
    const cles = {
        1: "facile",
        2: "normal",
        3: "difficile",
        4: "expert"
    };

    return `${texte("niveau")} ${niveau} - ${texte(cles[niveau])}`;
}

// Récupérer la traduction d'une question.
// Si une traduction manque, le français est utilisé en remplacement.
function obtenirTraduction(question) {
    if (langueActuelle === "fr") {
        return {
            Question: question.Question,
            options: question.options,
            explanation: question.explanation
        };
    }

    return question.translations?.[langueActuelle] || {
        Question: question.Question,
        options: question.options,
        explanation: question.explanation
    };
}


// ==========================================
// 2. SÉLECTEUR DE LANGUE CRÉÉ EN JAVASCRIPT
// ==========================================

function creerSelecteurLangue() {
    const conteneur = document.createElement("div");

    conteneur.id = "selecteur-langue";
    conteneur.style.position = "fixed";
    conteneur.style.top = "12px";
    conteneur.style.right = "12px";
    conteneur.style.zIndex = "1000";
    conteneur.style.display = "flex";
    conteneur.style.alignItems = "center";
    conteneur.style.gap = "8px";
    conteneur.style.padding = "8px 10px";
    conteneur.style.borderRadius = "8px";
    conteneur.style.background = "rgba(0, 0, 0, 0.75)";
    conteneur.style.color = "white";

    const label = document.createElement("label");
    label.htmlFor = "choix-langue";
    label.textContent = texte("langue");

    const select = document.createElement("select");
    select.id = "choix-langue";
    select.setAttribute("aria-label", texte("langue"));

    const langues = [
        { code: "fr", nom: "🇫🇷 Français" },
        { code: "en", nom: "🇬🇧 English" },
        { code: "nl", nom: "🇳🇱 Nederlands" },
        { code: "de", nom: "🇩🇪 Deutsch" }
    ];

    langues.forEach(langue => {
        const option = document.createElement("option");
        option.value = langue.code;
        option.textContent = langue.nom;
        select.appendChild(option);
    });

    select.value = langueActuelle;

    select.addEventListener("change", () => {
        langueActuelle = select.value;
        actualiserEcran();

        label.textContent = texte("langue");
        select.setAttribute("aria-label", texte("langue"));
    });

    conteneur.appendChild(label);
    conteneur.appendChild(select);
    document.body.appendChild(conteneur);
}


// ==========================================
// 3. DONNÉES ET ÉTAT DU QUIZ
// ==========================================

let toutesLesQuestions = [];
let questions = [];
let niveauxDisponibles = [];
let niveauChoisi = null;
let questionIndex = 0;
let score = 0;
let reponseSelectionnee = false;
let indexReponseSelectionnee = null;


// ==========================================
// 4. ÉLÉMENTS HTML
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
// 5. AFFICHER UN ÉCRAN
// ==========================================

function afficherEcran(ecranActif) {
    [ecranAge, ecranNiveau, ecranQuiz, ecranResultat]
        .filter(Boolean)
        .forEach(ecran => ecran.classList.remove("actif"));

    if (ecranActif) {
        ecranActif.classList.add("actif");
    }
}


// ==========================================
// 6. CHARGER LE JSON
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

        toutesLesQuestions = data.questions.filter(
            question => question.active === true
        );

        console.log("Questions chargées :", toutesLesQuestions.length);

    } catch (erreur) {
        console.error("Erreur :", erreur);
        alert(texte("erreurChargement"));
    }
}


// ==========================================
// 7. CHOISIR LE PROFIL
// ==========================================

function configurerJeu(profil) {

    if (profil === "mineur") {
        niveauxDisponibles = [1, 2];
    } else {
        niveauxDisponibles = [1, 2, 3, 4];
    }

    afficherChoixNiveaux();
    afficherEcran(ecranNiveau);
}

function afficherChoixNiveaux() {

    const zone = document.getElementById("choix-niveaux");
    const texteNiveaux = document.getElementById("texte-niveaux");

    if (!zone || !texteNiveaux) return;

    zone.innerHTML = "";
    texteNiveaux.textContent = texte("niveauxDisponibles");

    niveauxDisponibles.forEach(niveau => {

        const bouton = document.createElement("button");

        bouton.type = "button";
        bouton.textContent = nomNiveau(niveau);

        bouton.addEventListener("click", () => {
            demarrerNiveau(niveau);
        });

        zone.appendChild(bouton);
    });
}


// ==========================================
// 8. DÉMARRER UN NIVEAU
// ==========================================

function demarrerNiveau(niveau) {

    niveauChoisi = niveau;

    questions = toutesLesQuestions.filter(
        question => question.level === niveaux[niveau]
    );

    if (questions.length === 0) {
        alert(texte("aucuneQuestion"));
        return;
    }

    // Mélanger les questions
    questions.sort(() => Math.random() - 0.5);

    questionIndex = 0;
    score = 0;
    reponseSelectionnee = false;
    indexReponseSelectionnee = null;

    afficherEcran(ecranQuiz);
    afficherQuestion();
}


// ==========================================
// 9. AFFICHER UNE QUESTION
// ==========================================

function afficherQuestion(conserverEtat = false) {

    if (questionIndex >= questions.length) {
        afficherResultat();
        return;
    }

    const question = questions[questionIndex];
    const traduction = obtenirTraduction(question);

    questionText.textContent = traduction.Question;

    progression.textContent =
        `${nomNiveau(niveauChoisi)} - ${texte("question")} ` +
        `${questionIndex + 1} / ${questions.length}`;

    message.textContent = "";

    if (!conserverEtat) {
        reponseSelectionnee = false;
        indexReponseSelectionnee = null;
    }

    boutonSuivant.disabled = !reponseSelectionnee;

    // Image facultative
    imageQuestion.style.display = "none";
    imageQuestion.removeAttribute("src");

    reponsesDiv.innerHTML = "";

    // Lire les propositions depuis options
    traduction.options.forEach((reponse, index) => {

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
            ? texte("voirResultat")
            : texte("suivant");

    scoreElement.textContent =
        `${texte("score")} : ${score} / ${questionIndex}`;

    // Restaurer l'affichage si la personne a déjà répondu
    if (reponseSelectionnee) {
        restaurerAffichageReponse(question);
    }
}


// ==========================================
// 10. RESTAURER UNE RÉPONSE APRÈS CHANGEMENT
//     DE LANGUE
// ==========================================

function restaurerAffichageReponse(question) {

    const boutons = reponsesDiv.querySelectorAll(".reponse-btn");
    const bonneIndex = Number(question.correct);

    if (
        !Number.isInteger(bonneIndex) ||
        bonneIndex < 0 ||
        bonneIndex >= boutons.length
    ) {
        message.textContent = texte("erreurBonneReponse");
        message.style.color = "#dc3545";
        return;
    }

    if (indexReponseSelectionnee === bonneIndex) {

        boutons[bonneIndex].classList.add("correct");

    } else {

        if (indexReponseSelectionnee !== null) {
            boutons[indexReponseSelectionnee]?.classList.add("incorrect");
        }

        boutons[bonneIndex].classList.add("correct");
    }

    boutons.forEach(bouton => {
        bouton.disabled = true;
    });

    afficherMessageReponse(question);
}

function afficherMessageReponse(question) {

    const traduction = obtenirTraduction(question);
    const bonneIndex = Number(question.correct);

    if (indexReponseSelectionnee === bonneIndex) {

        message.textContent = texte("bonneReponse");
        message.style.color = "#28a745";

    } else {

        message.textContent = texte("mauvaiseReponse");
        message.style.color = "#dc3545";
    }

    // Ajouter l'explication traduite
    if (traduction.explanation) {
        message.textContent += " " + traduction.explanation;
    }
}


// ==========================================
// 11. VÉRIFIER LA RÉPONSE
// ==========================================

function verifierReponse(indexChoisi, question) {

    if (reponseSelectionnee) return;

    reponseSelectionnee = true;
    indexReponseSelectionnee = indexChoisi;

    const boutons = reponsesDiv.querySelectorAll(".reponse-btn");

    // correct commence à 0 dans le JSON
    const bonneIndex = Number(question.correct);

    if (
        !Number.isInteger(bonneIndex) ||
        bonneIndex < 0 ||
        bonneIndex >= question.options.length
    ) {

        message.textContent = texte("erreurBonneReponse");
        message.style.color = "#dc3545";

    } else {

        if (indexChoisi === bonneIndex) {

            boutons[indexChoisi].classList.add("correct");
            score++;

        } else {

            boutons[indexChoisi].classList.add("incorrect");
            boutons[bonneIndex].classList.add("correct");
        }

        afficherMessageReponse(question);
    }

    boutons.forEach(bouton => {
        bouton.disabled = true;
    });

    boutonSuivant.disabled = false;

    scoreElement.textContent =
        `${texte("score")} : ${score} / ${questionIndex + 1}`;
}


// ==========================================
// 12. QUESTION SUIVANTE
// ==========================================

boutonSuivant.addEventListener("click", () => {

    if (!reponseSelectionnee) return;

    questionIndex++;

    afficherQuestion();
});


// ==========================================
// 13. RÉSULTAT FINAL
// ==========================================

function afficherResultat() {

    document.getElementById("resultatFinal").textContent =
        `${texte("resultat")} ${score} ${texte("bonnesReponses")} ` +
        `${questions.length} ${texte("auNiveau")} ${nomNiveau(niveauChoisi)}${texte("point")}`;

    afficherEcran(ecranResultat);
}


// ==========================================
// 14. NAVIGATION
// ==========================================

function retourNiveaux() {
    afficherEcran(ecranNiveau);
}

function retourProfil() {
    afficherEcran(ecranAge);
}


// ==========================================
// 15. ACTUALISER L'ÉCRAN APRÈS UN CHANGEMENT
//     DE LANGUE
// ==========================================

function actualiserEcran() {

    // Actualiser les textes des écrans de départ
    actualiserEcranDepart();

    if (ecranNiveau?.classList.contains("actif")) {
        afficherChoixNiveaux();
    }

    if (ecranQuiz?.classList.contains("actif")) {
        afficherQuestion(true);
    }

    if (ecranResultat?.classList.contains("actif")) {
        afficherResultat();
    }
}


// ==========================================
// 16. INITIALISATION
// ==========================================

creerSelecteurLangue();
chargerQuestions();


// ==========================================
// 17. OUVERTURE DU POKÉDEX APRÈS 10 SECONDES
// ==========================================

setTimeout(() => {

    const pokedex = document.getElementById("pokedex");

    if (pokedex) {
        console.log("Ouverture du Pokédex !");
        pokedex.classList.add("ouvert");
    }

}, 10000);

// ==========================================
// TRADUCTION DES ÉCRANS DE DÉPART
// ==========================================

function actualiserEcranDepart() {

    document.getElementById("titre-profil").textContent =
        texte("titreProfil");

    document.getElementById("description-profil").textContent =
        texte("descriptionProfil");

    document.getElementById("profil-mineur").textContent =
        texte("mineur");

    document.getElementById("profil-majeur").textContent =
        texte("majeur");

    document.getElementById("titre-niveau").textContent =
        texte("titreNiveau");

    document.getElementById("bouton-retour-profil").textContent =
        texte("retour");
}