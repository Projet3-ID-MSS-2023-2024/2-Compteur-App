

function checkAnswer() {
  var selection = document.getElementById("selection").value;
  document.getElementById("gender").value = selection;
}

function validateForm() {
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var passwordConfirm = document.getElementById("password-confirm").value;
  var mobile = document.getElementById("mobile").value;

  // Check if required fields are empty
  if (
    firstName.trim() === "" ||
    lastName.trim() === "" ||
    email.trim() === "" ||
    username.trim() === "" ||
    password.trim() === "" ||
    passwordConfirm.trim() === "" ||
    mobile.trim() === ""
  ) {
    displayPopup("Veuillez remplir tous les champs obligatoires.");
    return false; // Prevent form submission
  }

  // Check if the email is valid
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    displayPopup("Veuillez entrer une adresse email valide.");
    return false; // Prevent form submission
  }

  // Check if the username is available
  var usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  if (!usernameRegex.test(username)) {
    displayPopup(
      "Le nom d'utilisateur doit contenir entre 3 et 20 caractères alphanumériques ou des tirets bas."
    );
    return false; // Prevent form submission
  }

  // Check if the password is strong enough
  var passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/;
  if (!passwordRegex.test(password)) {
    displayPopup(
      "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial, et avoir une longueur d’au moins 8 caractères."
    );
    return false; // Prevent form submission
  }

  // Check if the password and the password confirmation are the same
  if (password !== passwordConfirm) {
    displayPopup("Les mots de passe ne correspondent pas.");
    return false; // Prevent form submission
  }

  // Check if the mobile number is valid
  var mobileRegex = /^(\+|0)[1-9][0-9]{8,14}$/;
  if (!mobileRegex.test(mobile)) {
    displayPopup("Veuillez entrer un numéro de téléphone mobile valide.");
    return false; // Prevent form submission
  }

  return true;
}

function displayPopup(message) {
  // Afficher la fenêtre modale
  document.getElementById("custom-popup").style.display = "block";
  document.getElementById("overlay").style.display = "block";

  // Afficher le message dans la fenêtre modale
  document.getElementById("popup-message").innerHTML = message;
}

function closePopup() {
  // Cacher la fenêtre modale
  document.getElementById("custom-popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function validateLogin(){
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Check if required fields are empty
  if (
    username.trim() === "" ||
    password.trim() === ""
  ) {
    displayPopup("Veuillez remplir tous les champs obligatoires.");
    return false; // Prevent form submission
  }

  // Check if the username is available
  var usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  if (!usernameRegex.test(username)) {
    displayPopup(
      "Le nom d'utilisateur doit contenir entre 3 et 20 caractères alphanumériques ou des tirets bas."
    );
    return false; // Prevent form submission
  }

  // Check if the password is strong enough
  var passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/;
  if (!passwordRegex.test(password)) {
    displayPopup(
      "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial, et avoir une longueur d’au moins 8 caractères."
    );
    return false; // Prevent form submission
  }

  return true;
}

function validateResetPassword(){
  var username = document.getElementById("username").value;

  // Check if the usernam is valid
  var usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  if (!usernameRegex.test(username)) {
    displayPopup(
      "Le nom d'utilisateur doit contenir entre 3 et 20 caractères alphanumériques ou des tirets bas."
    );
    return false; // Prevent form submission
  }

  return true;
}

