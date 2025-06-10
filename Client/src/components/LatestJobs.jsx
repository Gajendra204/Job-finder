import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from "framer-motion"

function LatestJobs() {
    const { allJobs } = useSelector(state => state.job);

    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-[5%] w-full my-28 max-w-7xl mx-auto"
        >
            <div className="text-center mb-16">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                        Latest & Top
                    </span> Job Openings
                </h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Browse through our most recent job opportunities from top companies
                </p>
            </div>
            
            {/* cards for job openings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-5">
                {allJobs?.slice(0, 7).map((job, index) => (
                    <motion.div
                        key={job._id}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <LatestJobCards job={job} />
                    </motion.div>
                ))}
            </div>

            {allJobs?.length > 7 && (
                <div className="text-center mt-12">
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl">
                        View All Jobs
                    </button>
                </div>
            )}
        </motion.div>
    )
}

export default LatestJobs