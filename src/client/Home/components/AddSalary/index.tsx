"use client";
import { Button, MenuItem, Modal, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import * as Yup from "yup";

import { useWallet } from "@solana/wallet-adapter-react";
import { useFormik, Form, FormikProvider } from "formik";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { DSnackbar } from "@/components/DSnackbar";
import { usePublicStore } from "@/store/global";
import { getS3Token, submitSalary } from "@/api";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

const bucketRegion = "ap-southeast-1";
const albumBucketName = "deopp-contract";

export const useAddSalary = (refreshFunc: Function) => {
  const { addressList, currencyList, companyList, positionList } =
    usePublicStore();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { setVisible } = useWalletModal();
  const [s3Token, setS3Token] = useState<{
    accessKeyId: string;
    sessionToken: string;
    secretAccessKey: string;
  } | null>(null);
  const { publicKey, connected, connect, select } = useWallet();
  const [contractName, setContractName] = useState("");

  useEffect(() => {
    queryS3Token();
  }, []);

  const s3Client = useMemo(() => {
    if (s3Token) {
      return new S3Client({
        region: bucketRegion,
        credentials: {
          accessKeyId: s3Token.accessKeyId,
          secretAccessKey: s3Token.secretAccessKey,
          sessionToken: s3Token.sessionToken,
        },
      });
    }
  }, [s3Token]);

  const queryS3Token = async () => {
    getS3Token()
      .then((token) => {
        setS3Token(token);
      })
      .catch((error) => {
        console.error("error===>", error);
      });
  };

  const formik = useFormik({
    initialValues: {
      companyId: "",
      positionId: "",
      cityId: "",
      workYear: "",
      currencyId: "",
      basicSalary: "0",
      extraSalary: "0",
      companyName: "",
      positionName: "",
    },
    validationSchema: Yup.object({
      companyId: Yup.string().required(),
      positionId: Yup.string().required(),
      cityId: Yup.string().required(),
      currencyId: Yup.string().required(),
      workYear: Yup.number().required(),
      basicSalary: Yup.string().required(),
      extraSalary: Yup.string().required(),
    }),
    onSubmit: async (values, formikHelpers) => {
      console.log("values===>", values);
      console.log("formikHelpers===>", formikHelpers);

      try {
        const address = publicKey?.toBase58();
        if (!address) return;
        await submitSalary({ ...values, walletAddress: address });
        if (contractName) {
          DSnackbar.success(
            `Submit Successfully. We will send token to: ${address}`,
            5000
          );
        }
        refreshFunc && refreshFunc();
        closeModal();
      } catch (error) {
        DSnackbar.error(`Submit Failed.`);
      }
    },
  });

  const { getFieldProps, handleSubmit, resetForm, errors } = formik;

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setContractName(name);
    const fileKey = `${publicKey?.toBase58()}-${name}`;

    const input = {
      Body: file,
      Bucket: albumBucketName,
      Key: fileKey,
    };

    const command = new PutObjectCommand(input);
    await s3Client?.send(command);
  };

  const handleDelFile = async (name: string) => {
    setContractName("");
    const fileKey = `${publicKey?.toBase58()}-${name}`;

    const input = {
      Bucket: albumBucketName,
      Key: fileKey,
    };
    const command = new DeleteObjectCommand(input);
    await s3Client?.send(command);
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
              required
              fullWidth
              select
              className="!mb-4"
              label="Company"
              {...getFieldProps("companyId")}
              error={!!errors.companyId}
              helperText={errors.companyId}
            >
              {companyList.map((company) => (
                <MenuItem key={company.id} value={company.id}>
                  {company.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              fullWidth
              select
              className="!mb-4"
              label="Position"
              {...getFieldProps("positionId")}
              error={!!errors.positionId}
              helperText={errors.positionId}
            >
              {positionList.map((position) => (
                <MenuItem key={position.id} value={position.id}>
                  {position.nameChs}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              fullWidth
              select
              className="!mb-4"
              label="Address"
              {...getFieldProps("cityId")}
              error={!!errors.cityId}
              helperText={errors.cityId}
            >
              {(addressList || []).map((address) => (
                <MenuItem key={address.id} value={address.id}>
                  {address.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
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
              error={!!errors.workYear}
              helperText={errors.workYear}
            >
              {/* {new Array(40).fill(undefined).map((_, index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  {index + 1}
                </MenuItem>
              ))} */}
            </TextField>
            <TextField
              required
              fullWidth
              select
              className="!mb-4"
              label="Currency"
              {...getFieldProps("currencyId")}
              error={!!errors.currencyId}
              helperText={errors.currencyId}
            >
              {(currencyList || []).map((currency) => (
                <MenuItem key={currency.id} value={currency.id}>
                  {currency.label} ({currency.symbol})
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              fullWidth
              className="!mb-4"
              label="Basic Salary / Year"
              type="number"
              {...getFieldProps("basicSalary")}
              error={!!errors.basicSalary}
              helperText={errors.basicSalary}
            ></TextField>
            <TextField
              fullWidth
              required
              label="Extra Salary / Year"
              type="number"
              {...getFieldProps("extraSalary")}
              error={!!errors.extraSalary}
              helperText={errors.extraSalary}
            ></TextField>

            {contractName ? (
              <div className="flex justify-between mt-4 text-secondary">
                <span>{contractName}</span>
                <span
                  onClick={() => handleDelFile(contractName)}
                  className="cursor-pointer"
                >
                  <HighlightOffIcon />
                </span>
              </div>
            ) : (
              s3Token && (
                <div>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<UploadFileIcon />}
                    className="!mt-4"
                    sx={{ marginRight: "1rem" }}
                  >
                    Upload Contract
                    <input
                      type="file"
                      accept=".pdf"
                      hidden
                      onChange={handleFileUpload}
                    />
                  </Button>
                  <div className="text-xs italic mt-3 text-red-600">
                    * Get rewards after uploaded contract
                  </div>
                </div>
              )
            )}
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
