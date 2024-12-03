## Create Project
```
npm init -y
npm install express mongoose jsonwebtoken dotenv stripe nodemailer bcryptjs bcrypt cors express-rate-limit helmet
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

## SMTP
### SMTP servers are like the post office for emails. SMTP stands for Simple Mail Transfer Protocol, and it's the standard protocol used across the internet for sending emails.
### Writing the Email (Composing a Letter): Just as you compose a letter, you write an email. This is done through an email client or a service, which could be anything from your Gmail interface to a custom-built application.
### Sending to SMTP Server (Dropping at the Post Office): When you hit 'send', your email client hands over the email to an SMTP server. Think of this as dropping your letter off at the post office. The SMTP server is responsible for processing your email and directing it towards its destination.
### Routing the Email (Sorting and Delivery)
### Recipient's Email Server (Destination Post Office)
### Email Delivery (Mailbox Delivery): Finally, the recipient's email server delivers the email to the recipient's inbox, just as the postman delivers the letter to the recipient's mailbox.

## [SendGrid](https://app.sendgrid.com/)
### SendGrid provides an SMTP (Simple Mail Transfer Protocol) server for sending emails. It is a popular cloud-based email delivery service that offers both SMTP and REST API interfaces for email delivery.
### SendGrid is a cloud-based service that provides email delivery and marketing tools to help businesses communicate effectively with their customers. It handles the complexities of sending large volumes of email and ensures high deliverability rates.
### SMTP Relay: Allows businesses to send emails through SendGrid's servers by conguring their SMTP settings.
### API: Provides a RESTful API to send and manage emails programmatically.
### Email Templates: Offers tools to create and manage email templates.
### Analytics: Tracks email metrics such as opens, clicks, bounces, and spam reports.
### Deliverability: Implements best practices to ensure emails reach the inbox and not the spam folder.
### Users sign up for a SendGrid account and verify their domain and sender identities to improve email deliverability.
### Create api key with full access 
### Single Sender Verification: Add and verify a specific email address [Ref](https://www.twilio.com/docs/sendgrid/ui/sending-email/sender-verification)
### Uers can congure their applications to send emails via SendGrid's SMTP relay or using the SendGrid API.
### Emails are sent from the application to SendGrid, which then processes and delivers them to recipients' inboxes.
### SendGrid provides detailed analytics on email performance, helping users monitor and optimize their email campaigns.

## Nodemailer
### NodeMailer is a library that allows you to send emails from your Node.js applications easily.
### It communicates with an SMTP server to send emails on your behalf. You can congure NodeMailer to use any SMTP server, including popular ones like Gmail, Outlook, or custom SMTP servers provided by email services like SendGrid.
### NodeMailer simplies the process of sending emails in Node.js applications by providing a high-level API.
### SMTP Communication: NodeMailer establishes a connection with an SMTP server using the provided conguration (such as SMTP host, port, and authentication details).
### Email Composition: NodeMailer helps you compose emails, including setting the sender and recipient addresses, subject, body (both text and HTML), and attachments.
### Sending Emails: Once the email is composed, NodeMailer handles the communication with the SMTP server to send the email.
### You can use NodeMailer to connect to SendGrid's SMTP service to send emails. This allows you to leverage SendGrid's email delivery capabilities within Node.js application.
### Limitations: An HTML email that looks fine in one email client might appear broken or differently in another. Email clients do not support the full range of HTML and CSS features that modern web browsers do. Generally tables are used for layouting.
### Transport Conguration: A transport method is configured, specifying the email service provider's details (e.g., SMTP server, port, authentication).
### Email Composition: Email details, including sender, recipient, subject, and content, are composed.
### Sending Emails: The composed email is sent using the configured transport method.
### SendGrid provides the infrastructure for sending emails, ensuring high deliverability and providing analytics. Nodemailer simplies the process of composing and sending emails in Node.js applications.

## Security - bcrypt
### There are three general guidelines for security basis on which we design our backend
### Zero Trust Model: "Never Trust, Always Verify". Assume that no one (neither inside nor outside the network) is trustworthy. This means always verifying the authenticity of users, services, and systems before granting access to resources. Implement strong authentication mechanisms, validate and sanitize all inputs, and regularly audit logs and activities.
### Principle of Least Privilege: "Minimal Access for Maximum Security”. Each user, program, or system should have the least amount of privilege necessary to perform its function. This limits the potential damage in case of a security breach.
### Reduce Attack Surface: "Minimize Risk by Minimizing Exposure". The attack surface refers to the total number of points (like software, services, and ports) where an unauthorized user can try to enter data or extract data from the environment. Reducing the attack surface minimizes the potential entry points for attackers.
### To store passwords securely, we can use a hashing algorithm like bcrypt.
### Predictability of Hashes: For a given input and a known hashing algorithm, the generated hash will always be the same. Example: For the input "password", the hash might be asfdad123r2#$%. For the input "12345678", the hash might be asd12!@#%
### Brute Force Attacks: If an attacker wants to break into a system, the rst step they might take is to perform a brute force attack using a dictionary of the most commonly used passwords and their corresponding hashes.
### The Role of Salting: Modern password hashing techniques use a 'salt' - a random value added to the password before hashing. This ensures that even common passwords result in unique hashes. For example, "password" with different salts won't hash to asfdad123r2#$% every time.
### Why Salting Matters: Without salting, common passwords remain vulnerable because their hashes can be precomputed and stored in lookup tables (rainbow tables). Even if a system uses salts, if the salt is known to the attacker, they can still perform targeted attacks, but the use of unique salts for each password signicantly increases the complexity and time required for such attacks.
### Generate a hash for password here - https://www.md5hashgenerator.com/
### Decrypt the hash here - https://10015.io/tools/md5-encrypt-decrypt#google_vignette
### Emphasizing the problem: A modern server can calculate the MD5 encryption at crazy speed. If your users have passwords which are lowercase, alphanumeric, and 6 characters long, you can try every single possible password of that size in around 40 seconds. By spending a 1000 dollars or so you can crack millions of commonly used passwords. Salts also do not help there.
### Bcrypt is a password hashing function that incorporates a salt to protect against rainbow table attacks. It’s designed to be computationally intensive to slow down brute-force attacks.
### It slows down the process of generating the hash. Instead of cracking a password every 40 seconds, I’d be cracking them every 12 years or so.
### https://codahale.com/how-to-safely-store-a-password/
### Bcrypt is not an encryption algorithm like SHA256; rather, it is a password hashing function. Bcrypt is specically designed for securing passwords. It turns a plain-text password into a hash, which is a fixed-size string of characters that uniquely represents the password. Bcrypt automatically handles salt generation. A salt is a random value added to the password before hashing to ensure that the same password results in different hashes.
### Work Factor: One of the key features of bcrypt is its work factor, which is a measure of how slow the hashing process is. The ability to adjust the work factor is crucial to keeping up with increasing computational power and maintaining the security of the hashes over time.
### Hashing vs. Encryption: Encryption is a reversible process (you encrypt data to later decrypt it), while the hashing function that bcrypt uses is one-way (once you hash data, you can't turn the hash back into the original data).This is useful for storing passwords because even if the hash is exposed, the original password cannot be easily recovered. It stores hash when user register and in hash first string before . represent salt. When user login again, hashfunction use sam salt and incoming password and check whether generated hash same as hash stored in DB
### So the idea is that using bcrypt will make things a little slow so we use it only for the most sensitive data - password
### Owasp - https://owasp.org/www-project-top-ten/
### Search for owasp bcrypt and open the cheatsheet for storage - https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_ Cheat_Sheet.html



create static build for react
add path of it inside server to server static html file
remove proxy from package.json
Now cors issue will come so use cors module

Render
new 
web service
connect with github
select repo to connect
Build Command: cd client && npm install && npm run build && cd ../server && npm install  
till build it is for frontend and rest for BE
Start Command: cd server && npm start
choose free
add env variables
DEPLOY


