import { useContext, useEffect, useState } from "react";
import { attendanceContext } from "./context";
import axios from "axios";
export const useAttendance = () => {
  return useContext(attendanceContext);
};
const AttendanceProvider = ({ children }) => {
  const [attendanceStudents, setAttendanceStudents] = useState({
    subject: null,
    students: [],
  });

  const attendanceStudent = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/attendance/take/attendance`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (data.success) {
        setAttendanceStudents((prev) => ({
          ...prev,
          subject: data?.subject,
          students: data?.attendanceStudents,
        }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <attendanceContext.Provider
      value={{ attendanceStudents, setAttendanceStudents, attendanceStudent }}
    >
      {children}
    </attendanceContext.Provider>
  );
};

export default AttendanceProvider;
