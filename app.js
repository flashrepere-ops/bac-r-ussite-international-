// ======================================
// BAC RÉUSSITE INTERNATIONAL
// POWER PILOT TECHNOLOGY
// ======================================

let selectedZone = "";
let currentLanguage = "fr";

// Sélection de l'espace éducatif
window.selectZone = function (zone, button) {
    selectedZone = zone;

    document.querySelectorAll(".zone").forEach(function (element) {
        element.classList.remove("active");
    });

    button.classList.add("active");

    const message = document.getElementById("message");

    if (zone === "fr") {
        message.textContent = "Espace francophone sélectionné.";
    } else {
        message.textContent = "English-speaking area selected.";
    }
};


// Changement de langue
window.changeLanguage = function () {
    const title = document.querySelector(".hero h1");
    const description = document.querySelector(".description");
    const sectionTitle = document.querySelector(".section-title");
    const startButton = document.querySelector(".start");

    if (currentLanguage === "fr") {
        currentLanguage = "en";

        document.documentElement.lang = "en";

        title.textContent =
            "Build your future with BAC RÉUSSITE INTERNATIONAL";

        description.textContent =
            "An educational platform to learn, improve and succeed in your exams.";

        sectionTitle.textContent =
            "Let's prepare for your success";

        startButton.textContent = "GET STARTED";

    } else {
        currentLanguage = "fr";

        document.documentElement.lang = "fr";

        title.textContent =
            "Réussis ton avenir avec BAC RÉUSSITE INTERNATIONAL";

        description.textContent =
            "Une plateforme éducative pour apprendre, progresser et réussir tes examens.";

        sectionTitle.textContent =
            "Préparons ta réussite";

        startButton.textContent = "COMMENCER";
    }
};


// Démarrage de l'application
window.startApp = function () {

    const country = document.getElementById("country").value;
    const level = document.getElementById("level").value;
    const series = document.getElementById("series").value;

    const message = document.getElementById("message");

    if (!selectedZone) {
        message.textContent =
            "Veuillez choisir votre espace éducatif.";
        return;
    }

    if (!country || !level || !series) {
        message.textContent =
            "Veuillez remplir tous les champs.";
        return;
    }

    const student = {
        zone: selectedZone,
        country: country,
        level: level,
        series: series,
        date: new Date().toISOString()
    };

    try {
        localStorage.setItem(
            "bri_student",
            JSON.stringify(student)
        );

        openDashboard(student);

    } catch (error) {
        message.textContent =
            "Impossible d'enregistrer le profil sur cet appareil.";

        console.error(error);
    }
};


// Ouverture du tableau de bord
function openDashboard(student) {

    const setupScreen = document.getElementById("setupScreen");
    const dashboardScreen = document.getElementById("dashboardScreen");

    setupScreen.hidden = true;
    dashboardScreen.hidden = false;

    document.getElementById("dashboardGreeting").textContent =
        "Bienvenue !";

    document.getElementById("dashboardProfile").textContent =
        student.country + " | " +
        student.level + " | Série " +
        student.series;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Gestion des cartes du tableau de bord
document.querySelectorAll(".dashboard-card").forEach(function (card) {

    card.addEventListener("click", function () {

        const section = card.dataset.section;

        showDashboardMessage(section);

    });

});


// Affichage des informations des rubriques
function showDashboardMessage(section) {

    const info = document.querySelector(".dashboard-info");

    const contents = {

        courses: {
            title: "MES COURS",
            text: "Les cours adaptés à ton pays et à ton programme scolaire seront disponibles ici."
        },

        exercises: {
            title: "MES EXERCICES",
            text: "Tu pourras t'entraîner avec des exercices et consulter leurs corrections détaillées."
        },

        exams: {
            title: "PRÉPARATION AUX EXAMENS",
            text: "Retrouve progressivement les ressources de préparation aux examens."
        },

        ai: {
            title: "BAC IA",
            text: "Ton assistant pédagogique intelligent sera connecté dans une prochaine étape."
        },

        calendar: {
            title: "CALENDRIER DES EXAMENS",
            text: "Les calendriers officiels vérifiés seront présentés dans cette rubrique."
        },

        progress: {
            title: "MA PROGRESSION",
            text: "Cette rubrique accueillera le suivi de tes apprentissages."
        },

        profile: {
            title: "MON PROFIL",
            text: "Tes informations scolaires sont enregistrées sur cet appareil."
        },

        settings: {
            title: "PARAMÈTRES",
            text: "Les réglages de ton application seront disponibles ici."
        }

    };

    const content = contents[section];

    if (!content) {
        return;
    }

    info.innerHTML = `
        <h2>${content.title}</h2>
        <p>${content.text}</p>
        <button id="backDashboard" class="start">
            RETOUR AU TABLEAU DE BORD
        </button>
    `;

    document.getElementById("backDashboard").addEventListener(
        "click",
        function () {
            info.innerHTML = `
                <h2>POWER PILOT TECHNOLOGY</h2>
                <p>
                    L'éducation sans frontières.
                    Construisons ensemble la réussite de demain.
                </p>
            `;
        }
    );

    info.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


// Récupération du profil enregistré
window.addEventListener("DOMContentLoaded", function () {

    const savedStudent = localStorage.getItem("bri_student");

    if (savedStudent) {
        try {
            const student = JSON.parse(savedStudent);

            console.log("Profil BRI retrouvé :", student);

        } catch (error) {
            console.error("Erreur de lecture du profil :", error);
        }
    }

});