### index.jsx is a file which is kind of default file in folder where bundler will look for if we have not mentioned any file while importing from that folder

```
npx create-react-app client
npm install react-router-dom antd axios
```

## Proxy & CORS
```
"proxy": "http://localhost:8082"
```
### The proxy field in the package.json file of a Create React App project is used to redirect API requests during development to avoid CORS issues
### CORS stands for Cross-Origin Resource Sharing. It's a security feature implemented by web browsers to control how resources (like HTML, JavaScript, or data) can be requested from another domain (origin) than the one that served the web page.
### When you make an API request from your frontend code (like a React app running on http://localhost:3000) to a backend server (like http://localhost:8081), the browser sees this as a "cross-origin" request because the ports are different. To protect users, browsers block these requests by default unless the server explicitly allows them. This prevents malicious websites from accessing sensitive data from other sites.
### Preflight Request:- 
### A preflight request is a part of the Cross-Origin Resource Sharing (CORS) mechanism used in modern web browsers. It ensures secure communication between a browser and a server when performing cross-origin HTTP requests that could have side effects on server data.
### A preflight request is an HTTP OPTIONS request sent by the browser to the server before the actual HTTP request is sent. It checks if the server permits the cross-origin request with the specific HTTP method and headers.
### Browsers enforce the same-origin policy, which restricts how resources on a page can be requested from another domain. For certain requests (those with methods or headers that are not considered "simple"), the browser sends a preflight request to ensure the target server explicitly allows the operation.
### Simple Requests:-
### Methods: GET, POST, HEAD
### Headers: Only simple headers (Accept, Accept-Language, Content-Type with values like text/plain, application/x-www-form-urlencoded, or multipart/form-data).
### No preflight request is sent for these.
### Non-Simple Requests:-
- Methods like PUT, DELETE, or PATCH.
- Custom headers (e.g., Authorization, X-Custom-Header).
- Requests that use non-simple Content-Type (e.g., application/json).
### Response with Headers:-
### If the server allows the request, it responds with specific headers: 
### Access-Control-Allow-Origin: Specifies which origins can access the resource.
### Access-Control-Allow-Methods: Specifies which HTTP methods (GET, POST, etc.) are allowed.
### Access-Control-Allow-Headers: Specifies which headers can be used in the actual request.
### Frontend (React app): Running on http://localhost:3000
### Backend (API server): Running on http://localhost:8081
### If you try to make a fetch request from the React app to the API server, the browser will block it unless the server sends back the appropriate CORS headers.
