# Shopigram

Shopigram is an Instagram-like, full-stack web application using the MERN (MongoDB, Express.js, React, Node.js) stack. The app uses Cloudinary to upload, store, and retrieve images. It's deployed on Heroku and hooked up to a DevOps pipeline for CI/CD purposes.

<img src="https://res.cloudinary.com/shopigram/image/upload/v1610252149/Screenshot_hnsmwe.png" title="Home Page">

Link here for production build: https://shopigram-mern.herokuapp.com/

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

npm required, nodemon highly recommended
* npm
  ```sh
  npm install npm@latest -g
  ```
* nodemon
  ```sh
  npm install -g nodemon
  ```

### Local Installation

1. Clone the repo
   ```sh
   git clone https://github.com/jackywzheng/MERN-stack-image-repo.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Change Directory to server, and start nodemon (initialize backend)
   ```sh
   cd server
   nodemon app
   ```
5. Change Directory to client, and start npm (initialize frontend)
   ```sh
   cd server/client
   npm start
   ```
6. Go to localhost:3000 on your browser
