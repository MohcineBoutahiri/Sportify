function myMenuFunction() {
    var i = document.getElementById("navMenu");
    if(i.className === "nav-menu") {
        i.className += " responsive";
    } else {
        i.className = "nav-menu";
    }
}

var x = document.getElementById("login");
var y = document.getElementById("register");

function login() {
    x.style.left = "4px";
    y.style.right = "-520px";
    x.style.opacity = 1;
    y.style.opacity = 0;
}

function register() {
    x.style.left = "-510px";
    y.style.right = "5px";
    x.style.opacity = 0;
    y.style.opacity = 1;
}
function validateLogin(event) {
        event.preventDefault(); 

        
        var username = document.querySelector('[name="email"]').value;
        var password = document.querySelector('[name="mot_de_passe"]').value;
        var errorMessage = document.getElementById('error-message');
         errorMessage.textContent = '';

        
        if (username === '') {
            errorMessage.textContent = 'Veuillez entrer votre nom d\'utilisateur ou email.';
            return; 
        }

        if (password === '') {
            errorMessage.textContent = 'Veuillez entrer votre mot de passe.';
            document.querySelector('[name="mot_de_passe"]').focus(); 
            return; 
        }

       
        if (password !== 'password123') {
            errorMessage.textContent = 'Mot de passe incorrect. Veuillez réessayer.';
            return; 
        }

        
        alert('Connexion réussie!');
        window.location.href = '../terrains/terrain.html'; 
    }