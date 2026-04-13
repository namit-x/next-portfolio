import { useTheme } from "./ThemeContext";
import { clsx } from 'clsx';

const Timeline = () => {
  const { theme } = useTheme();
  return (
    <div className="w-full px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold overflow-hidden">
            <span className={clsx(
              theme === 'light'
              ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600"
              : "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500"
            )}>Timeline</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mt-4"></div>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-[600px] mx-auto">
          <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-1 h-full bg-timeline rounded-full" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {/* 2006 */}
            <div className="flex flex-col sm:flex-row items-start group">
              <div className="flex-1 sm:text-right sm:pr-8 ml-12 sm:ml-0">
                <div className="sm:hidden">
                  <span className="font-bold">January 2006</span>
                  <div>✨ Spawned into existence.</div>
                  <div className="text-gray-400">Rohtak, Haryana</div>
                </div>
              </div>
              <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full mt-2 border-2 border-gradient" />
              <div className="flex-1 sm:pl-8">
                <div className="hidden sm:block">
                  <span className="font-bold">January 2006</span>
                  <div>✨ Spawned into existence.</div>
                  <div className="text-gray-400">Rohtak, Haryana</div>
                </div>
              </div>
            </div>

            {/* 2009 */}
            <div className="flex flex-col sm:flex-row items-start group">
              <div className="flex-1 sm:text-right sm:pr-8 ml-12 sm:ml-0">
                <span className="font-bold">April 2009</span>
                <div>🎒Entered Kindergarten:)</div>
                <div className="text-gray-400">Peak of my academic career (so far).</div>
              </div>
              <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full mt-2 border-2 border-gradient" />
              <div className="flex-1 sm:pl-8"></div>
            </div>

            {/* 2011 */}
            <div className="flex flex-col sm:flex-row items-start group">
              <div className="flex-1 sm:text-right sm:pr-8 ml-12 sm:ml-0">
                <div className="sm:hidden">
                  <span className="font-bold">April 2011</span>
                  <div>Upgraded to "real" school life🏫</div>
                  <div className="text-gray-400">MDN Public School, Rohtak</div>
                </div>
              </div>
              <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full mt-2 border-2 border-gradient" />
              <div className="flex-1 sm:pl-8">
                <div className="hidden sm:block">
                  <span className="font-bold">April 2011</span>
                  <div>Upgraded to "real" school life🏫</div>
                  <div className="text-gray-400">MDN Public School, Rohtak</div>
                </div>
              </div>
            </div>

            {/* 2023 May */}
            <div className="flex flex-col sm:flex-row items-start group">
              <div className="flex-1 sm:text-right sm:pr-8 ml-12 sm:ml-0">
                <span className="font-bold">May 2023</span>
                <div>Escaped school🎓 with 89.4%</div>
                <div className="text-gray-400">MDN Public School, Rohtak</div>
              </div>
              <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full mt-2 border-2 border-gradient" />
              <div className="flex-1 sm:pl-8"></div>
            </div>

            {/* 2023 August */}
            <div className="flex flex-col sm:flex-row items-start group">
              <div className="flex-1 sm:text-right sm:pr-8 ml-12 sm:ml-0">
                <div className="sm:hidden">
                  <span className="font-bold">August 2023</span>
                  <div>🚀Leveled up: Started College</div>
                  <div className="text-gray-400">Jain University, Bengaluru</div>
                </div>
              </div>
              <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full mt-2 border-2 border-gradient" />
              <div className="flex-1 sm:pl-8">
                <div className="hidden sm:block">
                  <span className="font-bold">August 2023</span>
                  <div>🚀Leveled up: Started College</div>
                  <div className="text-gray-400">Jain University, Bengaluru</div>
                </div>
              </div>
            </div>

            {/* 2024 */}
            <div className="flex flex-col sm:flex-row items-start group">
              <div className="flex-1 sm:text-right sm:pr-8 ml-12 sm:ml-0">
                <span className="font-bold">June 2024</span>
                <div>Decided to break🛠️ the internet</div>
                <div className="text-gray-400">(or at least learn Web Dev)</div>
              </div>
              <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full mt-2 border-2 border-gradient" />
              <div className="flex-1 sm:pl-8"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Timeline;