const request = new XMLHttpRequest();

request.open('GET', 'http://localhost:3000/parcels', true);
const tbody = document.getElementById('tbody');
request.onload = function () {

  // Begin accessing JSON data here
  const data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(orders => {
	let tr = "<tr>";
	/* Must not forget the $ sign */
    tr += "<td>" + orders.id+ "</td>" + "<td>" + orders.Pickup + "</td>" + "<td>" + orders.destination + "</td>" + "<td>" + orders.location + "</td>" + "<td>" + orders.weight*1000 + "</td>" + "<td>" + orders.status + "</td>" + "<td><a href=details.html ><button type=button>EDIT</button></a></td></tr>";

    /* We add the table row to the table body */
    tbody.innerHTML += tr;	
    });
  } else {
    console.log('error');
  }
}

request.send();