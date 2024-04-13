"use client";
import { useEffect, useMemo, useState } from "react";
import { DPageContainer } from "@/components/DPageContainer";
import {
  Card,
  Button,
  Tooltip,
  Select,
  MenuItem,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  ClickAwayListener,
  Modal,
  TextField,
  Box,
} from "@mui/material";
import { getPositionList, getSalaryAverage } from "@/api";
import { IAvgSalary, ICompanyInfo, IPositionType } from "./types";
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
  const { positionList: clientPositionList } = usePublicStore();
  const { positionList: defaultPositionList } = defaultData;
  const positionList = defaultPositionList || clientPositionList;

  const [activePositionId, setActivePositionId] = useState<string>(
    defaultPositionList?.[0]?.id || positionList?.[0]?.id
  );

  const router = useRouter();
  const { UI: AddSalaryUI, openModal: openSalaryModal } = useAddSalary(() =>
    handleChangePosition(activePositionId)
  );

  const handleChangePosition = async (positionId: string) => {
    try {
      const serviceData = await getSalaryAverage(positionId);
      setCompanyList(serviceData?.companies || []);
      setActivePositionId(positionId);
    } catch (error) {}
  };

  const PositionList = () => (
    <List classes={{ root: "text-gray-900 shadow-lg" }} disablePadding>
      {positionList.map((position) => (
        <ListItemButton
          divider
          key={position.id}
          selected={position.id === activePositionId}
          onClick={() => setActivePositionId(position.id)}
        >
          <ListItemText primary={position.nameChs} />
        </ListItemButton>
      ))}
    </List>
  );

  const toRecords = ({
    companyId,
    positionId,
  }: {
    companyId: string;
    positionId: string;
  }) => {
    router.push(`/en/submit?companyId=${companyId}&positionId=${positionId}`);
  };

  useEffect(() => {
    if (activePositionId) {
      handleChangePosition(activePositionId);
    }
  }, [activePositionId]);

  useEffect(() => {
    setActivePositionId(positionList?.[0]?.id);
  }, [positionList]);

  return (
    <DPageContainer>
      <div className="m-auto my-6 w-11/12 md:w-10/12">
        <Card className="mb-6 flex w-full justify-between rounded-lg bg-[var(--primary-block-bg)] py-6 pl-5 pr-24">
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
            src="/assets/home_banner.png"
            width={0}
            height={0}
            className="object-cover lg:w-48 xl:w-64"
            unoptimized
            alt={""}
          ></Image>
        </Card>
        <div className="mb-4">
          <OverFlowXMore>
            {positionList.map((position) => (
              <Button
                key={position.id}
                size="small"
                variant="contained"
                color="neutral"
                className={`!mr-4 !font-normal !leading-6 ${
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
        <Card className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 p-8">
          {(companyList || []).map((company) => (
            <div
              key={`${company.currency}-${company.companyId}`}
              className="flex cursor-pointer gap-4 rounded-lg border border-gray-100 p-3 pb-2"
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
                    {company.currency} {company.avgSalary}
                  </span>
                  <span> / Year</span>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>
      {AddSalaryUI}
    </DPageContainer>
  );
};
