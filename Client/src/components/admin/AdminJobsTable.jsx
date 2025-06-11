import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal, Building2, Calendar, Briefcase } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job?.company?.companyName
            ?.toLowerCase()
            .includes(searchJobByText.toLowerCase()) ||
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
        );
      });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full">
      {/* Enhanced Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableCaption className="py-6 text-gray-500 font-medium bg-gray-50/50">
            A list of your recent posted jobs
          </TableCaption>
          
          {/* Enhanced Header */}
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 transition-all duration-300">
              <TableHead className="font-semibold text-gray-700 py-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Company Name
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 py-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-green-600" />
                  Role
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 py-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  Date Posted
                </div>
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* Enhanced Body */}
          <TableBody>
            {filterJobs && filterJobs.length > 0 ? (
              filterJobs?.map((job, index) => (
                <TableRow 
                  key={job._id}
                  className="group hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 border-b border-gray-100 hover:border-blue-200"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.5s ease-out forwards'
                  }}
                >
                  {/* Company Name Cell */}
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                          {job?.company?.companyName}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">Company</div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Role Cell */}
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 group-hover:text-green-700 transition-colors">
                        {job?.title}
                      </span>
                      <span className="text-xs text-gray-400 mt-0.5">Position</span>
                    </div>
                  </TableCell>

                  {/* Date Cell */}
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">
                        {formatDate(job?.createdAt)}
                      </span>
                      <span className="text-xs text-gray-400 mt-0.5">Created</span>
                    </div>
                  </TableCell>

                  {/* Actions Cell */}
                  <TableCell className="text-right py-4">
                    <Popover>
                      <PopoverTrigger className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 group-hover:bg-blue-100 transition-all duration-200 cursor-pointer">
                        <MoreHorizontal className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                      </PopoverTrigger>
                      <PopoverContent className="w-40 p-2 bg-white border border-gray-200 shadow-xl rounded-lg">
                        {/*                                             <div onClick={() => navigate(`/admin/jobs/${job._id}`)} className='flex items-center w-full cursor-pointer gap-3 px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group/item'>
                                                <Edit2 className='w-4 h-4 text-gray-500 group-hover/item:text-blue-600' />
                                                <span className="text-sm font-medium">Edit Job</span>
                                            </div> */}
                        <div
                          onClick={() =>
                            navigate(`/admin/jobs/${job._id}/applicants`)
                          }
                          className="flex items-center w-full cursor-pointer gap-3 px-3 py-2 rounded-md hover:bg-green-50 hover:text-green-700 transition-all duration-200 group/item"
                        >
                          <Eye className="w-4 h-4 text-gray-500 group-hover/item:text-green-600" />
                          <span className="text-sm font-medium">View Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Briefcase className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="text-gray-500 font-medium">No jobs found</div>
                    <div className="text-sm text-gray-400">Try adjusting your search criteria</div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminJobsTable;