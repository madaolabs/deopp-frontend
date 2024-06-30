import { useRouter } from "next/navigation";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { ellipseAddress } from "@/utils";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@mui/material";
import { useAddSalary } from "@/client/Home/components/AddSalary";

const WalletDisconnectButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletDisconnectButton,
  { ssr: false }
);
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export const DHeader = () => {
  const { publicKey, connected, connect } = useWallet();
  const router = useRouter();
  const { UI: AddSalaryUI, openModal: openSalaryModal } = useAddSalary(
    () => {}
  );

  return (
    <div className="flex w-full justify-between bg-white border-b px-6 py-3 sm:px-10 md:px-20">
      <div
        className="text-bold flex cursor-pointer items-center"
        onClick={() => {
          router.push("/");
        }}
      >
        <Image
          src="/assets/logo.svg"
          width={0}
          height={0}
          className="mr-2 w-10"
          alt={""}
        ></Image>
        <span className="font-bold text-xl">Dopp</span>
      </div>
      <div className="relative">
        <Button variant="outlined" onClick={openSalaryModal}>
          Submit Salary
        </Button>
        {/* {connected && publicKey ? (
          <WalletDisconnectButtonDynamic style={{ background: "#05A17E" }}>
            {ellipseAddress(publicKey.toBase58(), 8, 4)}
          </WalletDisconnectButtonDynamic>
        ) : (
          <WalletMultiButtonDynamic style={{ background: "#05A17E" }}>
            Connect
          </WalletMultiButtonDynamic>
        )} */}
      </div>
    </div>
  );
};
