import { cookies, headers } from "next/headers";
import { Home } from "@/client/Home";
import { fallbackLng, languages } from "@/i18n/settings";
import acceptLanguage from "accept-language";
import { Metadata } from "next";

acceptLanguage.languages(languages);

export async function generateMetadata(): Promise<Metadata> {
  const lng =
    acceptLanguage.get(headers().get("Accept-Language")) ?? fallbackLng;
  if (lng === "zh") {
    return {
      title: "Deopp - 职场人求职工具",
      description:
        "Deopp 是为职场人求职的Web3解决方案。我们致力于为职场人提供薪资与技能水平的匹配方案, 技能辅导, 提前面试",
      keywords: "Deopp,找工作,薪资水平,模拟面试",
    };
  } else {
    return {
      title: "Deopp - Job Search tool for professionals",
      description:
        "Deopp is the Web3 solution for job seekers. We are committed to providing salary and skill level matching programs, skills coaching, and early interviews.",
      keywords: "Deopp, job search, salary level, mock interview",
    };
  }
}

export default async function RootUrl({ params }: { params: { lng: string } }) {
  // const Node = await Token({ params });
  return <Home />;
}