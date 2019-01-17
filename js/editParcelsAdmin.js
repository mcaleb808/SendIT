window.onload = () => {
    const getUrl = window.location.href;
    const url = new URL(getUrl);
    const parcelId = url.searchParams.get('id');
    const manageBtn = document.getElementById('manage');

    (this.parcelDetails = async () => {
        const token = await localStorage.getItem('token');
        if (!token) {
            window.location.href = '../auth/login.html';
        }
        if (!parcelId) {
            window.location.href = '../admin/index.html';
        }
        fetch(`https://sendit-dbapi.herokuapp.com/api/v1/admin/parcels/${parcelId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/JSON',
                'x-access-token': token,
            },
        }).then((res) => {
            res.json().then(async (results) => {
                const { Parcels } = results;
                document.getElementById('pickup').value = Parcels.location;
                document.getElementById('destination').value = Parcels.destination;
                document.getElementById('location').value = Parcels.location;
                document.getElementById('email').value = Parcels.receiver_email;
            }).catch(err => err);
        });
    })();

    this.updateParcel = async () => {
        const token = await localStorage.getItem('token');
        const location = document.getElementById('location').value;
        const option = document.getElementById("status");
        const status = option.options[option.selectedIndex].value;
        fetch(`https://sendit-dbapi.herokuapp.com/api/v1/parcels/${parcelId}/edit`, {
            method: 'PUT',
            body: JSON.stringify({
                location,
                status
            }),
            headers: {
                'Content-Type': 'Application/JSON',
                'x-access-token': token,
            },
        }).then((res) => {
            res.json()
                .then(async (results) => {
                    const { message, status } = results;
                    if (status === 200) {
                        console.log(status);
                        window.location.href = 'index.html';
                        document.getElementById('msg').innerHTML = message;
                    } else {
                        console.log(message);
                        document.getElementById('msg').innerHTML = message;

                    }
                }).catch(err => err);
        });
    };

    if (manageBtn) {
        manageBtn.addEventListener('click', updateParcel);
    }
}