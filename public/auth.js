document.getElementById('loginButton').addEventListener('click', () => {
    window.location.href = '/auth/google';
});

document.getElementById('loginGithub').addEventListener('click', () => {
    window.location.href = '/auth/github';
});