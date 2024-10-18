import React, { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import JobTable from '../pages/adminPage/adminList';
import JobDetailsTable from '../pages/jobRegardings/jobDeatils';

const Router = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<JobDetailsTable />} />
      <Route path="/admin" element={<JobTable />} />
    </Routes>
  );
};

export default Router;
