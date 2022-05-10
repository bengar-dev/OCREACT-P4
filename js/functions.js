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


function handleError(input, value, error) { // Fonction gestion des champs Nom, Prénom & Email afin d'éviter une répétition dans le code.

    let msgError = ''

    if(input.id === 'first') { // On déclare un msg d'erreur suivant le champs
      msgError = 'Le prénom doit faire deux caractères minimum et commencer par une majuscule.'
    } else if(input.id === 'last') {
      msgError = 'Le nom doit faire deux caractères minimum et commencer par une majuscule.'
    } else if(input.id === 'email') {
      msgError = `Veuillez vérifier le format de l'email.`
    }

    if(input.id === 'first'  || input.id === 'last') { // si cela concerne les champs prénom & nom alors on appelle notre fonction regex validName
      if(!validName(value)) {
        error.innerText = msgError
        input.classList.add('alert-input')
      } else {
        error.innerText = ``
        input.classList.remove('alert-input')
      }
    } else { // sinon ca veut dire qu'on change notre champs email alors on appelle notre fonction regex validEmail
      if (!validEmail(value)) {
        error.innerText = msgError
        input.classList.add('alert-input')
      } else {
        error.innerText = ``
        input.classList.remove('alert-input')
      }
    }

}  