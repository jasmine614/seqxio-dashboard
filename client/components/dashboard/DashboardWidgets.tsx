// Interactive Map Component
export function InteractiveMap() {
  return (
    <div className="flex flex-col p-4 gap-4 bg-white rounded-[15px] flex-1 min-h-[244px]">
      <h3 className="text-xl font-medium tracking-tight text-black">Interactive Map</h3>
      <div className="relative flex-1 rounded-lg overflow-hidden">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/c9690b37b21119ac8a712fb675a74be521572146?width=616"
          alt="Interactive Map"
          className="w-full h-full object-cover"
        />
        {/* Map Markers */}
        <div className="absolute top-12 left-4 w-6 h-6 bg-[#155234]/40 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">2</span>
        </div>
        <div className="absolute top-2 left-[150px] w-6 h-6 bg-[#FFAA2A]/40 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">6</span>
        </div>
        <div className="absolute top-8 right-12 w-9 h-9 bg-[#FF3939]/50 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">12</span>
        </div>
      </div>
    </div>
  );
}

// Calendar Component
export function Calendar() {
  return (
    <div className="flex flex-col p-4 gap-4 bg-white rounded-[15px] w-full lg:w-[467px] min-h-[328px]">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold tracking-tight text-black">Calendar</h3>
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-black">November 2025</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M4.4107 6.93658C4.73614 6.61115 5.26378 6.61115 5.58922 6.93658L9.99996 11.3473L14.4107 6.93658C14.7361 6.61115 15.2638 6.61115 15.5892 6.93658C15.9147 7.26202 15.9147 7.78966 15.5892 8.11509L10.6776 13.0267C10.3034 13.401 9.69657 13.401 9.32232 13.0267L4.4107 8.11509C4.08527 7.78966 4.08527 7.26202 4.4107 6.93658Z" fill="black"/>
          </svg>
        </div>
      </div>
      
      <div className="p-2 border border-[#F7F7F7] rounded-[10px]">
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 text-center">
          {/* Day Headers */}
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-base text-[#737373] py-1">{day}</div>
          ))}
          
          {/* Calendar Days */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4].map((day, i) => {
            const isDisabled = i >= 8 && i <= 12;
            const isToday = i === 16;
            const isSelected = i === 24;
            const isRangeStart = i === 24;
            const isRangeMid = i === 25;
            const isRangeEnd = i === 26;
            
            return (
              <div
                key={i}
                className={`
                  relative py-1 text-base
                  ${isDisabled ? 'text-[#E9E9E9] line-through' : 'text-[#444]'}
                  ${isToday ? 'border border-[#969696] rounded-full' : ''}
                  ${isSelected ? 'bg-[#155234] text-white rounded-full' : ''}
                  ${isRangeMid ? 'bg-gray-100' : ''}
                  ${isRangeEnd ? 'border border-gray-300 rounded-full' : ''}
                `}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Recent Photos Component
export function RecentPhotos() {
  const photos = [
    'https://api.builder.io/api/v1/image/assets/TEMP/ae3ea0ebadce275085346740841b7a399cda06a2?width=209',
    'https://api.builder.io/api/v1/image/assets/TEMP/db5ea06f2e63708c77c94149b3fb1c8b5ffe1a82?width=209',
    'https://api.builder.io/api/v1/image/assets/TEMP/b95e03757042160a1ae8a88309b7701449ab353c?width=209',
    'https://api.builder.io/api/v1/image/assets/TEMP/af38498e5efcd065058db974fda3c854adc35b43?width=209',
    'https://api.builder.io/api/v1/image/assets/TEMP/39bea0370b686b6abe41042784904460cf484d7a?width=209',
    'https://api.builder.io/api/v1/image/assets/TEMP/e3aa30a1948814b04a683c0f6c13bce38051b4ff?width=209',
    'https://api.builder.io/api/v1/image/assets/TEMP/fae42277ab1f6cca09453939333ca402b070e36a?width=209',
    'https://api.builder.io/api/v1/image/assets/TEMP/b543e7c792bd22ab44f6d0dce133e2397ed02bf3?width=194',
    'https://api.builder.io/api/v1/image/assets/TEMP/f3550ade64661ae1bff5b79cf451b993e1745750?width=209',
    'https://api.builder.io/api/v1/image/assets/TEMP/80c0a6b9e9013895614f237522b009f0ab75038c?width=209',
    'https://api.builder.io/api/v1/image/assets/TEMP/3c8a70844907d8d0a91bd650c0bdfcccab79c22b?width=209',
    'https://api.builder.io/api/v1/image/assets/TEMP/31e9fb55eb3e001f6e9763af5d4bb00e8dd3bac1?width=258',
  ];

  return (
    <div className="flex flex-col p-4 gap-4 bg-white rounded-[15px] flex-1 min-h-[328px]">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium tracking-tight text-black">Recent Photos</h3>
        <button className="flex items-center gap-2 px-5 py-2 border border-[#155234] rounded-[25px] hover:bg-gray-50 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#155234"/>
          </svg>
          <span className="text-base font-medium text-[#155234] tracking-tight">Upload</span>
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-2 flex-1">
        {photos.map((photo, i) => (
          <div key={i} className="relative aspect-square rounded bg-gray-200 overflow-hidden">
            <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Roads List Component
export function RoadsList() {
  const roads = [
    { name: 'N Tryon St', status: 'red' },
    { name: 'S Tryon St', status: 'red' },
    { name: 'Independence Blvd', status: 'yellow' },
    { name: 'Wilkinson Blvd', status: 'green' },
    { name: 'Freedom Dr', status: 'red' },
    { name: 'South Blvd', status: 'green' },
    { name: 'Central Ave', status: 'red' },
    { name: 'Eastway Dr', status: 'yellow' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'red':
        return 'bg-[#DA383A]';
      case 'yellow':
        return 'bg-[#FFAA2A]';
      case 'green':
        return 'bg-[#227D53]';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="flex flex-col p-4 gap-4 bg-white rounded-[15px] w-full lg:w-[265px] h-[348px]">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium tracking-tight text-black">Roads</h3>
        <button className="flex items-center gap-2 px-5 py-2 border border-[#155234] rounded-[25px] hover:bg-gray-50 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#155234"/>
          </svg>
          <span className="text-base font-medium text-[#155234] tracking-tight">New</span>
        </button>
      </div>
      
      <div className="flex flex-col justify-between flex-1 overflow-y-auto">
        {roads.map((road, i) => (
          <div key={i} className="flex items-center justify-between py-1">
            <span className="text-base text-black tracking-tight">{road.name}</span>
            <div className={`w-2 h-2 rounded-full ${getStatusColor(road.status)}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Time Tracker Component
export function TimeTracker() {
  return (
    <div className="flex flex-col justify-between p-4 bg-gradient-to-br from-[#030603] to-[#024C02] rounded-[15px] w-full lg:w-[265px] h-[224px] relative overflow-hidden"
      style={{
        backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/7bfc782dbe954083afb3e77a3ed5dd34a5f5a7c0?width=530')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h3 className="text-xl font-medium text-white tracking-tight">Time Tracker</h3>
      <p className="text-[40px] font-medium text-white text-center leading-none tracking-tighter">01:24:08</p>
      <div className="flex items-center justify-center gap-2">
        <button className="hover:scale-110 transition-transform">
          <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.0312 0C9.87 0 0 10.08 0 22.5C0 34.92 9.87 45 22.0312 45C34.1925 45 44.0625 34.92 44.0625 22.5C44.0625 10.08 34.1925 0 22.0312 0ZM19.8281 31.5H15.4219V13.5H19.8281V31.5ZM28.6406 31.5H24.2344V13.5H28.6406V31.5Z" fill="white"/>
          </svg>
        </button>
        <button className="hover:scale-110 transition-transform">
          <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="27" cy="28" r="19.5" fill="#DA383A" stroke="#DA383A" strokeWidth="5"/>
            <rect x="17" y="18" width="19" height="19" rx="2" fill="white"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
