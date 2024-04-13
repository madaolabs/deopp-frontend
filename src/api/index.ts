import { analyzeRes } from "@/utils";
import requestIns from "./client";
import { ISubmitSalary } from "@/types";

const apiPre = "/api/v1";

const positionURL = apiPre + "/positions";
const salaryAverageURL = apiPre + "/salary/average";
const submitSalaryURL = apiPre + "/salary/add";
const addressListURL = apiPre + "/city/list";
const fiatListURL = apiPre + "/currency/list";
const recordListURL = apiPre + "/salary/record";
const companyDetailURL = apiPre + "/company/detail";
const companyListURL = apiPre + "/company/list";
const s3TokenURL = apiPre + "/s3token";

const NEXT_PUBLIC_MAIN_DOMAIN = process.env.NEXT_PUBLIC_MAIN_DOMAIN;

export const getPositionList = async (params: {
  page: number;
  pageSize: number;
}) => {
  const data = await fetch(
    `${NEXT_PUBLIC_MAIN_DOMAIN}${positionURL}?page=${params.page}&pageSize=${params.pageSize}`
  ).then((res) => res.json());
  return analyzeRes(data);
};

export const getAddressList = async () => {
  const data = await fetch(`${NEXT_PUBLIC_MAIN_DOMAIN}${addressListURL}`).then(
    (res) => res.json()
  );
  return analyzeRes(data);
};

export const getFiatList = async () => {
  const data = await fetch(`${NEXT_PUBLIC_MAIN_DOMAIN}${fiatListURL}`).then(
    (res) => res.json()
  );
  return analyzeRes(data);
};

export const getRecordList = async (
  page: number,
  pageSize: number,
  companyId: string,
  positionId: string
) => {
  const data = await fetch(
    `${NEXT_PUBLIC_MAIN_DOMAIN}${recordListURL}?page=${page}&pageSize=${pageSize}&companyId=${companyId}&positionId=${positionId}`
  ).then((res) => res.json());
  return analyzeRes(data);
};

export const getCompanyDetail = async (companyId: string) => {
  const data = await fetch(
    `${NEXT_PUBLIC_MAIN_DOMAIN}${companyDetailURL}?companyId=${companyId}`
  ).then((res) => res.json());
  return analyzeRes(data);
};

export const getSalaryAverage = async (positionId: string) => {
  const data = await fetch(
    `${NEXT_PUBLIC_MAIN_DOMAIN}${salaryAverageURL}?positionId=${positionId}`
  ).then((res) => res.json());
  return analyzeRes(data);
};

export const submitSalary = async (body: ISubmitSalary) => {
  await requestIns.post(submitSalaryURL, body);
};

export const getCompanyList = async () => {
  const data = await fetch(`${NEXT_PUBLIC_MAIN_DOMAIN}${companyListURL}`).then(
    (res) => res.json()
  );
  return analyzeRes(data);
};

export const getS3Token = async () => {
  const data = await fetch(`${NEXT_PUBLIC_MAIN_DOMAIN}${s3TokenURL}`).then(
    (res) => res.json()
  );
  return analyzeRes(data);
};
