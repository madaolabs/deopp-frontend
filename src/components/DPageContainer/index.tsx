import { PropsWithChildren } from "react";
import { DHeader } from "../DHeader";

export const DPageContainer = (props: PropsWithChildren) => {
  return (
    <>
      <DHeader></DHeader>
      {props.children}
    </>
  );
};
