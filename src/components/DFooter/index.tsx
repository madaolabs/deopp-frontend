import Image from "next/image";
import Link from "next/link";

export const DFooter = () => {
  return (
    <div className=" bg-white border-b px-6 py-6 sm:px-10 md:px-20">
      <div className="grid grid-cols-[100px,1fr] gap-4">
        <div>
          <div className="text-bold flex items-center">
            <Image
              src="/assets/logo.svg"
              width={0}
              height={0}
              className="mr-2 w-10"
              alt={""}
            ></Image>
            Dopp
          </div>
          <div className="text-sm mt-2 auto-cols-auto">
            <Link href="https://x.com/de_oppty">
              <Image
                src="/assets/twitter.svg"
                width={0}
                height={0}
                className="mr-2 w-5 "
                alt={""}
              ></Image>
            </Link>
          </div>
        </div>
        <div className="text-semibold text-lg text-center">
          Equal opportunity for all
        </div>
      </div>
    </div>
  );
};
