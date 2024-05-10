export interface IPositionType {
  id: string | number;
  nameChs: string;
  nameEng: string;
}

export interface ISubPositionType {
  _id: string;
  name: string;
  subPositionId: string;
}

export interface ICompanyInfo {
  companyName: string;
  companyLogo: string;
  companyAddress: string; // city, state, country
  avgSalary: number;
  currency: string;
}

export interface IAvgSalary {
  companyId: string;
  positionId: string;
  companyName: string;
  companyLogo: string;
  companyAddress: string; // city, state, country
  avgSalary: number;
  currency: string;
}
