"use client";
import { useEffect, useRef, useState } from "react";
import numeral from "numeral";
import { DPageContainer } from "@/components/DPageContainer";
import { Card, Button, CircularProgress } from "@mui/material";
import { getSalaryAverage } from "@/api";
import { IAvgSalary, IPositionType } from "./types";
import { useAddSalary } from "./components/AddSalary";
import { usePublicStore } from "@/store/global";
import { useRouter } from "next/navigation";
import Image from "next/image";
import OverFlowXMore from "@/components/OverFlowXMore";

interface IHomeProps {
  defaultData: {
    positionList: IPositionType[];
    avgSalaryList: IAvgSalary[];
  };
}

export const Home = ({ defaultData }: IHomeProps) => {
  const [companyList, setCompanyList] = useState<IAvgSalary[]>(
    defaultData.avgSalaryList || []
  );
  const loadingPositionRef = useRef(false);
  const queryPositionParamsRef = useRef({ page: 1, pageSize: 10 });
  const { positionList: clientPositionList, queryPositionList } =
    usePublicStore();
  const { positionList: defaultPositionList } = defaultData;
  const positionList =
    clientPositionList.length > 0 ? clientPositionList : defaultPositionList;

  const [activePositionId, setActivePositionId] = useState<number>(
    positionList?.[0]?.id
  );
  console.log("activePositionId", activePositionId, positionList);

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { UI: AddSalaryUI, openModal: openSalaryModal } = useAddSalary(() =>
    handleChangePosition(activePositionId)
  );

  const handleChangePosition = async (positionId: number) => {
    setActivePositionId(positionId);
  };

  const querySalaryAverageData = async (positionId: number) => {
    try {
      setActivePositionId(positionId);
      setLoading(true);
      const serviceData = await getSalaryAverage(positionId);
      setCompanyList(serviceData?.companies || []);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const toRecords = ({
    companyId,
    positionId,
  }: {
    companyId: string;
    positionId: string;
  }) => {
    router.push(`/en/submit?companyId=${companyId}&positionId=${positionId}`);
  };

  const handleScroll = async (e: any) => {
    const scrollLeft = e.target.scrollLeft;
    const clientWidth = e.target.clientWidth;
    const scrollWidth = e.target.scrollWidth;

    if (
      scrollLeft + clientWidth > scrollWidth * 0.9 &&
      !loadingPositionRef.current
    ) {
      loadingPositionRef.current = true;
      queryPositionParamsRef.current = {
        page: queryPositionParamsRef.current.page + 1,
        pageSize: queryPositionParamsRef.current.pageSize,
      };
      try {
        await queryPositionList(queryPositionParamsRef.current);
      } finally {
        loadingPositionRef.current = false;
      }
    }
  };

  useEffect(() => {
    if (activePositionId) {
      querySalaryAverageData(activePositionId);
    }
  }, [activePositionId]);

  // useEffect(() => {
  //   setActivePositionId(positionList?.[0]?.id);
  // }, [positionList]);

  return (
    <DPageContainer>
      <div className="m-auto my-6 w-11/12 md:w-10/12">
        <Card className="mb-6 flex w-full justify-between rounded-lg py-6 pl-5 pr-24">
          <div>
            <div className="mb-4 text-2xl font-semibold text-black">
              Add Salary Rewards
            </div>
            <div
              className="cursor-pointer font-semibold text-[#2076FF]"
              onClick={() => openSalaryModal()}
            >
              Add immediately
            </div>
          </div>
          <Image
            src="/assets/home_banner.webp"
            width={0}
            height={0}
            className="object-cover lg:w-48 xl:w-64"
            unoptimized
            alt={""}
          ></Image>
        </Card>
        <div className="mb-4">
          <OverFlowXMore onScroll={handleScroll}>
            {positionList.map((position) => (
              <Button
                key={position.id}
                size="small"
                variant="outlined"
                // color="neutral"
                className={`!mr-4 !font-normal !leading-8 ${
                  position.id === activePositionId &&
                  "!bg-[var(--primary-color)] !text-white"
                }`}
                onClick={() => handleChangePosition(position.id)}
              >
                {position.nameEng}
              </Button>
            ))}
          </OverFlowXMore>
        </div>
        {loading && (
          <Card className="flex flex-col items-center py-8">
            <CircularProgress />
            <span className="mt-4">loading...</span>
          </Card>
        )}

        {!loading && (
          <Card className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 p-8">
            {(companyList || []).map((company) => (
              <div
                key={`${company.currency}-${company.companyId}`}
                className="flex cursor-pointer gap-4 rounded-lg border-4 border-[rgba(42,121,155,.05)] px-3 py-4"
                onClick={() =>
                  toRecords({
                    companyId: company.companyId,
                    positionId: company.positionId,
                  })
                }
              >
                <Image
                  src={company.companyLogo}
                  width={0}
                  height={0}
                  className="h-10 w-10 object-cover"
                  unoptimized
                  alt={""}
                />
                <div>
                  <div className="text-xs font-semibold">
                    {company.companyName}
                  </div>
                  <div className="mb-2 mt-1 text-xs text-[#767676]">
                    {company.companyAddress}
                  </div>
                  <div className="text-xs">
                    <span className="text-[#05A17E]">
                      {company.currency}{" "}
                      {numeral(company.avgSalary).format("0,0")}
                    </span>
                    <span> / Year</span>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        )}
      </div>
      {AddSalaryUI}
    </DPageContainer>
  );
};
