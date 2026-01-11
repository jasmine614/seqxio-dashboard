import ReactECharts from 'echarts-for-react';

interface ProjectProgressProps {
  data: Array<{ value: number; name: string }>;
}

export default function ProjectProgress({ data }: ProjectProgressProps) {
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: false
    },
    series: [
      {
        name: 'Project Progress',
        type: 'pie',
        radius: ['50%', '90%'],
        center: ['50%', '85%'],
        startAngle: 180,
        endAngle: 0,
        data: data,
        label: {
            show: true,
            position: 'inside',
            formatter: '{d}%',
            color: '#000',
            fontSize: 14,
        },
        itemStyle: {
          color: (params: { dataIndex: number; }) => {
            // This logic assumes a specific order, which is now determined by the prop.
            // It might need to be adjusted if the order can change.
            const colors = ['#E0E0E0', '#5FBD92', '#155234', '#227D53'];
            return colors[params.dataIndex];
          }
        }
      }
    ]
  };

  return (
    <div className="flex flex-col p-4 gap-4 bg-white rounded-[15px] min-h-[244px]">
      <h3 className="text-xl font-medium tracking-tight text-black">Project Progress</h3>
      
      <div className="flex flex-col items-center gap-4 flex-1">
        <div className="relative w-[172px] h-[172px]">
          <ReactECharts option={option} style={{ height: '100%', width: '100%' }} key={JSON.stringify(data)} />
        </div>

        {/* Legend */}
        <div className="flex flex-row gap-4 justify-center">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#227D53]"></div>
            <span className="text-sm text-black">Completed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#155234]"></div>
            <span className="text-sm text-black">In Progress</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#5FBD92]"></div>
            <span className="text-sm text-black">Pending</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#E0E0E0]"></div>
            <span className="text-sm text-black">Not Started</span>
          </div>
        </div>
      </div>
    </div>
  );
}
