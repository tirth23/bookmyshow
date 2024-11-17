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
### Preflight Request: For certain types of requests, the browser sends an HTTP OPTIONS request to the server before the actual request. This is called a preflight request. It checks if the server permits the actual request.
### Response with Headers:
### If the server allows the request, it responds with specific headers: 
### Access-Control-Allow-Origin: Specifies which origins can access the resource.
### Access-Control-Allow-Methods: Specifies which HTTP methods (GET, POST, etc.) are allowed.
### Access-Control-Allow-Headers: Specifies which headers can be used in the actual request.
### Frontend (React app): Running on http://localhost:3000
### Backend (API server): Running on http://localhost:8081
### If you try to make a fetch request from the React app to the API server, the browser will block it unless the server sends back the appropriate CORS headers.
