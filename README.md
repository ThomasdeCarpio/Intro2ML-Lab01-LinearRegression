# 🎵 Song Rating Predictor - Backend

This repository contains the backend service for the Song Rating Predictor project for our Machine Learning course. This service is built with Node.js and Express.js.

Its primary roles are:
1.  To provide a REST API for the frontend application.
2.  To communicate with the Python-based Machine Learning API to get predictions.
3.  To query the Supabase database for song information, visualizations, and other data.

## 🏛️ Architecture

This project follows a microservice architecture to separate the web application logic from the machine learning model.

<<<<<<< Updated upstream
-   **Node.js/Express Backend (This Repo):** The main user-facing API. It handles all client requests, orchestrates calls to other services, and interacts with the database.
-   **Python/Flask ML API (Separate Repo):** A lightweight, internal-facing API whose sole purpose is to serve predictions from the trained Linear Regression model.
=======
```
+----------------+      +---------------------+      +----------------------+
|                |      |                     |      |                      |
|  React         |----->|  Node.js / Express  |----->|  Python / Flask      |
|  Frontend App  |      |  Backend API        |      |  ML Microservice     |
|                |<-----|                     |<-----|                      |
|                |      |                     |      |                      |
+----------------+      +----------+----------+      +----------------------+
                                   |
                                   |
                         +---------v---------+
                         |                   |
                         |  Supabase         |
                         |  Database         |
                         |                   |
                         +-------------------+
```
>>>>>>> Stashed changes

**Communication Flow:**
`Frontend` ↔️ `Node.js API` ↔️ `Python ML API`

## 🛠️ Getting Started

Follow these steps to get the backend server running locally on your machine.

### 1. Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or newer recommended)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)
-   Access to the project's [Supabase](https://supabase.com/) instance.

### 2. Clone the Repository

```bash
git clone <your-repository-url>
cd song-rating-backend
```

### 3. Install Dependencies

Install all the necessary Node.js packages.

```bash
npm install
```

### 4. Set Up Environment Variables

This project requires a `.env` file to store secret keys and configuration variables.

1.  Create a copy of the example environment file:
    ```bash
    cp .env.example .env
    ```
2.  Open the newly created `.env` file in your code editor.
3.  Fill in the required values, especially your Supabase URL and key.

    ```
    # .env
    
    # Server Configuration
    PORT=3000
    
    # Supabase Credentials
    SUPABASE_URL=YOUR_SUPABASE_URL
    SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    
    # Machine Learning API URL
    ML_API_URL=http://127.0.0.1:5000
    ```
    > **Note:** The `ML_API_URL` should point to the local address of the Python ML service, which typically runs on port `5000` by default.

### 5. Run the Server

Start the development server. It uses `nodemon` to automatically restart when you save changes to a file.

```bash
npm run dev
```

You should see a confirmation message in your terminal:
`🚀 Server is running on http://localhost:3000`

The backend is now running and ready to accept requests!
