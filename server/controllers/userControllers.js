const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
	try {
		const userExists = await User.findOne({ email: req.body.email });
		if (userExists) {
			return res.send({
				success: false,
				message: "User already exists",
			});
		}

		// hash the password
		const saltRounds = 10; // higher the number, more secure the password but more time it will take to hash
		const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
		console.log("hashedPassword", hashedPassword);

		const newUser = new User({
			...req.body,
			password: hashedPassword,
		});

		await newUser.save();

		res.send({
			success: true,
			message: "User registered successfully, Please Login",
		});
	} catch (err) {
		console.log(err);
	}
};

async function hashPassword(password) {
	console.time("time taken");
  //explicitly generating salt
	const salt = await bcrypt.genSalt(12);
	console.log("salt", salt);
	const hashedPassword = await bcrypt.hash(password, salt);
	console.log("hashedPassword", hashedPassword);
	console.timeEnd("time taken");
	console.log("**************");
	return hashedPassword;
}

const login = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
    console.log("req received", req.body, user);
    //token created
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});
		console.log("token", token);
		if (!user) {
			return res.send({
				success: false,
				message: "User not found. Please register",
			});
		}
		// if (req.body.password !== user.password) {
		// 	return res.send({
		// 		success: false,
		// 		message: "Sory, Invalid password",
		// 	});
		// }

		const isMatch = await bcrypt.compare(req.body.password, user.password);
		if (!isMatch) {
			return res.send({
				success: false,
				message: "Sory, Invalid password",
			});
		}
    
    // // check how salt works
		// const password = "Tirth@123";
		// hashPassword(password);

		res.send({
			success: true,
			message: "Login Successful",
			user: user,
			data: token,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).send({
			success: false,
			message: "Internal Server Error",
		});
	}
};

/* 
Once the middleware verifies the token and attaches the userId to the request body, 
the /get-current-user route handler uses this userId to fetch and return the authenticated user's data except user's password 

In postman, get token from login request and do post request to /get-current-user with that token as Auth field as Bearer Token
*/
const getCurrentUser = async (req, res) => {
  //select everything from document except password
	const user = await User.findById(req.body.userId).select("-password");
	console.log("found user", user);
	res.send({
		success: true,
		data: user,
		message: "You are authorized to go the protected route",
	});
};

module.exports = {
	register,
	login,
	getCurrentUser,
};
