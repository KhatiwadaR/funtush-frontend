'use client';

//import Image from 'next/image';
import { getAgencyData } from '@/lib/agency/getAgencyData';
import ChartWave from './ChartWave';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupIcon from '@mui/icons-material/Group';
import WifiTetheringSharpIcon from '@mui/icons-material/WifiTetheringSharp';

type Props = {
  agencyId: string;
};

const iconSize = '!text-sm md:!text-xl lg:!text-2xl';

export default function StatCards({ agencyId }: Props) {
  const { bookings, income } = getAgencyData(agencyId);

  const totalBookings = bookings.reduce((sum, item) => sum + item.total_price, 0);
  const revenue = income.reduce((sum, item) => sum + item.amount, 0);
  const totalCustomers = bookings.length;

  const stat = [
    {
      label: 'Total Bookings',
      amount: `Rs ${totalBookings.toLocaleString()}`,
      icon: <CalendarMonthIcon className={iconSize} />,
      iconBg: 'bg-[#DAEBFF]',
      color: '#0088FF',
      iconColor: 'text-[#0088FF]',
      gradientColor1: '#436CCC',
      gradientColor2: '#2282FF',
      sub: 18.2,
      comparison: 'VS last 30 days',
    },
    {
      label: 'Revenue (This month)',
      amount: `Rs ${revenue.toLocaleString()}`,
      icon: <AttachMoneyIcon className={iconSize} />,
      iconBg: 'bg-[#E8FDE6]',
      color: '#34C759',
      iconColor: 'text-[#34C759]',
      gradientColor1: '#43CC55',
      gradientColor2: '#56FF22',
      sub: 12.2,
      comparison: 'VS last month',
    },
    {
      label: 'Total Customers',
      amount: totalCustomers,
      icon: <GroupIcon className={iconSize} />,
      iconBg: 'bg-[#E1E3FB]',
      color: '#6155F5',
      iconColor: 'text-[#6155F5]',
      gradientColor1: '#5143CC',
      gradientColor2: '#485BFF',
      sub: 4.8,
      comparison: 'VS last 30 days',
    },
    {
      label: 'Active Treks',
      amount: 1,
      icon: <WifiTetheringSharpIcon className={iconSize} />,
      iconBg: 'bg-[#FBFFDC]',
      color: '#FDA31C',
      iconColor: 'text-[#FDA31C]',
      gradientColor1: '#F1ED18',
      gradientColor2: '#FEC817',
      sub: 4.8,
      comparison: 'Live on trails',
    },
  ];

  return (
    <section className="w-full mt-2 grid gap-4 md:gap-7 grid-cols-[repeat(4,minmax(160px,1fr))] md:grid-cols-[repeat(4,minmax(260,1fr))] overflow-x-auto scrollbar-hide">
      {stat.map((item) => {
        return (
          <div
            key={item.label}
            className="w-full min-w-0 flex items-center justify-between p-1.5 md:p-2.5 rounded-lg bg-white shadow-sm"
          >
            <div className="w-max min-w-0 flex flex-col gap-y-0.5 md:gap-y-1 whitespace-nowrap py-1.5">
              <h3 className="text-[7px] md:text-xs font-semibold text-[#1A1A1A]">{item.label}</h3>
              <p className="text-[8px] md:text-sm font-semibold">{item.amount}</p>
              <p className="text-[7px] md:text-xs font-semibold text-[#34C759]">
                <span>
                  <PlayArrowIcon
                    className="!text-xs md:!text-base xl:!text-2xl m-[-2px] md:m-[-4px]"
                    sx={{ transform: 'rotate(270deg)' }}
                  />
                </span>{' '}
                {`${item.sub}%`}
              </p>
              <p className="text-[6px] md:text-[9.5px] text-[#45414A] font-medium">{item.comparison}</p>
            </div>
            <div className="flex flex-col">
              <div
                className={`flex w-5 h-5 items-center justify-center self-end rounded-full ${item.iconBg} ${item.iconColor} md:w-8 md:h-8 lg:w-8.5 lg:h-8.5`}
              >
                {item.icon}
              </div>
              <div className="w-[80px] h-[44px] md:w-[136px] md:h-[73px]">
                <ChartWave color={item.color} gradient={[item.gradientColor1, item.gradientColor2]} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
