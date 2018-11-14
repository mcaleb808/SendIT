"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var incompleteData = {
  Pickup: "rwamagana",
  location: "muhanga",
  destination: "rusizi",
  contents: "modem devices",
  value: 50000,
  weight: 1,
  sname: "mugisha caleb didier",
  senderId: "2"

};

var postUsers = {
  names: 'Mugisha Caleb Didier',
  username: 'caleb123',
  email: 'mcaleb@gmail.com',
  password: 'caleb123'

};

var postUsers2 = {
  username: 'caleb123',
  email: 'mcaleb@gmail.com',
  password: 'caleb123'

};

var putUsers = {
  names: 'Mugisha Caleb Didier',
  password: 'caleb123'

};
var improperData = {
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

var unwantedParams = {
  // home address not required
  Pickup: "rwamagana",
  location: "muhanga",
  homeadrress: "rusizi",
  contents: "modem devices",
  value: 50000,
  weight: 1,
  sname: "mugisha caleb didier",
  senderId: "2",
  semail: "mcaleb808@gmail.com"

};
var expectedData = {
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

exports.incompleteData = incompleteData;
exports.improperData = improperData;
exports.expectedData = expectedData;
exports.unwantedParams = unwantedParams;