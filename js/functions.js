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