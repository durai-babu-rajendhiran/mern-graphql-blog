# Blog Platform

This blog platform features user authentication and post management. It is built with a modern stack that includes Node.js, TypeScript, and GraphQL for the backend, and React.js with Material-UI on the frontend. MongoDB is used for data storage, and Apollo Client is employed for GraphQL queries.

## Project Structure

The project is divided into three main folders:

1. **backend**: Contains the Node.js server with a GraphQL API and MongoDB connection.
2. **client**: Contains the React.js frontend application with TypeScript and Material-UI.
3. **server**: Contains a demo folder for user CRUD operations.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

#### Backend

1. Navigate to the `backend` folder:

    ```bash
    cd backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

   The backend will run on `http://localhost:4000` by default. You can configure the port in the environment variables if needed.

#### Client

1. Navigate to the `client` folder:

    ```bash
    cd client
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the React application:

    ```bash
    npm start
    ```

   The frontend will run on `http://localhost:3000` by default. You can change this port in the `package.json` or `.env` file if necessary.

#### Server (Demo Folder)

1. Navigate to the `server` folder:

    ```bash
    cd server
    ```

   This folder contains demo code for user CRUD operations. Follow the instructions in the demo's README for setup and usage.

### Configuration

- **Environment Variables**: Ensure you have the necessary environment variables set up for both the `backend` and `client` applications. Create `.env` files in the respective folders if needed, based on the `.env.example` files provided.

### Usage

1. **Backend**: The backend provides GraphQL endpoints. You can use tools like [GraphiQL](https://github.com/graphql/graphiql) or [Apollo Studio](https://www.apollographql.com/studio) to interact with the GraphQL API.

2. **Client**: The frontend interacts with the backend via GraphQL queries. You can use the client to manage user authentication, create, edit, and delete blog posts.
### License

This project is licensed under the [MIT License](LICENSE).

### Contact

For any questions or feedback, please reach out to [duraibabu200@gmail.com] or open an issue on GitHub.
