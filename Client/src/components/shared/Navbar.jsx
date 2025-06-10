import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  BriefcaseBusiness,
  BuildingIcon,
  Home,
  HomeIcon,
  LogOut,
  Menu,
  MenuIcon,
  SearchCheck,
  User2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { setSearchedQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.auth);

  const logoutHandler = async () => {
    try {
      const response = await axios.post(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const resetQuery = () => {
    dispatch(setSearchedQuery(""));
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md bg-white/95"
    >
      <div className="flex items-center justify-between mx-auto h-16 max-sm:px-4 sm:px-[5%] lg:px-[10%]">
        {/* Logo */}
        <motion.div
          onClick={() => navigate("/")}
          className="cursor-pointer group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h1 className="max-sm:text-lg text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-[#F83002] group-hover:to-[#d62a02] transition-all duration-300">
            Job <span className="text-purple-600    ">Finder</span>
          </h1>
        </motion.div>

        <div className="flex items-center gap-12 max-sm:gap-5">
          {/* Desktop Navigation */}
          <ul className="flex font-medium items-center gap-8 max-sm:hidden">
            {user && user.role === "recruiter" ? (
              <>
                <motion.li
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to="/admin/companies"
                    className="text-gray-700 hover:text-[#F83002] transition-colors duration-200 font-medium relative group"
                  >
                    Companies
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F83002] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to="/admin/jobs"
                    className="text-gray-700 hover:text-[#F83002] transition-colors duration-200 font-medium relative group"
                  >
                    Jobs
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F83002] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.li>
              </>
            ) : (
              <>
                <motion.li
                  onClick={resetQuery}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to="/"
                    className="text-gray-700 hover:text-[#F83002] transition-colors duration-200 font-medium relative group"
                  >
                    Home
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F83002] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to="/jobs"
                    className="text-gray-700 hover:text-[#F83002] transition-colors duration-200 font-medium relative group"
                  >
                    Jobs
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F83002] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.li>
                <motion.li
                  onClick={resetQuery}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to="/browse"
                    className="text-gray-700 hover:text-[#F83002] transition-colors duration-200 font-medium relative group"
                  >
                    Browse
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F83002] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.li>
              </>
            )}
          </ul>

          {/* Auth Buttons / User Profile */}
          {!user ? (
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Link to="/login">
                <Button
                  className="cursor-pointer border-[#F83002] text-[#F83002] hover:bg-[#F83002] hover:text-white transition-all duration-300 font-medium px-6"
                  variant="outline"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-[#6A38C2] to-[#5b30a6] hover:from-[#5b30a6] hover:to-[#4a2890] cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 font-medium px-6">
                  Signup
                </Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Popover>
                <PopoverTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Avatar className="cursor-pointer ring-2 ring-gray-200 hover:ring-[#F83002] transition-all duration-300 shadow-md">
                      {user?.profile?.profilePhoto ? (
                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt="profile"
                        />
                      ) : (
                        <AvatarImage
                          src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_3.png"
                          alt="profile"
                        />
                      )}
                    </Avatar>
                  </motion.div>
                </PopoverTrigger>
                <PopoverContent className="w-80 shadow-xl border-0 bg-white/95 backdrop-blur-md">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex gap-4 space-y-2 p-2">
                      <Avatar className="cursor-pointer ring-2 ring-gray-200">
                        {user?.profile?.profilePhoto ? (
                          <AvatarImage
                            src={user?.profile?.profilePhoto}
                            alt="profile"
                          />
                        ) : (
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="profile"
                          />
                        )}
                      </Avatar>
                      <div>
                        <h4 className="font-bold text-gray-800">
                          {user?.fullname}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {user?.profile?.bio}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col my-3 text-gray-600">
                      {user && user?.role === "student" && (
                        <motion.div
                          className="flex w-fit items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                          whileHover={{ x: 5 }}
                        >
                          <User2 className="text-[#F83002]" />
                          <Button
                            className="cursor-pointer text-gray-700 hover:text-[#F83002] font-medium"
                            variant="link"
                          >
                            <Link to="/profile">View Profile</Link>
                          </Button>
                        </motion.div>
                      )}

                      <motion.div
                        className="flex w-fit items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
                        whileHover={{ x: 5 }}
                      >
                        <LogOut className="text-red-500" />
                        <Button
                          onClick={logoutHandler}
                          className="cursor-pointer text-gray-700 hover:text-red-500 font-medium"
                          variant="link"
                        >
                          Logout
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </PopoverContent>
              </Popover>
            </motion.div>
          )}

          {/* Mobile Menu */}
          <div className="sm:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Avatar className="cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                    <MenuIcon className="mt-1 text-gray-700" />
                  </Avatar>
                </motion.div>
              </PopoverTrigger>
              <PopoverContent className="w-80 shadow-xl border-0 bg-white/95 backdrop-blur-md">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-2"
                >
                  {user && user.role === "recruiter" ? (
                    <div className="flex flex-col gap-2">
                      <motion.div
                        onClick={() => navigate("/admin/companies")}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                        whileHover={{ x: 5 }}
                      >
                        <BuildingIcon className="size-5 text-[#F83002]" />
                        <p className="text-lg font-medium text-gray-700">
                          Companies
                        </p>
                      </motion.div>

                      <motion.div
                        onClick={() => navigate("/admin/jobs")}
                        className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        whileHover={{ x: 5 }}
                      >
                        <BriefcaseBusiness className="text-[#F83002]" />
                        <p className="text-lg font-medium text-gray-700">
                          Jobs
                        </p>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <motion.div
                        onClick={() => {
                          navigate("/");
                          dispatch(setSearchedQuery(""));
                        }}
                        className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        whileHover={{ x: 5 }}
                      >
                        <HomeIcon className="size-5 text-[#F83002]" />
                        <p className="text-lg font-medium text-gray-700">
                          Home
                        </p>
                      </motion.div>

                      <motion.div
                        onClick={() => navigate("/jobs")}
                        className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        whileHover={{ x: 5 }}
                      >
                        <BriefcaseBusiness className="text-[#F83002]" />
                        <p className="text-lg font-medium text-gray-700">
                          Jobs
                        </p>
                      </motion.div>

                      <motion.div
                        onClick={() => {
                          navigate("/browse");
                          dispatch(setSearchedQuery(""));
                        }}
                        className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        whileHover={{ x: 5 }}
                      >
                        <SearchCheck className="text-[#F83002]" />
                        <p className="text-lg font-medium text-gray-700">
                          Browse
                        </p>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
