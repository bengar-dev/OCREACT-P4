// DOM Elements déclaration des const qui vont nous permettre de cibler des éléments
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
  if (!validName(e.target.value)) {
    firsterror.innerText = `Le prénom doit faire deux caractères minimum et commencer par une majuscule.`
    firstname.classList.add('alert-input')
  } else {
    firsterror.innerText = ``
    firstname.classList.remove('alert-input')
  }
})

lastname.addEventListener('input', (e) => { // vérif champ nom
  if (!validName(e.target.value)) {
    lasterror.innerText = `Le nom doit faire deux caractères minimum et commencer par une majuscule.`
    lastname.classList.add('alert-input')
  } else {
    lasterror.innerText = ``
    lastname.classList.remove('alert-input')
  }
})

email.addEventListener('input', (e) => { // vérif champ email
  if (!validEmail(e.target.value)) {
    mailerror.innerText = `Veuillez vérifier le format de l'email.`
    email.classList.add('alert-input')
  } else {
    mailerror.innerText = ``
    email.classList.remove('alert-input')
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
  const diff = Date.now() - Date.parse(e.target.value) // calcul de l'age de l'utilisateur
  const age = new Date(diff) // on convertit l'age calculer en date
  const result = Math.abs(age.getUTCFullYear() - 1970) // on soustrait 1970 à l'age calculer
  if (result < 16) {
    birtherror.innerText = `Vous n'avez pas l'age requis ( - 16 )`
    birthdate.classList.add('alert-input')
  } else {
    birtherror.innerText = ``
    birthdate.classList.remove('alert-input')
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

