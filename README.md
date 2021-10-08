# API Driven.t

This is an API for a web application that manages registrations and reservations for the biggest Driven event, coming soon!

![Peek 2021-10-08 03-44](https://user-images.githubusercontent.com/81721608/136510702-f038a5e9-deec-442d-8e20-f323cf685f63.gif)

Book your ticket now at: https://drivent-front-mu.vercel.app/

## About
Driven.t is a web browser application with which you can manage every single aspect of your event.
Below are the implemented features:

- Sign Up
- Sign In
- Password recovery
- Enrollment form
- Ticket selection (online or face-to-face)
- Payment

- Hotel selection
- Room reservation
- List of activities per day
- Activities selection
- Digital certificate of attendance

<div align="center">
</div> 

## Technologies
The following tools and frameworks were used in the construction of the project:<br>
  ![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)&nbsp;
  ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)&nbsp;
  ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)&nbsp;
  ![PostgresSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)&nbsp;
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)&nbsp;
  ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white)&nbsp;
  ![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)&nbsp;
  
  
### Other technologies



## How to run
1. Clone this repository
2. Install all dependencies
```bash
npm i
```
3. Create a PostgreSQL database with whatever name you want
4. Configure the `.env` file using the `.env.example` file
5. Run all migrations
```bash
npm run migration:run
```
6. Run the back-end in a development environment:
```bash
npm run dev
```
7. Or build it and run it in production environment:
```bash
npm run build
npm start
```

## npm scripts to make life easier
- `dev`: runs the back-end in development mode, watching file changes (with `npm run dev`). ESLint errors will stop the back-end from running
- `build`: generates the JavaScript version for this project (with `npm run build`). ESLint errors will stop the bundle from being created
- `migration:generate`: generates new migrations from typescript in a single step (with `npm run migration:generate -- -n MigrationName`)
- `migration:run`: runs all pending migrations (with `npm run migration:run`)
- `eslint:fix`: runs eslint fixing everything eslint can automatically fix
- `seed`: runs database seed files in `src/seeders` to populate database automatically (with `npm run seed`). Will prompt which seed files should run
