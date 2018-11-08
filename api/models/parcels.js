export default class Order {
  constructor(id, Pickup, contents, destination, value, weight, sname, saddress, semail, rname, remail, raddress, location, status){
     this.id = id;
     this.Pickup = Pickup;
     this.destination = destination;
     this.contents = contents ;
     this.value = value;
     this.weight = weight;
     this.sname = sname;
     this.saddress = saddress;
     this.semail = semail;
     this.rname = rname;
     this.remail = remail;
     this.raddress = raddress;
     this.location = location;
     this.status = status;
   }

   getParcelId(){
     return this.id;
   }
   getSenderMail(){
     return this.semail;
   }
}
