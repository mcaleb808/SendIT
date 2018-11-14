export default class User {
  constructor(id, name, username, password, email) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.email = email;
  }

  getUsername() {
    return this.username;
  }
  getName() {
    return this.name;
  }
}