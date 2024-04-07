"use client";
import { Button } from "@mui/material";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
  useWalletModal,
} from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { ellipseAddress } from "@/utils";

export const DHeader = () => {
  const web3BtnRef = useRef<any>(null);
  const { connection } = useConnection();
  const { publicKey, connected, connect } = useWallet();
  const router = useRouter();

  const handleConnect = async () => {
    await connect();
  };

  const handleDisconnect = async () => {};

  return (
    <div className="flex w-full justify-between bg-white px-6 py-3 sm:px-10 md:px-20">
      <div
        className="text-bold flex cursor-pointer items-center"
        onClick={() => {
          router.push("/");
        }}
      >
        <img src="/assets/logo.svg" className="mr-2"></img>Deopp
      </div>
      <div className="relative">
        {connected && publicKey ? (
          <WalletDisconnectButton style={{ background: "#05A17E" }}>
            {ellipseAddress(publicKey.toBase58(), 8, 4)}
          </WalletDisconnectButton>
        ) : (
          <WalletMultiButton style={{ background: "#05A17E" }}>
            Connect
          </WalletMultiButton>
        )}
      </div>
    </div>
  );
};
