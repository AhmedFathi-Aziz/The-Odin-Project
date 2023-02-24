document.addEventListener('DOMContentLoaded', function() {
    let password = document.querySelector('#password').value;
    let confirm = document.querySelector('#confirm-password').value;
    let error = document.querySelector('#error');
    
    if (password == '' && confirm == '') {
        error.textContent = '*Passwords does not match';
    }
});