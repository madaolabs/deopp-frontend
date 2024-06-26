import { cookies, headers } from "next/headers";
import { Home } from "@/client/Home";
import { fallbackLng, languages } from "@/i18n/settings";
import acceptLanguage from "accept-language";
import { Metadata } from "next";
import { usePublicStore } from "@/store/global";
import { getSalaryAverage } from "@/api";
import { IAvgSalary, IPositionType } from "@/client/Home/types";

acceptLanguage.languages(languages);

export async function generateMetadata(): Promise<Metadata> {
  const lng =
    acceptLanguage.get(headers().get("Accept-Language")) ?? fallbackLng;
  if (lng === "zh") {
    return {
      title: "Dopp - 职场人求职工具",
      description:
        "Dopp 是为职场人求职的Web3解决方案。我们致力于为职场人提供薪资与技能水平的匹配方案, 技能辅导, 提前面试",
      keywords: "Dopp,找工作,薪资水平,模拟面试",
    };
  } else {
    return {
      title: "Dopp - Job Search tool for professionals",
      description:
        "Dopp is the Web3 solution for job seekers. We are committed to providing salary and skill level matching programs, skills coaching, and early interviews.",
      keywords: "Dopp, job search, salary level, mock interview",
    };
  }
}

export default async function RootUrl({ params }: { params: { lng: string } }) {
  let defaultPositionList: IPositionType[] = [];
  let defaultAvgSalaryList: IAvgSalary[] = [];
  try {
    const { positionList } = usePublicStore.getState();
    defaultPositionList = positionList || [];
  } catch (error) {
    console.log("server request error", error);
  }

  return (
    <Home
      defaultData={{
        positionList: defaultPositionList,
        avgSalaryList: defaultAvgSalaryList,
      }}
    />
  );
}
