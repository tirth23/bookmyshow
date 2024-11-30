import axios from "axios";

/* 
Setting up a custom instance of Axios
axios.create({ ... }): This method is used to create a new Axios instance with a custom configuration.
The configuration object passed to axios.create includes a headers property, which sets default headers for all requests made using this
instance 

Creating an Axios instance with custom configuration can be useful for several reasons:
Default Configuration: You can set default headers, base URLs, timeouts, and other settings that will apply to all requests made with
this instance, ensuring consistency across your API calls.
Custom Interceptors: You can add request or response interceptors to handle things like authentication tokens or logging for all requests
made with this instance.
Reusability: Having a pre-configured instance makes it easy to reuse the same settings across different parts of your application.

The Bearer part in the Authorization header is used to specify the authentication scheme that is being used. 
In this case, it indicates that the client is using a Bearer Token for authentication.
A Bearer Token is a type of token that is used for authentication. The term "bearer" means that whoever "bears" (holds) 
the token can use it to access protected resources. 
The token itself is proof of the bearer’s right to access the resource.
The authorization field in the headers object of the Axios instance is crucial for making authenticated requests to a server,
ensuring that only authorized users can access protected resources.
*/
export const axiosInstance = axios.create({
	baseURL: "http://localhost:3000/",
	headers: {
		"Content-Type": "application/json",
		// 'authorization': `Bearer ${localStorage.getItem('token')}`
	},
});

/* 
axios.create method runs when the file is loaded, not every time the request is made. 
If the token is set later (e.g., after user login), the Axios instance may be initialized with a null or outdated value for the token.
Add a request interceptor to dynamically attach the latest token from localStorage to the request headers
*/
axiosInstance.interceptors.request.use(
	function (config) {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);
