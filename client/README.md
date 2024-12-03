### TO START DEV SERVER, ADD "proxy": "http://localhost:8082" in package.json
### npm start

```
npx create-react-app client
npm install react-router-dom antd @ant-design/icons axios @reduxjs/toolkit react-redux moment react-stripe-checkout
```

### index.jsx is a file which is kind of default file in folder where bundler will look for if we have not mentioned any file while importing from that folder

## CORS
### CORS stands for Cross-Origin Resource Sharing. It's a security feature implemented by web browsers to control how resources (like HTML, JavaScript, or data) can be requested from another domain (origin) than the one that served the web page. When you make an API request from your frontend code (like a React app running on http://localhost:3000) to a backend server (like http://localhost:8081), the browser sees this as a "cross-origin" request because the ports are different. To protect users, browsers block these requests by default unless the server explicitly allows them. This prevents malicious websites from accessing sensitive data from other sites.
### The browser doesn’t need to “ask” the server if the request is cross-origin. It determines this entirely on its own by comparing the origin of the page making the request with the URL of the request. The browser compares the origin of the page (where the JavaScript is running) with the origin of the request URL. If the protocol, domain, or port is different, the browser classifies the request as cross-origin. Whether a preflight request is required for a POST request depends on whether it’s a simple request or not.
Page Origin: http://localhost:3000,
POST Request URL: http://localhost:8082/api/data,
Different port → Cross-origin
### Preflight Request: A preflight request is a part of the Cross-Origin Resource Sharing (CORS) mechanism used in modern web browsers. It ensures secure communication between a browser and a server when performing cross-origin HTTP requests that could have side effects on server data. A preflight request is an HTTP OPTIONS request sent by the browser to the server before the actual HTTP request is sent. It checks if the server permits the cross-origin request with the specific HTTP method and headers.
### Browsers enforce the same-origin policy, which restricts how resources on a page can be requested from another domain. For certain requests (those with methods or headers that are not considered "simple"), the browser sends a preflight request to ensure the target server explicitly allows the operation.

### Simple Requests:-
- Methods: GET, POST, HEAD
- Headers: Only simple headers (Accept, Accept-Language, Content-Type with values like text/plain, application/x-www-form-urlencoded, or multipart/form-data).
- No preflight request is sent for these.

### Non-Simple Requests:-
- Methods like PUT, DELETE, or PATCH.
- Custom headers (e.g., Authorization, X-Custom-Header).
- Requests that use non-simple Content-Type (e.g., application/json).
- preflight request is necessary

### Browser Sends a Preflight Request (OPTIONS):-
- Method: OPTIONS
- Headers:
  - Origin: The origin of the requesting site (e.g., http://example.com).
  - Access-Control-Request-Method: The HTTP method (e.g., PUT, DELETE) of the actual request.
  - Access-Control-Request-Headers: Any custom headers to be sent in the actual request.

### Server Responds to the Preflight Request:-
If the server allows the request, it responds with specific headers: 
- Responds with 200 OK.
- Includes CORS headers such as
  - Access-Control-Allow-Origin: Specifies which origins can access the resource.
  - Access-Control-Allow-Methods: Specifies which HTTP methods (GET, POST, etc.) are allowed.
  - Access-Control-Allow-Headers: Specifies which headers can be used in the actual request.
  - Access-Control-Max-Age: Indicates how long the results of the preflight request can be cached.

If the server denies the request:
- Responds with an error or no CORS headers.

### Browser Proceeds with the Actual Request (or Cancels):
- If the preflight is successful, the browser sends the actual request.
- If the preflight fails, the browser blocks the actual request.

### Preflight requests are invisible to the end-user and are automatically handled by the browser. They add an extra round-trip, which can impact performance. To mitigate this:
- Use Access-Control-Max-Age to cache preflight responses.
- Avoid unnecessary custom headers.
- Optimize server-side handling of preflight requests.

### If you try to make a fetch request from the React app to the API server, the browser will block it unless the server sends back the appropriate CORS headers.
Frontend (React app): Running on http://localhost:3000,
Backend (API server): Running on http://localhost:8082

## Proxy
### In development, dealing with CORS can be a hassle, so we use a proxy to make it easier.
### By adding a proxy setting in your package.json, you can instruct the development server to forward API requests to your backend server. This makes the browser think the requests are coming from the same origin.
package.json
```
"proxy": "http://localhost:8082"
```
### The proxy field in the package.json file of a Create React App project is used to redirect API requests during development to avoid CORS issues.
### Development server(webpack-dev-server or Vite) intercepts all API requests made from the React app.. When your React app running on http://localhost:3000 makes a request to /api/data, the react development server intercepts this request. the development server notices the relative path (/api/data) and matches it against the proxy setting in package.json. The development server forwards this request to the backend server at http://localhost:8082/api/data. The server responds, and the development server sends this response back to your React app. The React development server takes the response from the backend and forwards it back to the browser as if the response originated from http://localhost:3000. 
### Why the Browser Believes It’s From the Same Origin. The browser only communicates with http://localhost:3000 (the development server). Since:
- The request originates from the same origin (http://localhost:3000).
- The response is returned from the same origin (http://localhost:3000)
### By doing this, you avoid CORS issues without needing to configure CORS headers on your backend server during development. The proxy hides the fact that the frontend and backend are running on different origins (3000 and 8082)

## Payment Gateway
### Stripe is an online payment processing platform that enables businesses to accept payments over the internet. It provides a suite of APIs (Application Programming Interfaces) that allows developers to integrate payment processing into websites and mobile applications easily.
### Stripe supports various payment methods including credit cards, debit cards, digital wallets (like Apple Pay and Google Pay), and bank transfers
### Developers can integrate Stripe into their applications using Stripe's APIs and SDKs (Software Development Kits). This integration allows businesses to securely capture and process payments without handling sensitive card information directly. Stripe is known for its robust security measures. It handles compliance and security requirements such as PCI-DSS (Payment Card Industry Data Security Standard) compliance, ensuring that payment information is handled securely.
### Apart from basic payment processing, Stripe offers features like subscription billing, recurring payments, invoicing, and customizable checkout experiences. Businesses using Stripe have access to a dashboard that provides insights into transactions, customer data, and other analytics related to payments.
### Account Creation:-
- create account with different country
- continue without setting up business
- Get API keys: Publishable Key, Secret Key
### Publishable Key: The publishable key is used on the client-side (in the browser or mobile app) to identify your Stripe account when making API requests. It is safe to expose this key in your frontend code (e.g., JavaScript), as it does not grant access to sensitive actions like issuing refunds or viewing transactions. Its primary purpose is to initialize Stripe.js (Stripe's JavaScript library) on the client side and to generate secure tokens for handling payment details securely. This key is used on the client side to securely communicate with Stripe and generate a token representing the payment details. Token that has been generated from the client side, this is not complete payment , we need to validate this token from our server side as well
### Secret Key: The secret key, also known as the API key, is used on the server-side of your application to authenticate API requests to Stripe. This key must be kept condential and should never be exposed in frontend code or client-side applications.The secret key, also known as the API key, is used on the server-side of your application to authenticate API requests to Stripe. This key must be kept condential and should never be exposed in frontend code or client-side applications.
### [Ref](https://dashboard.stripe.com/test/dashboard)
### [Test Card Number](https://docs.stripe.com/testing?testing-method=card-numbers#visa)

Remove   "proxy": "http://localhost:8082" from package.json when deployed