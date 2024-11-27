const router = require("express").Router();

const Show = require("../model/showModel");

router.post("/add-show", async (req, res) => {
	try {
		const newShow = new Show(req.body);
		await newShow.save();
		res.send({
			success: true,
			message: "Show added successfully",
		});
	} catch (err) {
		console.log(err);
		res.send({
			success: false,
			message: "Failed to add show",
		});
	}
});

router.post("/delete-show", async (req, res) => {
	try {
		await Show.findByIdAndDelete(req.body.showId);
		res.send({
			success: true,
			message: "Show deleted successfully",
		});
	} catch (err) {
		console.log(err);
		res.send({
			success: false,
			message: "Failed to delete show",
		});
	}
});

// update show
router.put("/update-show", async (req, res) => {
	try {
		await Show.findByIdAndUpdate(req, body.showId, req.body);
		res.send({
			success: true,
			message: "Show updated successfully",
		});
	} catch (err) {
		console.log(err);
		res.send({
			success: false,
			message: "Failed to update show",
		});
	}
});

/* 
Populating Owner Field: The .populate('owner') method is used to populate the owner eld in the theatre documents with the related
owner data from the Owner collection. 
This provides detailed information about the owner of each theatre. 
*/
router.post("/get-all-shows-by-theatres", async (req, res) => {
	try {
		const shows = await Show.find({ theatre: req.body.theatreId }).populate(
			"movie"
		);
		res.send({
			success: true,
			data: shows,
			message: "All shows by theatre",
		});
	} catch (err) {
		console.log(err);
		res.send({
			success: false,
			message: "Failed to get all shows by theatre",
		});
	}
});

/*
get all theatres by movie which has the show

This route handles a POST request to /get-all-theatres-by-movie.
It expects the request body (req.body) to contain movie and date.
It retrieves all shows of the specified movie and date from the database (await
Show.find({ movie, date }).populate('theatre')).
It then filters out unique theatres and organizes shows under each unique theatre.
It sends a success response with the fetched theatres and associated shows.
If there's an error (e.g., database error), it sends a failure response with an error
message.
 */
router.post("/get-all-theatres-by-movie", async (req, res) => {
	try {
		const { movie, date } = req.body;
		const shows = await Show.find({ movie, date }).populate("theatre");
		// filter out the unique theatre
		const uniqueTheatres = [];
		shows.forEach((show) => {
			const isTheatere = uniqueTheatres.find(
				(theatre) => theatre._id === show.theatre._id
			);
			if (!isTheatere) {
				const showsOfThisTheatre = shows.filter(
					(showObj) => showObj.theatre._id === show.theatre._id
				);
        // The ._doc property is used to extract the raw theatre data from Mongoose documents
				uniqueTheatres.push({
					...show.theatre._doc,
					shows: showsOfThisTheatre,
				});
				// uniqueTheatre -> [{theatre1, shows: [show1, show2]},{theatre2, shows:[show1, show2]}]
			}
		});
		res.send({
			success: true,
			data: uniqueTheatres,
			message: "All theatres by movie",
		});
	} catch (err) {
		console.log(err);
		res.send({
			success: false,
			message: "Failed to get all theatres by movie",
		});
	}
});

router.post("/get-show-by-id", async (req, res) => {
	try {
		const show = await Show.findById(req.body.showId)
			.populate("movie")
			.populate("theatre");
		res.send({
			success: true,
			data: show,
			message: "Show by id",
		});
	} catch (err) {
		console.log(err);
		res.send({
			success: false,
			message: "Failed to get show by id",
		});
	}
});

module.exports = router;
