import React from 'react';
import {
  BriefcaseIcon,
  ClockIcon,
  CurrencyRupeeIcon,
  MapPinIcon
} from '@heroicons/react/24/solid';

const jobStats = [
  {
    icon: <BriefcaseIcon className="w-5 h-5 text-neonGreen mr-2" />,
    label: '45 New Jobs'
  },
  {
    icon: <ClockIcon className="w-5 h-5 text-neonGreen mr-2" />,
    label: 'Last Updated: Today'
  },
  {
    icon: <CurrencyRupeeIcon className="w-5 h-5 text-neonGreen mr-2" />,
    label: 'Avg. Salary: ₹6.5L'
  }
];

const jobList = [
  {
    title: 'Full Stack Developer',
    company: 'TechCorp Solutions',
    location: 'Remote',
    salary: '₹8-12L',
    isNew: true
  },
  {
    title: 'Python Developer',
    company: 'DataViz Analytics',
    location: 'Bangalore',
    salary: '₹5-9L',
    isNew: true
  },
  {
    title: 'Frontend Developer',
    company: 'UX Innovations',
    location: 'Hybrid',
    salary: '₹6-10L',
    isNew: false
  }
];

const JobBoard = () => {
  return (
    <section id="job-board" className="py-16 bg-midnight text-white">
      <div className="container mx-auto px-4">
        <div className="bg-midnightLight rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neonGreen/10 rounded-full blur-3xl" />

          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            {/* Left Panel */}
            <div className="mb-10 md:mb-0 md:mr-10 max-w-xl">
              <h2 className="text-3xl font-bold mb-2">Live Job Board</h2>
              <p className="text-gray-300 mb-4">
                100+ Companies Hiring GaNIT School Graduates
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-3 mb-6">
                {jobStats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/10 px-4 py-2 rounded-lg flex items-center"
                  >
                    {stat.icon}
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="bg-neonGreen hover:bg-neonGreenDark text-midnight font-medium px-6 py-3 rounded-lg transition-all"
                >
                  Apply Now
                </a>
                <a
                  href="#"
                  className="bg-transparent hover:bg-white/10 border border-white text-white font-medium px-6 py-3 rounded-lg transition-all"
                >
                  Resume Review
                </a>
                <a
                  href="#"
                  className="bg-transparent hover:bg-white/10 border border-white text-white font-medium px-6 py-3 rounded-lg transition-all"
                >
                  Book Mock Interview
                </a>
              </div>
            </div>

            {/* Right Panel - Job Listings */}
            <div className="w-full md:w-1/2 lg:w-2/5">
              <div className="bg-midnight rounded-xl p-5 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Latest Openings</h3>
                  <a href="#" className="text-neonGreen text-sm">
                    View All
                  </a>
                </div>

                {/* Jobs */}
                <div className="space-y-4">
                  {jobList.map((job, index) => (
                    <div
                      key={index}
                      className="bg-midnightLight/50 p-4 rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{job.title}</h4>
                          <p className="text-sm text-gray-300">
                            {job.company}
                          </p>
                        </div>
                        {job.isNew && (
                          <span className="bg-neonGreen/20 text-neonGreen text-xs px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <div className="flex items-center mt-2 text-sm text-gray-400">
                        <span className="flex items-center mr-4">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <CurrencyRupeeIcon className="w-4 h-4 mr-1" />
                          {job.salary}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobBoard;
