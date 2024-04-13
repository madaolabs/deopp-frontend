export interface ICurrency {
  id: string;
  label: string;
  symbol: string;
}

export interface IAddress {
  id: string;
  nameChs: string;
  name: string;
}

export interface ICompany {
  id: string;
  name: string;
  logo: string;
  description: string;
}

export interface ISubmitSalary {
  companyId: string;
  positionId: string;
  cityId: string;
  workYear: string;
  basicSalary: number;
  extraSalary: number;
  currencyId: string;
  walletAddress: string;
  // other
  companyName?: string;
  positionName?: string;
}

export interface IRecord extends Omit<ICompany, "description"> {
  basicSalary: string;
  extraSalary: string;
  currencyName: string;
  cityName: string;
  walletAddress: string;
}
