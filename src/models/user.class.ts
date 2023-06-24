export class User {
  firstName: string;
  lastName: string;
  birthDate: number;
  street: string;
  city: string;
  zipCode: number;

  constructor(obj?: { 
    firstName?: string; 
    lastName?: string; 
    birthDate?: number; 
    street?: string; 
    city?: string; 
    zipCode?: number 
  }) {
    this.firstName = obj?.firstName ?? '';
    this.lastName = obj?.lastName ?? '';
    this.birthDate = obj?.birthDate ?? 0;
    this.street = obj?.street ?? '';
    this.city = obj?.city ?? '';
    this.zipCode = obj?.zipCode ?? 0;
  }

  public toJSON(){
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      street: this.street,
      city: this.city,
      zipCode: this.zipCode,
    }
  }

}
