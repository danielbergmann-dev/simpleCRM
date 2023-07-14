export class User {
  firstName: string;
  lastName: string;
  birthDate: number;
  email: string;
  street: string;
  city: string;
  zipCode: number;
  carModell: string;
  phoneNumber: number;
  infos: string;
  productInfo: string; // Neu hinzugefügt
  estimatedDeliveryDate: number; // Neu hinzugefügt
  deliveryStatus: string; // Neu hinzugefügt
  deliveryStatusColor: string; // Neu hinzugefügt

  constructor(obj?: { 
    firstName?: string; 
    lastName?: string; 
    birthDate?: number; 
    email?: string;
    street?: string; 
    city?: string; 
    zipCode?: number;
    carModell?: string; 
    phoneNumber?: number;
    infos?: string;
    productInfo?: string; // Neu hinzugefügt
    estimatedDeliveryDate?: number; // Neu hinzugefügt
    deliveryStatus?: string; // Neu hinzugefügt
    deliveryStatusColor?: string; // Neu hinzugefügt

  }) {
    this.firstName = obj?.firstName ?? '';
    this.lastName = obj?.lastName ?? '';
    this.birthDate = obj?.birthDate ?? 0;
    this.email = obj?.email ?? '';
    this.street = obj?.street ?? '';
    this.city = obj?.city ?? '';
    this.zipCode = obj?.zipCode ?? 0;
    this.carModell = obj?.carModell ?? '';
    this.phoneNumber = obj?.phoneNumber ?? 0;
    this.infos = obj?.infos ?? '';
    this.productInfo = obj?.productInfo ?? ''; // Neu hinzugefügt
    this.estimatedDeliveryDate = obj?.estimatedDeliveryDate ?? 0; // Neu hinzugefügt
    this.deliveryStatus = obj?.deliveryStatus ?? ''; // Neu hinzugefügt
    this.deliveryStatusColor = obj?.deliveryStatusColor ?? '';
  }

  public toJSON(){
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      email: this.email,
      street: this.street,
      city: this.city,
      zipCode: this.zipCode,
      carModell: this.carModell,
      phoneNumber: this.phoneNumber,
      infos: this.infos,
      productInfo: this.productInfo, // Neu hinzugefügt
      estimatedDeliveryDate: this.estimatedDeliveryDate, // Neu hinzugefügt
      deliveryStatus: this.deliveryStatus, // Neu hinzugefügt
      deliveryStatusColor: this.deliveryStatusColor // Neu hinzugefügt
    }
  }

}
