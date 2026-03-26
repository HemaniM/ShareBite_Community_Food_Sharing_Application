import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { fetchHistoryOverview } from "../../features/history/historySlice";

const HistoryPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHistoryOverview());
  }, [dispatch]);

  return (
    <section className="w-full max-w-[975px] mx-auto pb-16 mt-[80px]">
      <div className="mx-auto flex w-fit rounded-[12px] bg-[#F4F4ED]">
        <NavLink
          to="requests"
          className={({ isActive }) =>
            `px-[25px] py-[14px] text-[14px] leading-none tracking-[0.7px] rounded-[10px] font-bold ${
              isActive ? "bg-[var(--primary-green-300)] text-white" : "text-[var(--text-grey-3)] hover:text-[var(--text-grey-4)]"
            }`
          }
        >
          MY REQUESTS
        </NavLink>

        <NavLink
          to="food-posts"
          className={({ isActive }) =>
            `px-[25px] py-[14px] text-[14px] leading-none tracking-[0.7px] rounded-[10px] font-bold ${
              isActive
                ? "bg-[var(--primary-green-300)] text-white"
                : "text-[var(--text-grey-3)] hover:text-[var(--text-grey-4)]"
            }`
          }
        >
          FOOD POSTS
        </NavLink>
      </div>

      <div className="mt-[50px]">
        <Outlet />
      </div>
    </section>
  );
};

export default HistoryPage;