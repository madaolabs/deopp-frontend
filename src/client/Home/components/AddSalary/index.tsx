"use client";
import { Button, MenuItem, Modal, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useFormik, Form, FormikProvider } from "formik";
import { DSnackbar } from "@/components/DSnackbar";
import { usePublicStore } from "@/store/global";
import { submitSalary } from "@/api";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export const useAddSalary = (refreshFunc: Function) => {
  const { addressList, currencyList, companyList, positionList } =
    usePublicStore();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { setVisible } = useWalletModal();
  const { publicKey, connected, connect, select } = useWallet();
  console.log("addressList===>", addressList);

  const formik = useFormik({
    initialValues: {
      companyId: "",
      positionId: "",
      cityId: "",
      workYear: "",
      currencyId: "",
      basicSalary: "",
      extraSalary: "",
      companyName: "",
      positionName: "",
    },
    onSubmit: async (values) => {
      try {
        const address = publicKey?.toBase58();
        if (!address) return;
        await submitSalary({ ...values, walletAddress: address });
        DSnackbar.success(
          `Submit Successfully. We will send token to: ${address}`,
          5000
        );
        refreshFunc && refreshFunc();
        closeModal();
      } catch (error) {
        DSnackbar.error(`Submit Failed.`);
      }
    },
  });

  const { getFieldProps, handleSubmit, resetForm } = formik;

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const UI = useMemo(
    () => (
      <Modal open={showModal} onClose={closeModal}>
        <FormikProvider value={formik}>
          <Form
            onSubmit={handleSubmit}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 pb-6 pt-6 focus:outline-none focus-visible:outline-none sm:w-2/3 md:w-1/2 xl:w-1/3"
          >
            <div className="pb-6 text-center font-semibold">
              Submit My Salary
            </div>
            <TextField
              fullWidth
              select
              className="!mb-4"
              label="Company"
              {...getFieldProps("companyId")}
            >
              {companyList.map((company) => (
                <MenuItem key={company.id} value={company.id}>
                  {company.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              className="!mb-4"
              label="Position"
              {...getFieldProps("positionId")}
            >
              {positionList.map((position) => (
                <MenuItem key={position.id} value={position.id}>
                  {position.nameChs}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              className="!mb-4"
              label="Address"
              {...getFieldProps("cityId")}
            >
              {(addressList || []).map((address) => (
                <MenuItem key={address.id} value={address.id}>
                  {address.nameChs} ({address.name})
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              className="!mb-4"
              label="WorkYear"
              type="number"
              {...getFieldProps("workYear")}
              inputProps={{
                inputMode: "decimal",
                pattern: "[0-9]*",
                max: 80,
                min: 0,
              }}
            >
              {/* {new Array(40).fill(undefined).map((_, index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  {index + 1}
                </MenuItem>
              ))} */}
            </TextField>
            <TextField
              fullWidth
              select
              className="!mb-4"
              label="Currency"
              {...getFieldProps("currencyId")}
            >
              {currencyList.map((currency) => (
                <MenuItem key={currency.id} value={currency.id}>
                  {currency.label} ({currency.symbol})
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              className="!mb-4"
              label="Basic Salary / Year"
              type="number"
              {...getFieldProps("basicSalary")}
            ></TextField>
            <TextField
              fullWidth
              label="Extra Salary / Year"
              type="number"
              {...getFieldProps("extraSalary")}
            ></TextField>
            <div className="flex justify-end">
              <Button
                variant="outlined"
                className="!mr-4 !mt-4"
                size="small"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button variant="contained" className="!mt-4" type="submit">
                Yes
              </Button>
            </div>
          </Form>
        </FormikProvider>
      </Modal>
    ),
    [closeModal]
  );

  const openModal = async () => {
    try {
      if (!connected) {
        setVisible(true);
        return;
      }
      if (!showModal) {
        setShowModal(true);
      }
    } catch (error) {
      const { message } = error as Error;
      DSnackbar.error(message);
    }
  };

  return { UI, closeModal, openModal };
};
