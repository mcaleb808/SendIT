const incompleteData = {
  Pickup: "rwamagana",
    location: "muhanga",
    destination: "rusizi",
    contents: "modem devices",
    value: 50000,
    weight: 1,
    sname: "mugisha caleb didier",
    senderId: "2"

};

const postUsers = {
  names: 'Mugisha Caleb Didier',
  username: 'caleb123',
  email: 'mcaleb@gmail.com',
  password: 'caleb123'

};

const postUsers2 = {
  username: 'caleb123',
  email: 'mcaleb@gmail.com',
  password: 'caleb123'

};


const putUsers = {
  names: 'Mugisha Caleb Didier',
  password: 'caleb123'

};
const improperData = {
  //emails are not propely written
    "Pickup": "rwamagana",
    "location": "muhanga",
    "destination": "rusizi",
    "contents": "modem devices",
    "value": 50000,
    "weight": 1,
    "sname": "mugisha caleb didier",
    "senderId": "2",
    "semail": "mcaleb808gmail.com",
    "rname": "mugabo felix",
    "raddress": "rusizi",
    "remail": "mcaleb808gmail.com",
    "status": "delivered"
};

const unwantedParams = {
  // home address not required
    Pickup: "rwamagana",
    location: "muhanga",
    homeadrress: "rusizi",
    contents: "modem devices",
    value: 50000,
    weight: 1,
    sname: "mugisha caleb didier",
    senderId: "2",
    semail: "mcaleb808@gmail.com",
 
};
const expectedData = {
  // what is expected
    Pickup: "rwamagana",
    location: "muhanga",
    destination: "rusizi",
    contents: "modem devices",
    value: 50000,
    weight: 1,
    sname: "mugisha caleb didier",
    senderId: "2",
    semail: "mcaleb808@gmail.com",
    rname: "mugabo felix",
    raddress: "rusizi",
    remail: "mcaleb808@gmail.com",
    status: "delivered"

};

export {
 incompleteData, improperData, expectedData, unwantedParams 
};
