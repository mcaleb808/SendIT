window.onload = () => {
    const getUrl = window.location.href;
    const url = new URL(getUrl);
    const parcelId = url.searchParams.get('id');
    const editBtn = document.getElementById('editBtn');
    const back = document.getElementById('backBtn');

    (this.parcelDetails = async () => {
        const token = await localStorage.getItem('token');
        if (!token) {
            window.location.href = '../auth/login.html';
        }
        if (!parcelId) {
            window.location.href = '../user/parcels.html';
        }
        fetch(`http://localhost:3000/api/v1/parcels/${parcelId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/JSON',
                'x-access-token': token,
            },
        }).then((res) => {
            res.json().then(async (results) => {
                const { Parcels } = results;
                document.getElementById('header').innerHTML = `PARCEL DELIVERY ORDER no:${Parcels.id}`;
                document.getElementById('pickup').value = Parcels.location;
                document.getElementById('destination').value = Parcels.destination;
                document.getElementById('present').value = Parcels.location;
                document.getElementById('weight').value = Parcels.weight;
                document.getElementById('price').value = Parcels.weight * 500;
                document.getElementById('email').value = Parcels.receiver_email;
            }).catch(err => err);
        });
    })();

    this.updateDestination = async () => {
        const token = await localStorage.getItem('token');
        const destination = document.getElementById('destination').value;
        fetch(`http://localhost:3000/api/v1/parcels/${parcelId}/destination`, {
            method: 'PUT',
            body: JSON.stringify({
                destination
            }),
            headers: {
                'Content-Type': 'Application/JSON',
                'x-access-token': token,
            },
        }).then((res) => {
            res.json()
                .then(async (results) => {
                    const { message, status } = results;
                    if (status === 202) {
                        console.log(status);
                        window.location.href = 'parcels.html';
                        document.getElementById('msg').innerHTML = message;
                    } else {
                        console.log(message);
                        document.getElementById('msg').innerHTML = message;

                    }
                }).catch(err => err);
        });
    };

    if (editBtn) {
        editBtn.addEventListener('click', updateDestination);
    }
    if (back) {
        back.addEventListener('click', () => { window.location.href = 'parcels.html'; });
    }
}