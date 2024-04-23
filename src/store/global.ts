import { IPositionType } from "@/client/Home/types";
import {
  getAddressList,
  getCompanyList,
  getFiatList,
  getPositionList,
} from "@/api";
import { IAddress, ICompany, ICurrency } from "@/types";
import { create } from "zustand";

class PublicStore {
  constructor(readonly set: any, readonly get: any) {}
  companyList: ICompany[] = [];
  addressList: IAddress[] = [];
  currencyList: ICurrency[] = [];
  positionList: IPositionType[] = [];
  init = async () => {
    this.queryPositionList({ page: 1, pageSize: 10 });
    this.queryAddressList();
    this.queryCurrencyList();
    this.queryCompanyList();
  };
  queryCompanyList = async () => {
    try {
      const { companyList } = await getCompanyList();
      this.set({
        companyList,
      });
    } catch (error) {}
  };
  queryAddressList = async () => {
    try {
      const serRes = await getAddressList();

      this.set({
        addressList: serRes?.addresses || [],
      });
    } catch (error) {}
  };
  queryCurrencyList = async () => {
    try {
      const { currencyList } = await getFiatList();

      this.set({
        currencyList,
      });
    } catch (error) {}
  };
  queryPositionList = async (params: { page: number; pageSize: number }) => {
    try {
      const { list } = (await getPositionList(params)) ?? { list: [] };
      const { positionList } = this.get();
      this.set({
        positionList: params.page === 1 ? list : [...positionList, ...list],
      });
    } catch (error) {}
  };
}

export const usePublicStore = create<PublicStore>(
  (set, get) => new PublicStore(set, get)
);
