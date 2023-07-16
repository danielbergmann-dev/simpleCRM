export class User {
  firstName: string;
  lastName: string;
  birthDate: number;
  email: string;
  phone: number;
  street: string;
  city: string;
  zipCode: number;
  flightNumber: string;
  departureTime: any; // Zeitstempel
  arrivalTime: any; // Zeitstempel
  flightDestination: string;
  flightStatus: string;

  constructor(obj?: { 
    firstName?: string; 
    lastName?: string; 
    birthDate?: number; 
    email?: string;
    phone?: number;
    street?: string; 
    city?: string; 
    zipCode?: number;
    flightNumber?: string;
    departureTime?: any; // Zeitstempel
    arrivalTime?: any; // Zeitstempel
    flightDestination?: string;
    flightStatus?: string;

  }) {
    this.firstName = obj?.firstName ?? '';
    this.lastName = obj?.lastName ?? '';
    this.birthDate = obj?.birthDate ?? 0;
    this.email = obj?.email ?? '';
    this.phone = obj?.phone ?? 0;
    this.street = obj?.street ?? '';
    this.city = obj?.city ?? '';
    this.zipCode = obj?.zipCode ?? 0;
    this.flightNumber = obj?.flightNumber ?? '';
    this.departureTime = obj?.departureTime ?? 0;
    this.arrivalTime = obj?.arrivalTime ?? 0;
    this.flightDestination = obj?.flightDestination ?? '';
    this.flightStatus = obj?.flightStatus ?? '';

  }

  public toJSON(){
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      email: this.email,
      phone: this.phone,
      street: this.street,
      city: this.city,
      zipCode: this.zipCode,
      flightNumber: this.flightNumber,
      departureTime: this.departureTime,
      arrivalTime: this.arrivalTime,
      flightDestination: this.flightDestination,
      flightStatus: this.flightStatus,

    }
  }

}

