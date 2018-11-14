export default class Order {
  constructor(id, Pickup, destination, contents, value, weight, location, senderId, sname, semail, rname, remail, raddress, status) {
    this.id = id;
    this.Pickup = Pickup;
    this.destination = destination;
    this.contents = contents;
    this.value = value;
    this.weight = weight;
    this.location = location;
    this.senderId = senderId;
    this.sname = sname;
    this.semail = semail;
    this.rname = rname;
    this.remail = remail;
    this.raddress = raddress;
    this.status = status;
  }

  getParcelId() {
    return this.id;
  }
  getSenderMail() {
    return this.semail;
  }
}