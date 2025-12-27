const express = require("express");
const router = express.Router();

const service = require("../controllers/service.controller");
const { authenticated } = require("../middlewares/auth.middleware");
const { upload } = require("../helpers/multer");

router.post(
  "/add-service",
  upload.fields([
    { name: "mainimage", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),

  //  authenticated,
  service.addService
); // update service
router.put(
  "/edit-service/:id",
  upload.fields([
    { name: "mainimage", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  // authenticated,
  service.updateService
);

// delete service
router.delete(
  "/delete-service/:id",
  // authenticated,
  service.deleteService
);

router.get(
  "/category/:id/services",
  authenticated,
  service.getServicesByCategory
);

router.get("/service/:id", authenticated, service.getServiceDetail);
router.get(
  "/all-services",
  // authenticated,
  service.getAllServices
);

router.get("/popular-services", service.popularService);

router.post("/book-service", authenticated, service.bookService);
router.get("/all-bookings", service.allBookings);
router.get("/booking/:id", service.bookingDetail);
router.post("/booking/:id/assign-provider", service.assignProvider);

router.get("/my-bookings", authenticated, service.mybookings);
router.post("/cancel-booking", authenticated, service.cancelBooking);
router.put("/booking/:id/status", service.statusUpdate);

module.exports = router;
