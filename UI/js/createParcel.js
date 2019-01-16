window.onload = async () => {
    const token = await localStorage.getItem('token');
    if (!token) {
        window.location.href = '../auth/login.html';
    }
    const pickup = document.getElementById('pickUp');
    const destination = document.getElementById('destination');
    const weight = document.getElementById('weight');
    const fullname = document.getElementById('fullname');
    const address = document.getElementById('address');
    const email = document.getElementById('email');
    const createBtn = document.getElementById('CreateBtn');

    const createParcel = async () => {

        fetch('https://sendit-dbapi.herokuapp.com/api/v1/parcels', {
            method: 'POST',
            body: JSON.stringify({
                pickup: pickup.value,
                destination: destination.value,
                weight: weight.value,
                receiver_name: fullname.value,
                receiver_address: address.value,
                receiver_email: email.value
            }),
            headers: {
                'Content-Type': 'Application/JSON',
                'x-access-token': token,
            },
        }).then((res) => {
            res.json().then(async (results) => {
                const { message, status } = results;
                if (status === 201) {
                    document.getElementById('msg').innerHTML = message;
                    setTimeout(() => {
                        window.location.href = 'parcels.html';
                    }, 2000);
                } else {
                    document.getElementById('msg').innerHTML = message;
                }
            }).catch(err => err);
        });
    };

    if (createBtn) {
        createBtn.addEventListener('click', createParcel);
    }
};