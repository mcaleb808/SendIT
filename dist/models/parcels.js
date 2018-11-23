"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parcel = function Parcel(id, location, destination, pLocation, weight, senderId, receiver, status, createdDate, modifiedDate) {
  _classCallCheck(this, Parcel);

  this.id = id;
  this.location = location;
  this.destination = destination;
  this.pLocation = pLocation;
  this.weight = weight;
  this.senderId = senderId;
  this.receiver = receiver;
  this.status = status;
  this.createdDate = createdDate;
  this.modifiedDate = modifiedDate;
};

exports.default = Parcel;