window.onload = async () => {
    const token = await localStorage.getItem('token');
    if (!token) {
        window.location.href = '../auth/login.html';
    }
    const UserParcel = document.getElementById('parcels');
    (this.parcels = () => {
        fetch('https://sendit-dbapi.herokuapp.com/api/v1/admin/parcels', {
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
                    if (parcel.Parcels[index].status === "generated" || parcel.Parcels[index].status === "in-transit") {

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
                  <td><a href="manage.html?id=${parcel.Parcels[index].id}"><button type="button" id="edit">MANAGE</button></a></td>
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
                      <td><button type="button" id="disabled" style="background-color:gray;" disabled">MANAGE</button></td>    
                </tr>
              `;
                    }
                }

            })
            .catch(error => error.stack);
    })();
};