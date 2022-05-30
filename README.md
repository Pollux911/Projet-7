<br />
<div align="center">
  

<h3 align="center">Groupomania</h3> </div>

</div>



<!-- ABOUT THE PROJECT --> 
## About The Project
Build a social network for Groupomania




### Built With

* [Vue.js](https://vuejs.org/)
* [MySQL](https://www.mysql.com/)
* [Sequelize](https://sequelize.org/)






### Installation

1. Install MySql

2. Install NPM packages in `back` and `front` directories
   ```sh
   npm install
   ```
3. Enter your mysql username and password in `.env` file
   ```js
   DB_USERNAME='USER'
   DB_PASSWORD='PASSWORD'
   ```
4. Create database with sequelize `npx db:create` in the `back` directory
   ```sh
   npx db:create
   ```
5. Type `npm run serve` in the `front` directory to start the development server
   ```sh
   npm run serve
   ```
6. Start the back end server with `nodemon server` in `back` directory
   ```sh
   nodemon server
   ```
   
7. The username and password of the admin user is
   ```sh
   email: 'admin@admin.com',
   password: 'admin'
   ```