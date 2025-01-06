document.getElementById('resetPasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var email = document.getElementById('email').value;
    if (email) {
        document.getElementById('confirmationMessage').style.display = 'block';
    }
});