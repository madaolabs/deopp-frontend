"use client";
import { useEffect, useState } from "react";
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

export const Home = () => {
  const [companyList, setCompanyList] = useState<IAvgSalary[]>([]);
  const [showMore, setShowMore] = useState(false);
  const { positionList } = usePublicStore();

  const [activePositionId, setActivePositionId] = useState<string>(
    positionList?.[0]?.id
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

  const handleClickMore = (val: boolean) => {
    setShowMore(val);
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
    router.push(`/submit?companyId=${companyId}&positionId=${positionId}`);
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
          <img
            src="/assets/home_banner.png"
            className="w-64 object-contain"
          ></img>
        </Card>
        <div className="mb-4 flex">
          {positionList.slice(0, 5).map((position) => (
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
              {position.nameChs}
            </Button>
          ))}
          <ClickAwayListener onClickAway={() => handleClickMore(false)}>
            <Tooltip
              arrow
              PopperProps={{
                disablePortal: true,
              }}
              classes={{ tooltip: "w-72 !bg-white", arrow: "!text-white" }}
              title={<PositionList></PositionList>}
              onClose={() => handleClickMore(false)}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              open={showMore}
            >
              <Button
                size="small"
                variant="contained"
                color="neutral"
                className="!font-normal"
                onClick={() => handleClickMore(true)}
              >
                More
              </Button>
            </Tooltip>
          </ClickAwayListener>
        </div>
        <Card className="grid grid-cols-4 gap-4 p-8">
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
              <img src={company.companyLogo} className="h-10 w-10" />
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
