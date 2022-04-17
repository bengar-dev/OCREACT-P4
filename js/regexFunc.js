function validEmail(value) { // fonction regex qui vérifie le format de l'email
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
}

function validName(value) { // fonctio regex qui vérifie que le nom/prénom compte plus de deux caractères
    return /[a-z]/g.test(value);
}