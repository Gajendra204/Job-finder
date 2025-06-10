import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Contact,
  Mail,
  Pen,
  Download,
  MapPin,
  Calendar,
  Award,
  Briefcase,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import Footer from "./shared/Footer";
import { motion } from "framer-motion";

const skills = ["HTML", "CSS", "JAVASCRIPT", "REACTJS"];

function Profile() {
  useGetAppliedJobs();

  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <Navbar />

      {/* Hero Section with Gradient Background */}
      <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full px-[6%] max-sm:px-[2%]"
        >
          {/* Main Profile Card */}
          <div className="bg-white/90 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8 max-sm:p-6 overflow-hidden relative">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/30 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

            {/* Profile Header */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-6 max-sm:gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Avatar className="cursor-pointer w-28 h-28 max-sm:w-20 max-sm:h-20 ring-4 ring-white shadow-lg">
                    {user?.profile?.profilePhoto ? (
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="profile"
                        className="object-cover"
                      />
                    ) : (
                      <AvatarImage
                        src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_3.png"
                        alt="profile"
                        className="object-cover"
                      />
                    )}
                  </Avatar>
                </motion.div>

                <div className="space-y-2">
                  <h1 className="font-bold text-3xl max-sm:text-xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {user?.fullname || "Your Name"}
                  </h1>
                  <p className="text-lg max-sm:text-base text-gray-600 font-medium">
                    {user?.profile?.bio || "Professional Bio"}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>Location</span>
                    <Calendar className="w-4 h-4 ml-2" />
                    <span>Joined 2024</span>
                  </div>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setOpen(true)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 shadow-lg max-sm:w-10 max-sm:h-10 rounded-xl transition-all duration-300"
                  size="lg"
                >
                  <Pen className="w-4 h-4" />
                  <span className="max-sm:hidden ml-2">Edit Profile</span>
                </Button>
              </motion.div>
            </div>

            {/* Contact Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-200/50 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                      Email
                    </p>
                    <span className="text-gray-800 font-medium">
                      {user?.email || "email@example.com"}
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-green-50 to-green-100/50 p-4 rounded-xl border border-green-200/50 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <Contact className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                      Phone
                    </p>
                    <span className="text-gray-800 font-medium">
                      {user?.phoneNumber || "+1 (555) 123-4567"}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-800">
                  Technical Skills
                </h2>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {user?.profile?.skills?.length !== 0 ? (
                  user?.profile?.skills.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 hover:from-indigo-200 hover:to-blue-200 px-4 py-2 text-sm font-medium border-0 shadow-sm transition-all duration-300"
                      >
                        {item}
                      </Badge>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-gray-500 italic bg-gray-50 px-4 py-2 rounded-lg border border-dashed border-gray-300">
                    No skills added yet
                  </div>
                )}
              </div>
            </motion.div>

            {/* Resume Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Download className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <Label className="text-lg font-bold text-gray-800 block">
                      Resume
                    </Label>
                    {user?.profile?.resume ? (
                      <a
                        target="_blank"
                        href={user?.profile?.resume}
                        className="text-purple-600 hover:text-purple-800 hover:underline cursor-pointer font-medium transition-colors duration-200 flex items-center gap-2"
                      >
                        <span>{user?.profile?.resumeOriginalName}</span>
                        <Download className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="text-gray-500 italic">
                        No resume uploaded
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Applied Jobs Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white shadow-xl rounded-3xl mx-[6%] max-sm:mx-[2%] mt-12 mb-20 p-8 max-sm:p-6 border border-gray-100"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-bold text-2xl text-gray-800">Applied Jobs</h1>
          <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent ml-4"></div>
        </div>

        <div className="bg-gray-50/50 rounded-2xl p-1">
          <AppliedJobTable />
        </div>
      </motion.div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />

      <Footer />
    </>
  );
}

export default Profile;
