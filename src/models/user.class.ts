export class User {
  firstName!: string;
  lastName!: string;
  email!: string;
  birthDate!: number;
  street!: string;
  zipCode!: number;
  city!: string;
  division!: string;
  title!: string;
  customIdName!: string;

  constructor(obj?: any) {
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.birthDate = obj ? obj.birthDate : '';
    this.street = obj ? obj.street : '';
    this.zipCode = obj ? obj.zipCode : '';
    this.city = obj ? obj.city : '';
    this.division = obj ? obj.division : '';
    this.title = obj ? obj.title : '';
    this.customIdName = obj ? obj.customIdName : '';
  }


  public toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate,
      street: this.street,
      zipCode: this.zipCode,
      city: this.city,
      division: this.division,
      title: this.title,
      customIdName: this.customIdName,
    }
  }
}
