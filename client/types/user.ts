export interface IProfileUpdateBody {
  name: string;
  email: string;
}

export interface IChangePasswordBody {
  currentPassword: string;
  newPassword: string;
}

export interface ICurrentUserInfo {
  name: string;
  email: string;
  receiveUpdates: boolean;
  organization: {
    email: string;
    billingInformation: {
      name: string;
      address: string;
      country: string;
      zipCode: string;
      vatNumber: string;
      vatCountry: string;
    };
  };
}
