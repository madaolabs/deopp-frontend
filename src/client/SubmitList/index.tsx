"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import numeral from "numeral";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Card,
  styled,
  tableCellClasses,
  Skeleton,
} from "@mui/material";
import { getCompanyDetail, getRecordList } from "@/api";
import { DPageContainer } from "@/components/DPageContainer";
import { ICompany, IRecord } from "@/types";
import { useSearchParams } from "next/navigation";
import { ellipseAddress } from "@/utils";
import Image from "next/image";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const SubmitList = () => {
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId");
  const positionId = searchParams.get("positionId");
  const addressId = searchParams.get("addressId");
  const [companyInfo, setCompanyInfo] = useState<ICompany>();
  const [recordList, setRecordList] = useState<IRecord[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!companyId || !positionId) return;
    setLoading(true);
    getRecordList(
      pagination.currentPage,
      pagination.pageSize,
      companyId,
      positionId
    )
      .then((data) => {
        setRecordList(data.records || []);
        setTotal(data.total);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [companyId, positionId, addressId, pagination]);

  useEffect(() => {
    if (companyId) {
      getCompanyDetail(companyId).then((data) => {
        console.log("data==>", data);

        setCompanyInfo(data);
      });
    }
  }, [companyId]);

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPagination({ ...pagination, currentPage: newPage + 1 });
  }, []);

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setPagination({
        currentPage: 1,
        pageSize: updatedRowsPerPage,
      });
    },
    []
  );

  return (
    <DPageContainer>
      <Card className="sm:p-10 p-6">
        <div className="m-auto flex w-10/12">
          <Image
            src={companyInfo?.logo || ""}
            width={48}
            height={0}
            className="mr-8 object-contain"
            quality={100}
            // unoptimized
            alt={""}
          ></Image>
          <div>
            <div className="mb-2 text-2xl">{companyInfo?.name}</div>
            <div className="text-sm text-[var(--primary-text-color)]">
              {companyInfo?.description}
            </div>
          </div>
        </div>
      </Card>
      <div className="m-auto my-6 w-11/12 lg:w-10/12">
        <Card className="p-2 overflow-auto">
          {loading && (
            <>
              <Skeleton variant="rounded" height={40} className="mb-2" />
              <Skeleton variant="rounded" height={40} className="mb-2" />
              <Skeleton variant="rounded" height={40} />
            </>
          )}
          {!loading && (
            <>
              <Table className="whitespace-nowrap">
                <TableHead>
                  <TableRow>
                    <StyledTableCell className="!hidden sm:!table-cell">
                      Wallet Address
                    </StyledTableCell>
                    <StyledTableCell>City</StyledTableCell>
                    <StyledTableCell align="right">
                      Basic Salary
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Extra Salary
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(recordList || []).map((record, recordIndex) => (
                    <StyledTableRow key={recordIndex}>
                      <StyledTableCell className="!hidden sm:!table-cell">
                        {ellipseAddress(record.walletAddress, 10, 5)}
                      </StyledTableCell>
                      <StyledTableCell>{record.cityName}</StyledTableCell>
                      <StyledTableCell align="right">
                        {record.currencyName}{" "}
                        {numeral(record.basicSalary).format("0,0")}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {record.currencyName}{" "}
                        {numeral(record.extraSalary).format("0,0")}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[10, 20]}
                component="div"
                count={total}
                rowsPerPage={pagination.pageSize}
                page={pagination.currentPage - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Card>
      </div>
    </DPageContainer>
  );
};
