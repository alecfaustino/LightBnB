# LightBnB 

A simple multi-page AirBnB clone that uses server-side Javascript to display the information from queries to web pages via SQL Queries

## Learning Outcomes

This project helped me gain a deeper understanding of the following concepts:
- Relational Database
  - Worked with PostgreSQL queries and persisted data into a database.

- Database Security
  - Implemented parameterized queries to protect against SQL injection attacks.

- Database Design
  - Conceptualized and designed Entity-Relationship Diagrams (ERDs) to plan the database schema.

## Final Product
### Log-in Validation
![Log-in Validation](/images/login.png)

### Add Users to Database with Registration

![Registration](/images/register.png)

### Add Properties to Database
![Add Listing](/images/addlisting.png)

### Query Properties with Filters
![Search Properties](/images/search.png)

### Display Reservations Belonging to a User
![My Reservations](/images/myreservations.png)
## Getting Started
1. Clone the repository onto your local device.
2. Install dependencies using the `npm install` command.
3. Navigate to LightBnB_WebApp directory in the terminal
4. Start the web server using the `npm run local` command. 
The app will be served at <http://localhost:3000/>
5. Go to <http://localhost:3000/> in your browser.

## Dependencies

- bcrypt: For hashing passwords.
- cookie-session: For session management. 
- express: Web framework for building the app.
- nodemon: Tool for automatic server restart during development.
- pg: PostgreSQL for Node.js