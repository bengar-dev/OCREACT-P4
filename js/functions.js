// déclartion constantes msg error
const birtherror = document.getElementById('birthdateError')
const firsterror = document.getElementById('firstnameError')
const lasterror = document.getElementById('lastnameError')
const mailerror = document.getElementById('emailError')
const tourerror = document.getElementById('qtyError')
const cityerror = document.getElementById('locationError')
const ruleserror = document.getElementById('rulesError')
const msgerror = document.getElementById('alertmsg')

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

// tableau des id alerts
const alertArray = ['birthdateError', 'locationError', 'rulesError', 'qtyError', 'firstnameError', 'lastnameError', 'emailError', 'alertmsg']
// tableau des id inputs
const arrayInput = ['email', 'first', 'last', 'birthdate', 'quantity']

function resetAlertMsg(array) { // fonction reset message alertes
    array.forEach(el => {
        document.getElementById(el).innerText = ''
    })
}

function resetInputAlert(array) { // fonction reset input alertes
    array.forEach(el =>  {
        document.getElementById(el).classList.contains('alert-input') && document.getElementById(el).classList.remove('alert-input')
    })
}

function validForm(email, firstname, lastname, tournament, birthdate, rules) {

    msgerror.value && (msgerror.innerText = '')

    //on stock dans un premier temps les valeurs des buttons radios dans un tableau
    let cityArray = [] // déclaration de notre tableau
    for(let i = 1; i < 7; i++) { 
        let check = document.getElementById(`location${i}`)
        cityArray.push(check.checked) // on push les valeurs dans notre tableau vide
    }
    let findTrue = cityArray.findIndex(p => p === true) // on regarde dans le tableau si on trouve une valeur true
    console.log(findTrue)


    if(email && firstname && lastname && birthdate && rules && tournament && findTrue !== -1 ) { // on vérifie si les champs ne sont pas vide.
       
        resetAlertMsg(alertArray) // on appelle notre fonction reset alert message
        resetInputAlert(arrayInput) // on appelle notre fonction reset input alert
        
        let diff = Date.now() - Date.parse(birthdate) // calcul de l'age de l'utilisateur
        let age = new Date(diff) // on convertit l'age calculer en date
        let result = Math.abs(age.getUTCFullYear() - 1970) // on soustrait 1970 à l'age calculer

        if(!validEmail(email)) { // on vérifie le format de l'email avec notre fonction validEmail
            mailerror.innerText = `Veuillez vérifier le format de l'email.`    
            document.getElementById('email').classList.add('alert-input')
        }
        else if(!validName(firstname)) { // on vérifie le format du prénom avec notre fonction validName
            firsterror.innerText = `Veuillez entrer 2 caractères ou plus pour le champ du prénom.`
            document.getElementById('first').classList.add('alert-input')
        }
        else if(!validName(lastname)) { // on vérifie le format du nom avec notre fonction validName
            lasterror.innerText = `Veuillez entrer 2 caractères ou plus pour le champ du nom.`
            document.getElementById('last').classList.add('alert-input')
        }
        else if(tournament < 0 || tournament > 99) { // on vérifie le format du prénom avec notre fonction validName
            tourerror.innerText = `Veuillez rentrer un chiffre compris entre 0 et 99 inclus`
        }
        else if(result < 16) { // on vérifie si l'age n'est pas en dessous de 16 ans.
            birtherror.innerText = `Vous n'avez pas l'age requis ( - 16 )`
            document.getElementById('birthdate').classList.add('alert-input')
        }
        else { // si on remplit les conditions alors
            //on boucle sur un tableau alertArray qui rassemble les message d'erreurs de nos inputs et on reset les champs.
            let alertArray = ['birthdateError', 'locationError', 'rulesError', 'qtyError', 'firstnameError', 'lastnameError', 'emailError', 'alertmsg']
            alertArray.forEach(el => {
                document.getElementById(el).innerText = ''
            })
            document.querySelector('.modal-body').innerHTML = `
            <div class='confirm-register'>
                <p>Merci pour votre inscription</p>
                <button id='closemdl'>Fermer</button>
            </div>
            `
            document.getElementById('closemdl').addEventListener('click', launchModal)
        }

    }

    else { // si un des champs est vide on mets un msg d'erreur correspondant au champ non saisie

        if(findTrue === -1) {
            cityerror.innerText = `Veuillez saisir une ville.`
        }
        if(!tournament) {
            tourerror.innerText = `Veuillez saisir un nombre.`
        } 
        if(!email) {
            mailerror.innerText = `Veuillez entrer un e-mail.`
        } 
        if(!lastname) {
            lasterror.innerText = `Veuillez entrer un nom.`
        } 
        if(!firstname) {
            firsterror.innerText = `Veuillez entrer un prénom.`
        } 
        if(!birthdate) {
            birtherror.innerText = `Veuillez entrer une date de naissance.`
        } 
        if(!rules) {
            ruleserror.innerText = `Veuillez accepter les règles.`
        } 
        msgerror.innerText = `Veuillez remplir tous les champs.`

    }

}