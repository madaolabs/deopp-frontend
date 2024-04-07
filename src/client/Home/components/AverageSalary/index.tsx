import { Avatar } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { IAverageSalary } from './types';

export const AverageSalary = (props: IAverageSalary) => {
  const { companyLogo, companyName, companyAddress, averageSalary } = props;
  return (
    <div className="flex p-5">
      <div className="w-1/6 pr-4">
        <Avatar src={companyLogo}>{companyName}</Avatar>
      </div>
      <div className="flex-1">
        <div className="text-sm">{companyName}</div>
        <div>
          <LocationOnIcon></LocationOnIcon>
          <span className="">{companyAddress}</span>
        </div>
      </div>
    </div>
  );
};
