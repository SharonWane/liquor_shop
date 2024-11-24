# liquor_shop_project
## Intro
this project is a trainning project of a beginner.

---

## Features

- User authentication and account management
- Product searching
- Shopping cart functionality
- Admin dashboard for managing products
- RESTful API for backend functionality



---

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Frontend**: HTML, CSS, JavaScript (with EJS templates)

---

## Installation

Follow these steps to set up the project locally:

### Prerequisites

1. **Node.js** installed on your system. [Download here](https://nodejs.org/).
2. **MongoDB** installed or access to a MongoDB Atlas cluster. [MongoDB installation guide](https://www.mongodb.com/docs/manual/installation/).

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/SharonWane/liquor_shop.git
   cd liquor_shop

3. Install Dependencies
   Install the necessary dependencies using npm:
   ```bash
   npm install

5. Set Up MongoDB
   Ensure that you have MongoDB installed and running locally.
   ```bash
   mongosh
   use expressDB

6. By default, MongoDB listens on port 27017. The database connection string used in this project is:
   ```bash
   const uri = "mongodb://localhost:27017/expressDB";


7. Set Up Mongoose and Connect to Database
8. Run the Application


## Note: to test the Admin feature, you will need to manually change the role in mongoDB after register. for example-
```bash
db.users.updateOne({username:"Admin2"},{$set:{role:"admin"}})
  


