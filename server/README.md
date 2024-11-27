## Create Project
```
npm init -y
npm install express mongoose bcryptjs jsonwebtoken dotenv stripe
```

## JSON Web Token JWT
### User login is persisted even when window or browser is closed. This is possible because of a mechanism called session persistence. When a user logs in, the server generates a token, which is then saved on the client side, either in local storage or as cookies. This token, known as a JSON Web Token (JWT), carries the user's authentication information.
### When the user returns to the app, the client sends the stored token to the server with each request. The server validates the token to ensure it's still valid and has not been tampered with. If the token is valid, the server allows the user to access protected routes without requiring them to log in again.
### The benefit of using JWTs is that the server doesn't need to store session information. Instead, the token itself contains all the information needed to verify the user's identity, making the system more scalable and reducing server-side complexity
### JSON Web Token (JWT) is an open standard (RFC 7519) for securely transmitting information between parties as a JSON object. JWTs are commonly used for authentication and authorization in web applications.
### A JWT is composed of three parts: Header, Payload, Signature. These parts are separated by dots (.) and are encoded in Base64 URL format.
### Header:  header typically consists of two parts: the signing algorithm being used, such as HMAC SHA256 or RSA and the type of token (JWT)
```
{
  "alg": "HS256",
  "typ": "JWT"
}
```
### Payload: The payload contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims:
- Registered claims: Predefined claims which are not mandatory but recommended, e.g., iss (issuer), exp (expiration time), sub (subject), aud (audience).
- Public claims: Custom claims created to share information, e.g., name, role.Custom claims intended to be shared openly and used across different systems, registered to avoid naming collisions. In a microservices architecture, various microservices might need to authenticate and authorize requests based on JWTs. Public claims allow these services to understand the user information consistently. In an SSO environment, multiple applications or services need to authenticate the same user based on a single set of credentials. Public claims ensure that the user information is consistently understood across all these systems.
- Private claims: Custom claims agreed upon between parties, e.g., user_id.
```
{
 "sub": "1234567890", // Registered claim: Subject
 "name": "John Doe", // Public claim: User's name
 "email": "john.doe@example.com", // Public claim: User's email
 "role": "admin", // Public claim: User's role
 "user_id": "abc123", // Private claim: Custom user ID
 "department": "sales", // Private claim: User's department
 "permissions": ["read", "write"] // Private claim: User's permissions
}
```
### Signature: To create the signature, the encoded header, encoded payload, a secret, and the algorithm specified in the header are used. For example, if using HMAC SHA256, the signature is created in the following way
```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  your-256-bit-secret
) 

JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```
### The server does not need to store session information, making it easier to scale. JWTs are small in size, making them suitable for being sent via URLs, POST parameters, or inside HTTP headers. JWTs contain all the necessary information about the user, eliminating the need for multiple database queries.
### Authentication Use: Ensures that the client is logged in before accessing protected routes.
### Information Exchange Use: Securely transfers information between parties, ensuring data integrity and authenticity.

## How JWT works 
### Client Authentication: When a user logs in, the server generates a JWT and sends it back to the client.
### Client Storage: The client stores the JWT (usually in localStorage or a cookie).
### Subsequent Requests: The client includes the JWT in the header of each subsequent request to the server, usually in the Authorization header as a Bearer token.
```
Authorization: Bearer <token>
```
### Server Validation: The server receives the JWT (typically in the Authorization header as Bearer <token>). It decodes the header and payload (Base64-encoded data). The server checks the token's signature to ensure it wasn't tampered with. This process depends on the signing algorithm used. eg, In HMAC (e.g., HS256), A secret key is shared between the issuer and the server. The server recalculates the signature using the header and payload with its secret key. Compares it to the signature in the token. If they match, the token is valid. If the JWT is valid, the server processes the request; otherwise, it rejects the request.

###
###
###
###
###
###