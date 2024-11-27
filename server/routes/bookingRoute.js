const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const auth = require("../middlewares/authMiddleware");
const Booking = require("../model/bookingModel");
const Show = require("../model/showModel");
const EmailHelper = require("../utils/emailHelper");

// authMiddleware ensures that the user is authenticated before booking a show
router.post("/make-payment", auth, async (req, res) => {
	try {
		// expects token (containing payment information) and amount in the request body
		const { token, amount } = req.body;

		// Creates a customer in Stripe using the provided email and payment source (token).
		const customer = await stripe.customers.create({
			email: token.email,
			source: token.id,
		});

		// Creates a payment intent with the specied amount in USD, associating it with the customer
		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount,
			currency: "usd",
			customer: customer.id,
			payment_method_types: ["card"],
			receipt_email: token.email,
			description: "Token has been assigned to the movie!",
		});

		const transactionid = paymentIntent.id;

		// Sends back a success response with the transaction ID if the payment is successful
		res.send({
			success: true,
			message: "Payment successful",
			data: transactionid,
		});
	} catch (err) {
		console.log(err);
		// Sends back an error message if the payment fails
		res.send({
			success: false,
			message: "Failed to make payment",
		});
	}
});

router.post("/book-show", auth, async (req, res) => {
	try {
		// Creates a new instance of Booking model using the data from the request body and saves it to the database
		const newBooking = new Booking(req.body);
		await newBooking.save();

		// Retrieves the show details associated with the booking (show) and updates the list of booked seats (bookedSeats)
		// by adding the new booking's seats
		const show = await Show.findById(req.body.show).populate("movie");
		const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
		await Show.findByIdAndUpdate(req.body.show, {
			bookedSeats: updatedBookedSeats,
		});

		// adding more details for the booked ticket
		const populatedBooking = await Booking.findById(newBooking._id)
			.populate("user")
			.populate("show")
			.populate({
				path: "show",
				populate: {
					path: "movie",
					model: "movies",
				},
			})
			.populate({
				path: "show",
				populate: {
					path: "theatre",
					model: "theatre",
				},
			});

		console.log("this is populated booking", populatedBooking);

		await EmailHelper("ticketTemplate.html", populatedBooking.user.email, {
			name: populatedBooking.user.name,
			movie: populatedBooking.show.movie.title,
			theatre: populatedBooking.show.theatre.name,
			date: populatedBooking.show.date,
			time: populatedBooking.show.time,
			seats: populatedBooking.seats,
			amount: populatedBooking.seats.length * populatedBooking.show.ticketPrice,
			transactionid: populatedBooking.transactionId,
		});

		res.send({
			success: true,
			message: "Show booked successfully",
			data: newBooking,
		});
	} catch (err) {
		console.log(err);
		res.send({
			success: false,
			message: "Failed to book show",
		});
	}
});

router.get("/get-all-bookings", auth, async (req, res) => {
	try {
		const bookings = await Booking.find({ user: req.body.userId })
			.populate("user")
			.populate("show")
			.populate({
				path: "show",
				populate: {
					path: "movie",
					model: "movies",
				},
			})
			.populate({
				path: "show",
				populate: {
					path: "theatre",
					model: "theatres",
				},
			});
		res.send({
			success: true,
			message: "Bookings fetched!",
			data: bookings,
		});
	} catch (err) {
		res.send({
			success: false,
			message: err.message,
		});
	}
});

module.exports = router;
