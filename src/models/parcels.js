class Parcel {
   constructor(id, location, destination, pLocation, weight, senderId, receiver, status, 
     createdDate, modifiedDate) {
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
   }
 }
 
 export default Parcel;
 