import { analyzeRes } from "@/utils";
import requestIns from "./client";
import { ISubmitSalary } from "@/types";

const apiPre = "/api/v1";

const positionURL = apiPre + "/positions";
const salaryAverageURL = apiPre + "/salary/average";
const submitSalaryURL = apiPre + "/salary/add";
const addressListURL = apiPre + "/city/list";
const fiatListURL = apiPre + "/currency/list";
const recordListURL = apiPre + "/salary/list";
const companyDetailURL = apiPre + "/company/detail";
const companyListURL = apiPre + "/company/list";

export const getPositionList = async (params: {
  page: number;
  pageSize: number;
}) => {
  const { data } = await requestIns.get(positionURL, { params });
  return analyzeRes(data);
};

export const getAddressList = async () => {
  const { data } = await requestIns.get(addressListURL);
  return analyzeRes(data);
};

export const getFiatList = async () => {
  const { data } = await requestIns.get(fiatListURL);
  return analyzeRes(data);
};

export const getRecordList = async (
  page: number,
  pageSize: number,
  companyId: string,
  positionId: string
) => {
  const { data } = await requestIns.get(recordListURL, {
    params: {
      page,
      pageSize,
      companyId,
      positionId,
    },
  });
  return analyzeRes(data);
};

export const getCompanyDetail = async (companyId: string) => {
  const { data } = await requestIns.get(companyDetailURL, {
    params: {
      companyId,
    },
  });
  return analyzeRes(data);
};

export const getSalaryAverage = async (positionId: string) => {
  const { data } = await requestIns.get(salaryAverageURL, {
    params: {
      positionId,
    },
  });
  return analyzeRes(data);
};

export const submitSalary = async (body: ISubmitSalary) => {
  await requestIns.post(submitSalaryURL, body);
};

export const getCompanyList = async () => {
  const { data } = await requestIns.get(companyListURL);
  return analyzeRes(data);
};
