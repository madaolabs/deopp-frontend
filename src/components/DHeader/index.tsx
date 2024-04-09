import { useRouter } from "next/navigation";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { ellipseAddress } from "@/utils";
import dynamic from "next/dynamic";
import Image from "next/image";

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

  return (
    <div className="flex w-full justify-between bg-white px-6 py-3 sm:px-10 md:px-20">
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
        Deopp
      </div>
      <div className="relative">
        {connected && publicKey ? (
          <WalletDisconnectButtonDynamic style={{ background: "#05A17E" }}>
            {ellipseAddress(publicKey.toBase58(), 8, 4)}
          </WalletDisconnectButtonDynamic>
        ) : (
          <WalletMultiButtonDynamic style={{ background: "#05A17E" }}>
            Connect
          </WalletMultiButtonDynamic>
        )}
      </div>
    </div>
  );
};
