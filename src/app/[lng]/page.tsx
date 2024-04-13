import { getSalaryAverage } from "@/api";
import { Home } from "@/client/Home";
import { IPositionType } from "@/client/Home/types";
import { usePublicStore } from "@/store/global";

export default async function RootUrl({ params }: { params: { lng: string } }) {
  let defaultPositionList: IPositionType[] = [];
  let defaultAvgSalaryList = [];
  try {
    const { queryPositionList } = usePublicStore.getState();
    await queryPositionList({ page: 1, pageSize: 100 });
    const { positionList } = usePublicStore.getState();
    defaultPositionList = positionList || [];
    if (positionList && positionList.length) {
      const serAvgSalary = await getSalaryAverage(positionList[0]?.id);
      defaultAvgSalaryList = serAvgSalary?.companies || [];
    }
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
