export type CardType = 'drivers_license' | 'national_id' | 'kebele_id' | 'coop_atm';

export interface BaseCard {
  id: string;
  type: CardType;
  fullName: string;
  issuedDate: string;
  expiryDate: string;
  photoUrl: string;
}

export interface DriversLicense extends BaseCard {
  type: 'drivers_license';
  licenseNumber: string;
  dob: string;
  bloodType: string;
  nationality: string;
}

export interface NationalID extends BaseCard {
  type: 'national_id';
  dob: string;
  finNumber: string;
}

export interface KebeleID extends BaseCard {
  type: 'kebele_id';
  idNumber: string;
  dob: string;
  bloodType: string;
  emergencyContact: string;
}

export interface CoopATM extends BaseCard {
  type: 'coop_atm';
  accountNumber: string;
  atmNumber: string;
}

export type Card = DriversLicense | NationalID | KebeleID | CoopATM;
