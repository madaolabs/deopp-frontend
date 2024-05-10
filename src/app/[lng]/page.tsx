import { getSalaryAverage } from "@/api";
import { Home } from "@/client/Home";
import { IAvgSalary, IPositionType } from "@/client/Home/types";
import { usePublicStore } from "@/store/global";

export default async function RootUrl({ params }: { params: { lng: string } }) {
  let defaultPositionList: IPositionType[] = [];
  let defaultAvgSalaryList: IAvgSalary[] = [];
  try {
    // const { queryPositionList } = usePublicStore.getState();
    // await queryPositionList({ page: 1, pageSize: 10 });
    const { positionList } = usePublicStore.getState();
    defaultPositionList = positionList || [];
    // if (positionList && positionList.length) {
    //   const serAvgSalary = await getSalaryAverage(positionList[0]?.id);
    //   defaultAvgSalaryList = serAvgSalary?.companies || [];
    // }
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
