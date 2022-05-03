function validEmail(value) { // fonction regex qui vérifie le format de l'email
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
}

function validName(value) { // fonction regex qui vérifie que le nom/prénom compte plus de deux caractères
  return /^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/g.test(value);
}

function validNumber(value) { // fonction regex qui vérifie si l'utilisateur saisie bien un nombre
  return /[0-9]/g.test(value)
}

// DOM Elements (déclaration des const qui vont nous permettre de cibler des éléments de notre)
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector('.close');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.addEventListener('click', launchModal)


// checking input form
const firstname = document.getElementById('first')
const lastname = document.getElementById('last')
const email = document.getElementById('email')
const birthdate = document.getElementById('birthdate')
const qtyTournament = document.getElementById('quantity')
const rules = document.getElementById('checkbox1')
const btnSubmit = document.querySelector('.btn-submit')

// déclartion constantes msg error
const birtherror = document.getElementById('birthdateError')
const firsterror = document.getElementById('firstnameError')
const lasterror = document.getElementById('lastnameError')
const mailerror = document.getElementById('emailError')
const tourerror = document.getElementById('qtyError')
const cityerror = document.getElementById('locationError')
const ruleserror = document.getElementById('rulesError')
const msgerror = document.getElementById('alertmsg')


//vérification des champs au fil de l'eau

firstname.addEventListener('input', (e) => { // vérif champ prénom
  const inputFirstname = document.getElementById('first')
  if (!validName(e.target.value)) {
    firsterror.innerText = `Veuillez entrer 2 caractères ou plus pour le champ du prénom.`
    inputFirstname.classList.add('alert-input')
  } else {
    firsterror.innerText = ``
    inputFirstname.classList.remove('alert-input')
  }
})

lastname.addEventListener('input', (e) => { // vérif champ nom
  const inputLastname = document.getElementById('last')
  if (!validName(e.target.value)) {
    lasterror.innerText = `Veuillez entrer 2 caractères ou plus pour le champ du nom.`
    inputLastname.classList.add('alert-input')
  } else {
    lasterror.innerText = ``
    inputLastname.classList.remove('alert-input')
  }
})

email.addEventListener('input', (e) => { // vérif champ email
  const inputEmail = document.getElementById('email')
  if (!validEmail(e.target.value)) {
    mailerror.innerText = `Veuillez vérifier le format de l'email.`
    inputEmail.classList.add('alert-input')
  } else {
    mailerror.innerText = ``
    inputEmail.classList.remove('alert-input')
  }
})

qtyTournament.addEventListener('input', (e) => { // vérif champ tournoi
  const qty = parseInt(e.target.value)
  if (qty < 0 || qty > 99 || !validNumber(qty)) {
    tourerror.innerText = `Veuillez rentrer un chiffre compris entre 0 et 99 inclus`
  } else {
    tourerror.innerText = ``
  }
})

birthdate.addEventListener('input', (e) => { // vérif champ age
  const inputBirthdate = document.getElementById('birthdate')
  const diff = Date.now() - Date.parse(e.target.value) // calcul de l'age de l'utilisateur
  const age = new Date(diff) // on convertit l'age calculer en date
  const result = Math.abs(age.getUTCFullYear() - 1970) // on soustrait 1970 à l'age calculer
  if (result < 16) {
    birtherror.innerText = `Vous n'avez pas l'age requis ( - 16 )`
    inputBirthdate.classList.add('alert-input')
  } else {
    birtherror.innerText = ``
    inputBirthdate.classList.remove('alert-input')
  }
})

// sur le click de validation du formulaire on appelle notre fonction validForm et on lui passe les valeurs des inputs.
btnSubmit.addEventListener('click', (e) => {

  e.preventDefault()

  let check = false // on initialise une variable check à false qui va nous permettre de la passer à true dans le cas où un boutton radio a été selectionner
  const formData = document.querySelectorAll('.formData input[type=radio]')
  formData.forEach(e => { // on parcours le tableau de boutton et on passe check à true si un boutton à bien été check
    if (e.checked) {
      check = true
    }
  })

  const checkboxArray = document.querySelectorAll('.formData .checkbox-label .checkbox-icon') // tableau des checkbox villes

  if (!check) { // on vérifie bien que check n'est pas à false
    cityerror.innerText = `Veuillez sélectionner une ville.`
    checkboxArray.forEach(el => {
      el.classList.add('alert-icon')
    })
  } else {
    cityerror.innerText = ``
    checkboxArray.forEach(el => {
      el.classList.remove('alert-icon')
    })
  }

  if (!rules.checked) { // on vérifie si le réglement a bien été accepté
    ruleserror.innerText = `Veuillez accepter le réglement.`
  } else {
    ruleserror.innerText = ''
  }

  // on vérifie si on a pas des champs vide et qu'il n'y ai aucun message d'erreur
  if (
    firstname.value &&
    lastname.value &&
    email.value &&
    birthdate.value &&
    qtyTournament.value &&
    check &&
    rules.checked &&
    birtherror.innerText === "" &&
    firsterror.innerText === "" &&
    lasterror.innerText === "" &&
    mailerror.innerText === "" &&
    tourerror.innerText === ""
  ) {
    document.querySelector(".modal-body").innerHTML = `
            <div class='confirm-register'>
                <p>Merci pour votre inscription</p>
                <button id='closemdl'>Fermer</button>
            </div>
            `;
    document.getElementById("closemdl").addEventListener("click", launchModal); // on rajoute un événement pour fermer la modal avec le nouveau boutton "Fermer"

    const data = {
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      birthdate: birthdate.value,
      tournament: qtyTournament.value,
    };

    console.log(data);

    return true;
  } else {
    // si les conditions de ne sont pas remplis on rajoute un message général pour demander à l'utilisateur de vérifier les champs.
    msgerror.innerText = `Erreur : Veuillez vérifier tous les champs.`;
    return false;
  }

})

