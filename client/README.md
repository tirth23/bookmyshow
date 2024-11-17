### index.jsx is a file which is kind of default file in folder where bundler will look for if we have not mentioned any file while importing from that folder

```
npx create-react-app client
npm install react-router-dom antd axios
```

## CORS
### CORS stands for Cross-Origin Resource Sharing. It's a security feature implemented by web browsers to control how resources (like HTML, JavaScript, or data) can be requested from another domain (origin) than the one that served the web page.
### When you make an API request from your frontend code (like a React app running on http://localhost:3000) to a backend server (like http://localhost:8081), the browser sees this as a "cross-origin" request because the ports are different. To protect users, browsers block these requests by default unless the server explicitly allows them. This prevents malicious websites from accessing sensitive data from other sites.
### Preflight Request:- 
### A preflight request is a part of the Cross-Origin Resource Sharing (CORS) mechanism used in modern web browsers. It ensures secure communication between a browser and a server when performing cross-origin HTTP requests that could have side effects on server data.
### A preflight request is an HTTP OPTIONS request sent by the browser to the server before the actual HTTP request is sent. It checks if the server permits the cross-origin request with the specific HTTP method and headers.
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
### Frontend (React app): Running on http://localhost:3000
### Backend (API server): Running on http://localhost:8081
### If you try to make a fetch request from the React app to the API server, the browser will block it unless the server sends back the appropriate CORS headers.

## Proxy
### In development, dealing with CORS can be a hassle, so we use a proxy to make it easier.
### By adding a proxy setting in your package.json, you can instruct the development server to forward API requests to your backend server. This makes the browser think the requests are coming from the same origin.
package.json
```
"proxy": "http://localhost:8082"
```
### The proxy field in the package.json file of a Create React App project is used to redirect API requests during development to avoid CORS issues.
### When your React app running on http://localhost:3000 makes a request to /api/data, the development server intercepts this request. It then forwards the request to http://localhost:8081/api/data. The server responds, and the development server sends this response back to your React app. By doing this, you avoid CORS issues without needing to configure CORS headers on your backend server during development.

