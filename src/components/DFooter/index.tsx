import Image from "next/image";

export const DFooter = () => {
  return (
    <div className="flex justify-between">
      <div className="grid grid-cols-4 gap-4">
        <div>
          <div className="text-bold flex items-center">
            <Image
              src="/assets/logo.svg"
              width={0}
              height={0}
              className="mr-2 w-10"
              alt={""}
            ></Image>
            Deopp
          </div>
          <div className="text-sm">Equal opportunity for all</div>
        </div>
        <div className="text-semibold"></div>
        <div></div>
        <div></div>
      </div>
      <div></div>
    </div>
  );
};
