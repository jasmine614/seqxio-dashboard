export default function MetricCards() {
  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-4">
      {/* Total Projects Card */}
      <div className="flex flex-col justify-between p-4 rounded-[15px] bg-gradient-primary text-white min-w-[265px]">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium tracking-tight">Total Projects</h3>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="12" fill="white"/>
            <path d="M8.61538 8V9.23077H13.9015L8 15.1323L8.86769 16L14.7692 10.0985V15.3846H16V8H8.61538Z" fill="black"/>
          </svg>
        </div>
        <p className="text-[64px] font-semibold leading-none tracking-tighter">24</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-1.5 py-0.5 border border-[#C5FF93] rounded-[5px]">
            <span className="text-[10px] text-[#C5FF93] tracking-tight">5</span>
            <svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 11L4.5 7L7.5 11H1.5Z" fill="#C5FF93"/>
            </svg>
          </div>
          <span className="text-sm text-[#C5FF93] tracking-tight">Increased from last month</span>
        </div>
      </div>

      {/* Ended Projects Card */}
      <div className="flex flex-col justify-between p-4 rounded-[15px] bg-white min-w-[265px]">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium tracking-tight text-black">Ended Projects</h3>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="12" fill="white" stroke="black"/>
            <path d="M8.61538 8V9.23077H13.9015L8 15.1323L8.86769 16L14.7692 10.0985V15.3846H16V8H8.61538Z" fill="black"/>
          </svg>
        </div>
        <p className="text-[64px] font-semibold leading-none tracking-tighter text-black">10</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-1.5 py-0.5 border border-[#227D53] bg-[#EFF8F2] rounded-[5px]">
            <span className="text-[10px] text-[#227D53] tracking-tight">6</span>
            <svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 11L4.5 7L7.5 11H1.5Z" fill="#227D53"/>
            </svg>
          </div>
          <span className="text-sm text-[#227D53] tracking-tight">Increased from last month</span>
        </div>
      </div>

      {/* Collected Waste Summary Card */}
      <div className="flex flex-col p-4 rounded-[15px] bg-white flex-1 min-h-[188px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium tracking-tight text-black">Collected Waste Summary</h3>
          <div className="flex items-center gap-2">
            {/* Daily/Weekly Toggle */}
            <div className="flex p-0.5 gap-1.5 bg-[#F7F7F7] rounded border border-[rgba(165,165,165,0.04)]">
              <button className="px-2 py-1 text-[10px] bg-white rounded shadow-sm">Daily</button>
              <button className="px-2 py-1 text-[10px] text-[#444]">Weekly</button>
            </div>
            {/* lbs/tons Toggle */}
            <div className="flex p-0.5 gap-1.5 bg-[#F7F7F7] rounded border border-[rgba(165,165,165,0.04)]">
              <button className="px-2 py-1 text-[10px] bg-white rounded shadow-sm">lbs</button>
              <button className="px-2 py-1 text-[10px] text-[#444]">tons</button>
            </div>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="12" fill="white" stroke="black"/>
              <path d="M8.61538 8V9.23077H13.9015L8 15.1323L8.86769 16L14.7692 10.0985V15.3846H16V8H8.61538Z" fill="black"/>
            </svg>
          </div>
        </div>
        
        <div className="flex items-end gap-4 flex-1">
          <div className="flex flex-col gap-4">
            <p className="text-[64px] font-semibold leading-none tracking-tighter text-black">1,284.6</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-1.5 py-0.5 border border-[#227D53] bg-[#EFF8F2] rounded-[5px]">
                <span className="text-[10px] text-[#227D53] tracking-tight">200</span>
                <svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 11L4.5 7L7.5 11H1.5Z" fill="#227D53"/>
                </svg>
              </div>
              <span className="text-sm text-[#227D53] tracking-tight">Increased from last month</span>
            </div>
          </div>
          
          {/* Bar Chart */}
          <div className="flex-1 h-[106px] flex items-end justify-between gap-1.5 pb-5">
            {[60, 40, 44, 83, 43, 69, 69].map((height, i) => (
              <div key={i} className="flex flex-col items-center gap-4 flex-1">
                <div className="w-3 bg-[#227D53] rounded-t" style={{ height: `${height}%` }}></div>
                <span className="text-[10px] text-[#444] uppercase tracking-wider">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
