# Retail-Store

This repository is dedicated to developing the backend infrastructure for an internet retail company's e-commerce website.

## User Story

- AS A manager at an internet retail company
- I WANT a back end for my e-commerce website that uses the latest technologies
- SO THAT my company can compete with other e-commerce companies

## Acceptance Criteria

- GIVEN a functional Express.js API
- WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
- THEN I am able to connect to a database using Sequelize
- WHEN I enter schema and seed commands
- THEN a development database is created and is seeded with test data
- WHEN I enter the command to invoke the application
- THEN my server is started and the Sequelize models are synced to the MySQL database
- WHEN I open API GET routes in Insomnia for categories, products, or tags
- THEN the data for each of these routes is displayed in a formatted JSON
- WHEN I test API POST, PUT, and DELETE routes in Insomnia
- THEN I am able to successfully create, update, and delete data in my database

## Installation

1. Clone the repository: `git clone https://github.com/RaelNW/retail-store.git`
2. Navigate to the project directory:
3. Install dependencies: `npm install`
4. Set up the MySQL database using the provided schema file.
5. Configure the database connection in the `.env` file.

## Usage

1. Run the application: `npm start`
2. Access the API at `http://localhost:3001`

## Dependencies

- Node.js
- Dotenv
- Sequelize
- MySQL
- Express

## Credits

For inquiries, please contact [Rael Wanjala].

## link to Demo

https://drive.google.com/file/d/12yDisc3gEx2Gy5fUU6k6V_GD2c9BZxuy/view?usp=sharing

## Link to Repo

https://github.com/RaelNW/retail-store.git
