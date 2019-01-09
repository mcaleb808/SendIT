window.onload = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const login = () => {
        fetch('https://sendit-dbapi.herokuapp.com/api/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email: email.value, password: password.value }),
            headers: {
                'Content-Type': 'Application/JSON',
            },
        }).then((res) => {
            res.json().then(async (results) => {
                const { token, users, message } = results;
                if (token) {
                    await localStorage.setItem('token', token);
                    await localStorage.setItem('username', users.username);
                    await localStorage.setItem('fullname', users.fullname);
                    await localStorage.setItem('email', users.email);
                    if (users.usertype == 'admin') {
                        window.location.href = '../admin/index.html';
                    } else {
                        window.location.href = '../user/parcels.html';
                    }
                } else {
                    document.getElementById('msg').innerHTML = message;
                }
            }).catch(err => err);
        });
    };

    if (loginBtn) {
        loginBtn.addEventListener('click', login);
    }
}