window.onload = async () => {
    const token = await localStorage.getItem('token');
    if (!token) {
        window.location.href = '../auth/login.html';
    }
    const UserParcel = document.getElementById('parcels');
    (this.parcels = () => {
        fetch('https://sendit-dbapi.herokuapp.com/api/v1/parcels', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
        })
            .then(res => res.json())
            .then((parcel) => {
                for (let index = 0; index < parcel.Parcels.length; index++) {
                    const tr = document.createElement('tr');
                    UserParcel.appendChild(tr);
                    if (parcel.Parcels[index].status === "generated") {

                        tr.innerHTML = `
                <tr>
                  <td>${parcel.Parcels[index].id}</td>
                  <td>${parcel.Parcels[index].pickup}</td>
                  <td>${parcel.Parcels[index].destination}</td>
                  <td>${parcel.Parcels[index].location}</td>
                  <td>${parcel.Parcels[index].weight}</td>
                  <td>${parcel.Parcels[index].weight * 500}</td>
                  <td>${parcel.Parcels[index].receiver_email}</td>
                  <td>${parcel.Parcels[index].status}</td>
                  <td><a href="editParcel.html?id=${parcel.Parcels[index].id}"><button type="button" id="edit">EDIT</button></a></td>
                  <td><button type="button" id="cancelBtn" style="background-color:#f57f17;" onclick="cancel('${parcel.Parcels[index].id}')">CANCEL</button></td>

            </tr>
          `;

                    }
                    else {
                        tr.innerHTML = `
                    <tr>
                      <td>${parcel.Parcels[index].id}</td>
                      <td>${parcel.Parcels[index].pickup}</td>
                      <td>${parcel.Parcels[index].destination}</td>
                      <td>${parcel.Parcels[index].location}</td>
                      <td>${parcel.Parcels[index].weight}</td>
                      <td>${parcel.Parcels[index].weight * 500}</td>
                      <td>${parcel.Parcels[index].receiver_email}</td>
                      <td>${parcel.Parcels[index].status}</td>
                      <td><button type="button" id="disabled" style="background-color:gray;" disabled">EDIT</button></td>
                      <td><button type="button" id="cancelBtn" style="background-color:gray;" disabled">CANCEL</button></td>
    
                </tr>
              `;
                    }
                }

            })
            .catch(error => error.stack);
    })();

    this.cancel = (parcelId) => {
        let check = confirm("Press OK to confirm!");
        if (check == true) {
            fetch(`https://sendit-dbapi.herokuapp.com/api/v1/parcels/${parcelId}/cancel`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'Application/JSON',
                    'x-access-token': token,
                },
            }).then((res) => {
                res.json().then(async (results) => {
                    const { message } = results;
                    window.location.href = 'parcels.html';
                    document.getElementById('msg').innerHTML = message;
                }).catch(err => err);
            });

        }
    }
};