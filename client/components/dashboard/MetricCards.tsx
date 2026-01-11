import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';

// The waste data remains as local static data for the summary chart
const wasteData = {
  daily: {
    lbs: {
      summary: '1,284.6',
      chartData: [60, 40, 44, 83, 43, 69, 69],
      indicator: '200',
      status: 'increase',
      statusText: 'Increased from yesterday',
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    tons: {
      summary: '0.64',
      chartData: [0.03, 0.02, 0.022, 0.0415, 0.0215, 0.0345, 0.0345],
      indicator: '0.1',
      status: 'increase',
      statusText: 'Increased from yesterday',
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
  },
  weekly: {
    lbs: {
      summary: '8,992.2',
      chartData: [420, 280, 308, 581, 301, 483, 483],
      indicator: '1400',
      status: 'increase',
      statusText: 'Increased from last week',
      labels: ['1/5', '1/12', '1/19', '1/26', '2/2', '2/9', '2/16'],
    },
    tons: {
      summary: '4.5',
      chartData: [0.21, 0.14, 0.154, 0.2905, 0.1505, 0.2415, 0.2415],
      indicator: '0.7',
      status: 'increase',
      statusText: 'Increased from last week',
      labels: ['1/5', '1/12', '1/19', '1/26', '2/2', '2/9', '2/16'],
    },
  },
};

// Props are now comprehensive for all dynamic data
interface MetricCardsProps {
  totalProjects: number;
  totalProjectsIncrease: number;
  endedProjects: number;
  endedProjectsIncrease: number;
}

export default function MetricCards({ 
    totalProjects,
    totalProjectsIncrease,
    endedProjects,
    endedProjectsIncrease 
}: MetricCardsProps) {
  const [timePeriod, setTimePeriod] = useState('daily');
  const [unit, setUnit] = useState('lbs');

  const activeData = wasteData[timePeriod][unit];

  const barChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: (params) => {
        const data = params[0];
        return `<div style="text-align:center; padding: 5px;">
                    <span style="font-size:12px; font-weight:500;">${data.name}</span><br/>
                    <span style="font-size:14px; color: #227D53; font-weight:bold;">${data.value} ${unit}</span>
                </div>`;
      },
      backgroundColor: 'white',
      borderColor: 'transparent',
      extraCssText: 'border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 8px 12px'
    },
    xAxis: {
      type: 'category',
      data: activeData.labels,
      axisLabel: {
        show: true,
        textStyle: {
            color: '#444',
            fontSize: 10,
        }
      },
      axisTick: { show: false },
      axisLine: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: { show: false },
      splitLine: { show: false },
    },
    series: [{
      data: activeData.chartData,
      type: 'bar',
      barWidth: '20%',
      itemStyle: {
        color: '#227D53',
        borderRadius: [5, 5, 0, 0],
      }
    }],
    grid: {
        top: '5%',
        bottom: '15%',
        left: '0%',
        right: '0%',
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-4">
      {/* Total Projects Card - Now fully dynamic */}
      <div className="flex flex-col justify-between p-4 rounded-[15px] bg-gradient-primary text-white min-w-[265px]">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium tracking-tight">Total Projects</h3>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="12" fill="white"/>
            <path d="M8.61538 8V9.23077H13.9015L8 15.1323L8.86769 16L14.7692 10.0985V15.3846H16V8H8.61538Z" fill="black"/>
          </svg>
        </div>
        <p className="text-[64px] font-semibold leading-none tracking-tighter">{totalProjects}</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-1.5 py-0.5 border border-[#C5FF93] rounded-[5px]">
            <span className="text-[10px] text-[#C5FF93] tracking-tight">{totalProjectsIncrease}</span>
            <svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 11L4.5 7L7.5 11H1.5Z" fill="#C5FF93"/>
            </svg>
          </div>
          <span className="text-sm text-[#C5FF93] tracking-tight">Increased from last month</span>
        </div>
      </div>

      {/* Ended Projects Card - Now fully dynamic */}
      <div className="flex flex-col justify-between p-4 rounded-[15px] bg-white min-w-[265px]">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium tracking-tight text-black">Ended Projects</h3>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="12" fill="white" stroke="black"/>
            <path d="M8.61538 8V9.23077H13.9015L8 15.1323L8.86769 16L14.7692 10.0985V15.3846H16V8H8.61538Z" fill="black"/>
          </svg>
        </div>
        <p className="text-[64px] font-semibold leading-none tracking-tighter text-black">{endedProjects}</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-1.5 py-0.5 border border-[#227D53] bg-[#EFF8F2] rounded-[5px]">
            <span className="text-[10px] text-[#227D53] tracking-tight">{endedProjectsIncrease}</span>
            <svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 11L4.5 7L7.5 11H1.5Z" fill="#227D53"/>
            </svg>
          </div>
          <span className="text-sm text-[#227D53] tracking-tight">Increased from last month</span>
        </div>
      </div>

      {/* Collected Waste Summary Card - Unchanged, remains locally controlled */}
      <div className="flex flex-col p-4 rounded-[15px] bg-white flex-1 min-h-[188px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium tracking-tight text-black">Collected Waste Summary</h3>
          <div className="flex items-center gap-2">
            {/* Toggles etc. */}
            <div className="flex p-0.5 gap-1.5 bg-[#F7F7F7] rounded border border-[rgba(165,165,165,0.04)]">
              <button onClick={() => setTimePeriod('daily')} className={`px-2 py-1 text-[10px] rounded ${timePeriod === 'daily' ? 'bg-white shadow-sm' : 'text-[#444]'}`}>Daily</button>
              <button onClick={() => setTimePeriod('weekly')} className={`px-2 py-1 text-[10px] rounded ${timePeriod === 'weekly' ? 'bg-white shadow-sm' : 'text-[#444]'}`}>Weekly</button>
            </div>
            <div className="flex p-0.5 gap-1.5 bg-[#F7F7F7] rounded border border-[rgba(165,165,165,0.04)]">
              <button onClick={() => setUnit('lbs')} className={`px-2 py-1 text-[10px] rounded ${unit === 'lbs' ? 'bg-white shadow-sm' : 'text-[#444]'}`}>lbs</button>
              <button onClick={() => setUnit('tons')} className={`px-2 py-1 text-[10px] rounded ${unit === 'tons' ? 'bg-white shadow-sm' : 'text-[#444]'}`}>tons</button>
            </div>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="12" fill="white" stroke="black"/>
              <path d="M8.61538 8V9.23077H13.9015L8 15.1323L8.86769 16L14.7692 10.0985V15.3846H16V8H8.61538Z" fill="black"/>
            </svg>
          </div>
        </div>
        
        <div className="flex items-end gap-4 flex-1">
          <div className="flex flex-col gap-4">
            <p className="text-[64px] font-semibold leading-none tracking-tighter text-black">{activeData.summary}</p>
            <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 px-1.5 py-0.5 border ${activeData.status === 'increase' ? 'border-[#227D53] bg-[#EFF8F2]' : 'border-[#DA383A] bg-[#FDEBEB]'} rounded-[5px]`}>
                    <span className={`text-[10px] ${activeData.status === 'increase' ? 'text-[#227D53]' : 'text-[#DA383A]'}`}>{activeData.indicator}</span>
                    <svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 11L4.5 7L7.5 11H1.5Z" fill={`${activeData.status === 'increase' ? '#227D53' : '#DA383A'}`}/>
                    </svg>
                </div>
                <span className={`text-sm ${activeData.status === 'increase' ? 'text-[#227D53]' : 'text-[#DA383A]'} tracking-tight`}>{activeData.statusText}</span>
            </div>
          </div>
          
          <div className="flex-1 h-[106px] min-w-0">
            <ReactECharts option={barChartOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
