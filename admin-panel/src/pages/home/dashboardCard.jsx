import React from "react";
import {
  Calendar,
  Users,
  Briefcase,
  Clock,
  CheckCircle,
  DollarSign,
  TrendingUp,
} from "lucide-react";

const DashboardCards = ({ cards }) => {
  const items = [
    {
      label: "Total Bookings",
      value: cards.totalBookings,
      icon: Calendar,
      color: "bg-blue-500",
      lightBg: "bg-blue-50",
    },
    {
      label: "Total Users",
      value: cards.totalUsers,
      icon: Users,
      color: "bg-purple-500",
      lightBg: "bg-purple-50",
    },
    {
      label: "Providers",
      value: cards.totalProviders,
      icon: Briefcase,
      color: "bg-green-500",
      lightBg: "bg-green-50",
    },
    {
      label: "Pending Bookings",
      value: cards.pendingBookings,
      icon: Clock,
      color: "bg-orange-500",
      lightBg: "bg-orange-50",
    },
    {
      label: "Completed Bookings",
      value: cards.completedBookings,
      icon: CheckCircle,
      color: "bg-teal-500",
      lightBg: "bg-teal-50",
    },
    {
      label: "Gross Revenue",
      value: `₹${cards.grossRevenue}`,
      icon: DollarSign,
      color: "bg-indigo-500",
      lightBg: "bg-indigo-50",
    },
    {
      label: "Admin Commission",
      value: `₹${cards.adminCommission}`,
      icon: TrendingUp,
      color: "bg-pink-500",
      lightBg: "bg-pink-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`${item.lightBg} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon
                    className={`w-6 h-6 ${item.color.replace("bg-", "text-")}`}
                  />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  {item.label}
                </p>
                <p className="text-3xl font-bold text-gray-900">{item.value}</p>
              </div>
            </div>

            <div
              className={`h-1 ${item.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
            ></div>
          </div>
        );
      })}
    </div>
  );
};
export default DashboardCards;
