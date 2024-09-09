export interface ISaveBillingInfoBody {
  name: string;
  address: string;
  country: string;
  zipCode: string;
  vatNumber: string;
  vatCountry: string;
}

export interface IDeleteOrganizationBody {
  password: string;
}

export interface IBillingInformation {
  name: string;
  address: string;
  country: string;
  zipCode: string;
  vatNumber: string;
  vatCountry: string;
}

export interface IOrganization {
  email: string;
  billingInformation: IBillingInformation;
}
