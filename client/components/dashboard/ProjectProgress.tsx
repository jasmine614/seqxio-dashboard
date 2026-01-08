export default function ProjectProgress() {
  return (
    <div className="flex flex-col p-4 gap-4 bg-white rounded-[15px] min-h-[244px]">
      <h3 className="text-xl font-medium tracking-tight text-black">Project Progress</h3>
      
      <div className="flex justify-between items-start gap-4 flex-1">
        {/* Donut Chart SVG */}
        <div className="relative w-[172px] h-[172px]">
          <svg width="334" height="172" viewBox="0 0 334 172" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_i)">
              <path d="M5 174.583C2.23858 174.583 -0.00746193 172.344 0.0714244 169.584C0.679494 148.307 5.16477 127.305 13.3211 107.614C22.1157 86.3818 35.0061 67.0899 51.2563 50.8397C67.5066 34.5894 86.7984 21.699 108.03 12.9044C129.262 4.10988 152.019 -0.416629 175 -0.416626C197.981 -0.416623 220.738 4.10989 241.97 12.9045C263.202 21.699 282.493 34.5895 298.744 50.8397C314.994 67.09 327.884 86.3818 336.679 107.614C344.835 127.305 349.321 148.307 349.929 169.584C350.007 172.344 347.761 174.583 345 174.583H311.25C308.489 174.583 306.26 172.344 306.155 169.585C305.563 154.054 302.217 138.739 296.259 124.356C289.663 108.432 279.995 93.9633 267.808 81.7756C255.62 69.5879 241.151 59.9201 225.227 53.3242C209.303 46.7283 192.236 43.3334 175 43.3334C157.764 43.3334 140.697 46.7283 124.773 53.3242C108.849 59.9201 94.3799 69.5879 82.1922 81.7756C70.0046 93.9633 60.3367 108.432 53.7408 124.356C47.7833 138.739 44.4371 154.054 43.8452 169.585C43.7401 172.344 41.5114 174.583 38.75 174.583H5Z" fill="#F7F7F7"/>
            </g>
            <g filter="url(#filter1_i)">
              <path d="M55 173.583C52.2386 173.583 49.9895 171.344 50.1008 168.585C50.6889 154.007 53.8458 139.634 59.4389 126.131C65.6705 111.086 74.8043 97.4166 86.3188 85.9021C97.8332 74.3877 111.503 65.2539 126.547 59.0223C141.592 52.7907 157.716 49.5834 174 49.5834C190.284 49.5834 206.408 52.7907 221.453 59.0223C236.497 65.2539 250.167 74.3877 261.681 85.9021C273.196 97.4166 282.329 111.086 288.561 126.131C294.154 139.634 297.311 154.007 297.899 168.585C298.011 171.344 295.761 173.583 293 173.583L259.6 173.583C256.839 173.583 254.616 171.343 254.445 168.587C253.894 159.711 251.877 150.976 248.465 142.739C244.414 132.96 238.477 124.075 230.993 116.591C223.508 109.106 214.623 103.169 204.844 99.1187C195.065 95.0682 184.585 92.9834 174 92.9834C163.415 92.9834 152.935 95.0682 143.156 99.1187C133.377 103.169 124.492 109.106 117.007 116.591C109.523 124.075 103.586 132.96 99.5353 142.739C96.1235 150.976 94.1063 159.711 93.555 168.587C93.3838 171.343 91.1614 173.583 88.4 173.583H55Z" fill="#F7F7F7"/>
            </g>
            <g filter="url(#filter2_i)">
              <path d="M106 174.083C103.239 174.083 100.982 171.842 101.17 169.087C101.711 161.145 103.54 153.331 106.595 145.956C110.289 137.039 115.703 128.936 122.528 122.111C129.353 115.286 137.455 109.872 146.373 106.178C155.29 102.485 164.848 100.583 174.5 100.583C184.152 100.583 193.71 102.485 202.627 106.178C211.545 109.872 219.647 115.286 226.472 122.111C233.297 128.936 238.711 137.039 242.405 145.956C245.46 153.331 247.289 161.145 247.83 169.087C248.018 171.842 245.761 174.083 243 174.083L208.9 174.083C206.139 174.083 203.943 171.829 203.476 169.107C203.107 166.96 202.5 164.855 201.662 162.832C200.185 159.266 198.019 156.024 195.289 153.294C192.559 150.564 189.318 148.399 185.751 146.921C182.184 145.444 178.361 144.683 174.5 144.683C170.639 144.683 166.816 145.444 163.249 146.921C159.682 148.399 156.441 150.564 153.711 153.294C150.981 156.024 148.815 159.266 147.338 162.832C146.5 164.855 145.893 166.96 145.524 169.107C145.057 171.829 142.861 174.083 140.1 174.083L106 174.083Z" fill="#F7F7F7"/>
            </g>
            <g filter="url(#filter3_d)">
              <mask id="path-4-inside-1" fill="white">
                <path d="M5 174.583C2.23858 174.583 -0.00746212 172.344 0.0714232 169.584C0.709061 147.272 5.60995 125.272 14.526 104.776C24.1074 82.75 38.1204 62.9325 55.6926 46.557C73.2648 30.1816 94.0198 17.5988 116.666 9.59217C137.739 2.1415 160.029 -1.19807 182.331 -0.263024C185.09 -0.147344 187.165 2.25079 186.971 5.00536L184.594 38.6716C184.4 41.4262 182.009 43.4916 179.249 43.4022C162.94 42.8739 146.661 45.3911 131.249 50.84C114.265 56.845 98.6986 66.282 85.5194 78.5636C72.3403 90.8452 61.8306 105.708 54.6445 122.228C48.1239 137.217 44.4667 153.279 43.8452 169.585C43.7401 172.344 41.5114 174.583 38.75 174.583H5Z"/>
              </mask>
              <path d="M5 174.583C2.23858 174.583 -0.00746212 172.344 0.0714232 169.584C0.709061 147.272 5.60995 125.272 14.526 104.776C24.1074 82.75 38.1204 62.9325 55.6926 46.557C73.2648 30.1816 94.0198 17.5988 116.666 9.59217C137.739 2.1415 160.029 -1.19807 182.331 -0.263024C185.09 -0.147344 187.165 2.25079 186.971 5.00536L184.594 38.6716C184.4 41.4262 182.009 43.4916 179.249 43.4022C162.94 42.8739 146.661 45.3911 131.249 50.84C114.265 56.845 98.6986 66.282 85.5194 78.5636C72.3403 90.8452 61.8306 105.708 54.6445 122.228C48.1239 137.217 44.4667 153.279 43.8452 169.585C43.7401 172.344 41.5114 174.583 38.75 174.583H5Z" stroke="#227D53" strokeWidth="45" mask="url(#path-4-inside-1)"/>
            </g>
            <g filter="url(#filter4_d)">
              <path d="M55 173.583C52.2386 173.583 49.9895 171.344 50.1008 168.584C50.8978 148.827 56.4102 129.52 66.2082 112.29C76.0062 95.0588 89.7794 80.4495 106.351 69.6621C108.665 68.1556 111.74 68.9432 113.152 71.3163L130.231 100.02C131.642 102.393 130.853 105.449 128.572 107.005C118.449 113.912 110.015 123.051 103.935 133.742C97.8559 144.434 94.3148 156.355 93.555 168.586C93.3838 171.343 91.1614 173.583 88.4 173.583H55Z" fill="#155234"/>
            </g>
            <g filter="url(#filter5_d)">
              <path d="M106 174.083C103.239 174.083 100.982 171.842 101.17 169.087C101.894 158.464 104.917 148.124 110.031 138.785C111.357 136.363 114.465 135.69 116.792 137.178L145.519 155.55C147.846 157.038 148.481 160.12 147.408 162.664C146.536 164.733 145.904 166.895 145.524 169.107C145.057 171.829 142.861 174.083 140.1 174.083L106 174.083Z" fill="#5FBD92"/>
            </g>
            <defs>
              <filter id="filter0_i" x="0.069458" y="-0.416626" width="349.861" height="176.667" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="1.66667"/>
                <feGaussianBlur stdDeviation="0.833333"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.645833 0 0 0 0 0.645833 0 0 0 0 0.645833 0 0 0 0.04 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
              </filter>
              <filter id="filter1_i" x="50.0968" y="49.5834" width="247.806" height="125.667" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="1.66667"/>
                <feGaussianBlur stdDeviation="0.833333"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.645833 0 0 0 0 0.645833 0 0 0 0 0.645833 0 0 0 0.04 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
              </filter>
              <filter id="filter2_i" x="101.159" y="100.583" width="146.682" height="75.1667" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="1.66667"/>
                <feGaussianBlur stdDeviation="0.833333"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.645833 0 0 0 0 0.645833 0 0 0 0 0.645833 0 0 0 0.04 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
              </filter>
              <filter id="filter3_d" x="-4.93054" y="-3.74996" width="196.914" height="185" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="1.66667"/>
                <feGaussianBlur stdDeviation="2.5"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.0969792 0 0 0 0 0.127894 0 0 0 0 0.2375 0 0 0 0.14 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
              </filter>
              <filter id="filter4_d" x="45.0968" y="65.5596" width="90.8384" height="114.69" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="1.66667"/>
                <feGaussianBlur stdDeviation="2.5"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.0969792 0 0 0 0 0.127894 0 0 0 0 0.2375 0 0 0 0.14 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
              </filter>
              <filter id="filter5_d" x="96.1591" y="133.059" width="56.7549" height="47.6914" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="1.66667"/>
                <feGaussianBlur stdDeviation="2.5"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.0969792 0 0 0 0 0.127894 0 0 0 0 0.2375 0 0 0 0.14 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
              </filter>
            </defs>
          </svg>
          
          {/* Labels */}
          <div className="absolute top-[110px] left-[110px]">
            <p className="text-base font-normal text-black">51%</p>
          </div>
          <div className="absolute top-[145px] left-[65px]">
            <p className="text-base font-normal text-black">35%</p>
          </div>
          <div className="absolute top-[65px] left-[65px]">
            <p className="text-base font-normal text-black">14%</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-4 justify-center">
          <div className="flex items-start gap-1">
            <div className="w-3 h-3 rounded-full bg-[#227D53] mt-1.5"></div>
            <span className="text-sm text-black">Completed</span>
          </div>
          <div className="flex items-start gap-1">
            <div className="w-3 h-3 rounded-full bg-[#155234] mt-1.5"></div>
            <span className="text-sm text-black">In Progress</span>
          </div>
          <div className="flex items-start gap-1">
            <div className="w-3 h-3 rounded-full bg-[#5FBD92] mt-1.5"></div>
            <span className="text-sm text-black">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
}
