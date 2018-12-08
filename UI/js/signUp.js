window.onload = function () {
    const username = document.getElementById('userName');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const signUp = document.getElementById('signUpBtn');

    async function signup() {
        const rawResponse = await fetch('http://localhost:3000/api/v1/auth/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/JSON',
                'Content-Type': 'application/JSON',
            },
            body: JSON.stringify({
                email: email.value,
                username: username.value,
                fullName: fullName.value,
                password: password.value
            }),
        });
        const data = await rawResponse.json();
        document.getElementById('msg').innerHTML = data.message;
    }

    if (signUp) {
        signUpBtn.addEventListener('click', signup);
    }

};