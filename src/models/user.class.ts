export class User {
  firstName: string;
  lastName: string;
  birthDate: number;
  email: string;
  phone: number;
  street: string;
  city: string;
  zipCode: number;
  checkInDate: any; // Zeitstempel
  checkOutDate: any; // Zeitstempel
  roomNumber: string;
  stays: number;
  preferences: string;
  reviews: string;
  paymentInfo: string;
  reservationStatus: string;
  communicationHistory: string;

  constructor(obj?: { 
    firstName?: string; 
    lastName?: string; 
    birthDate?: number; 
    email?: string;
    phone?: number;
    street?: string; 
    city?: string; 
    zipCode?: number;
    checkInDate?: any; // Zeitstempel
    checkOutDate?: any; // Zeitstempel
    roomNumber?: string;
    stays?: number;
    preferences?: string;
    reviews?: string;
    paymentInfo?: string;
    reservationStatus?: string;
    communicationHistory?: string;

  }) {
    this.firstName = obj?.firstName ?? '';
    this.lastName = obj?.lastName ?? '';
    this.birthDate = obj?.birthDate ?? 0;
    this.email = obj?.email ?? '';
    this.phone = obj?.phone ?? 0;
    this.street = obj?.street ?? '';
    this.city = obj?.city ?? '';
    this.zipCode = obj?.zipCode ?? 0;
    this.checkInDate = obj?.checkInDate ?? 0;
    this.checkOutDate = obj?.checkOutDate ?? 0;
    this.roomNumber = obj?.roomNumber ?? '';
    this.stays = obj?.stays ?? 0;
    this.preferences = obj?.preferences ?? '';
    this.reviews = obj?.reviews ?? '';
    this.paymentInfo = obj?.paymentInfo ?? '';
    this.reservationStatus = obj?.reservationStatus ?? '';
    this.communicationHistory = obj?.communicationHistory ?? '';
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
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      roomNumber: this.roomNumber,
      stays: this.stays,
      preferences: this.preferences,
      reviews: this.reviews,
      paymentInfo: this.paymentInfo,
      reservationStatus: this.reservationStatus,
      communicationHistory: this.communicationHistory,
    }
  }
}
