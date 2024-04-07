import { IPositionType } from "@/client/Home/types";
import {
  getAddressList,
  getCompanyList,
  getFiatList,
  getPositionList,
} from "@/api";
import { IAddress, ICompany, ICurrency } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

class PublicStore {
  constructor(readonly set: any, readonly get: any) {}
  jobList = [];
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
      console.log("serRes===>", serRes);

      this.set({
        addressList: serRes?.addresses || [],
      });
    } catch (error) {}
  };
  queryCurrencyList = async () => {
    try {
      const { currencyList } = await getFiatList();
      console.log("currencyList===", currencyList);

      this.set({
        currencyList,
      });
    } catch (error) {}
  };
  queryPositionList = async (params: { page: number; pageSize: number }) => {
    try {
      const { list } = (await getPositionList(params)) ?? { list: [] };
      this.set({
        positionList: list,
      });
    } catch (error) {}
  };
}

export const usePublicStore = create(
  persist<PublicStore>((set, get) => new PublicStore(set, get), {
    name: "public",
  })
);
