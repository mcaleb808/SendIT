window.onload = () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const fullname = localStorage.getItem('fullname');
    const email = localStorage.getItem('email');
    if (!token) {
        window.location.href = '../auth/login.html';
    }
    const userName = document.getElementById('username').innerHTML = `Username: ${username}`;
    const userEmail = document.getElementById('fullname').innerHTML = `Fullname: ${fullname}`;
    const fullName = document.getElementById('email').innerHTML = `Email: ${email}`;
}