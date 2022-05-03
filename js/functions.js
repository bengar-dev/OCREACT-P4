function validEmail(value) { // fonction regex qui vérifie le format de l'email
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
}

function validName(value) { // fonction regex qui vérifie que le nom/prénom compte plus de deux caractères
  return /^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/g.test(value);
}

function validNumber(value) { // fonction regex qui vérifie si l'utilisateur saisie bien un nombre
  return /[0-9]/g.test(value)
}

function editNav() { // fonction pour gérer le menu responsive (display)
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

// launch modal form (display modal form)
function launchModal() {
    if(modalbg.style.display === "block") {
      modalbg.style.display = "none";
    } else {
      modalbg.style.display = "block";
    }
  }