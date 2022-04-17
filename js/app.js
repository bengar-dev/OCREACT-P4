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


// sur le click de validation du formulaire on appelle notre fonction validForm et on lui passe les valeurs des inputs.
btnSubmit.addEventListener('click', (e) => {
  e.preventDefault()
  validForm(email.value, firstname.value, lastname.value, parseInt(qtyTournament.value), birthdate.value, rules.checked)
})

