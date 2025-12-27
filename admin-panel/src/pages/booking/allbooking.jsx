// Improved AllBooking UI with cleaner design, fewer icons, reduced clutter
import { useEffect, useState } from "react";
import { BookingService } from "../../services/booking.service";
import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AllBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("DESC");

  const load = async () => {
    setLoading(true);
    const res = await BookingService.getAll({
      search,
      status,
      page,
      limit: 10,
      sortBy,
      order,
    });
    setBookings(res.data.data || []);
    setTotalPages(res.data.totalPages || 1);
    setLoading(false);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      load();
    };
    fetchCategories();
  }, [search, status, page, sortBy, order]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6 border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800">All Bookings</h1>
        <p className="text-slate-500 mt-1">{bookings.length} total records</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6 border border-slate-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user, service, location..."
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <select
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
            className="px-4 py-3 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="on_the_way">On the Way</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className="flex items-center gap-3 border border-slate-300 rounded-xl px-4">
            <SlidersHorizontal className="text-slate-600 w-4 h-4" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent py-3 outline-none"
            >
              <option value="id">ID</option>
              <option value="bookingDate">Date</option>
              <option value="bookingTime">Time</option>
            </select>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="bg-transparent py-3 outline-none"
            >
              <option value="DESC">DESC</option>
              <option value="ASC">ASC</option>
            </select>
          </div>
        </div>
      </div>

      {/* Booking Table */}
      <div className="bg-white rounded-2xl shadow border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                {[
                  "ID",
                  "User",
                  "Service",
                  "Date",
                  "Time",
                  "Location",
                  "Price",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [...Array(10)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(8)].map((__, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="py-10 text-center text-slate-500 font-medium"
                  >
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-blue-50 transition">
                    <td className="px-6 py-4 font-bold text-blue-600">
                      #{b.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">
                      {b.user?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">
                      {b.service?.title}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {b.bookingDate}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {new Date(b.bookingTime).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 text-slate-700">{b.location}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      ₹{b.priceAtBooking}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          {
                            pending: "bg-yellow-100 text-yellow-700",
                            confirmed: "bg-blue-100 text-blue-700",
                            on_the_way: "bg-purple-100 text-purple-700",
                            completed: "bg-green-100 text-green-700",
                            cancelled: "bg-red-100 text-red-700",
                          }[b.status]
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>{" "}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="inline-flex gap-4">
                        <Link to={`/booking/allbookings/${b.id}`}>
                          {" "}
                          <Eye color="black" />
                        </Link>

                        <Trash color="red" />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center px-6 py-4 bg-slate-50 border-t border-slate-200">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-slate-700 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <span className="text-sm font-medium text-slate-700">
            Page <span className="text-blue-600">{page}</span> of {totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-slate-700 disabled:opacity-50"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
