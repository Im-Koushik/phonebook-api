# Phonebook API

This project implements a contact management system with three APIs using Node.js, sequelize and MySQL database. 
 - Used sequelize for ORM functionality.
 - crypto-js npm package for encrypting/decrypting phone numbers in the database.
 - Followed standard folder structure in the api implementation.
#### It provides endpoints to 
- Create unique user contacts with encrypted phone numbers.
- Find common users for a particular phone number.
- Retrieve contacts by user ID with pagination and name search functionality.

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:Im-Koushik/phonebook-api.git
   ```
  
2. Navigate to the project directory:
   ```bash
   cd phonebook-api
   ```
3. Install dependencies
   ```bash
   npm install
   ```
4. Setup environment variables
   ```bash
   DB_HOST=your-database-host
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   DB_NAME=your-database-name
   CRYPTO_SECRET_KEY=your-crypto-secret-key
   ```
5. Start the server
   ```bash
   npm start
   ```






