# 🎵 Song Popularity Predictor

This project is a web application built for the Machine Learning course (Lab 01). It uses a Linear Regression model to predict the popularity of a song based on its audio features.

The application is composed of three main parts:
-   **Frontend:** A React application for user interaction and data visualization.
-   **Backend:** A Node.js/Express API that serves the frontend and communicates with the ML model.
-   **ML API:** A Python/Flask microservice that serves predictions from the trained model.

## Project Setup

To run this project, you will need to set up and run the Backend, Frontend, and ML API simultaneously.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or newer)
-   [Python](https://www.python.org/) (v3.8 or newer)
-   `pip` and `venv` for Python package management

### Step 1: Clone the Repository

Clone this project to your local machine.

```bash
git clone <your-repository-url>
cd <project-folder-name>
```

### Step 2: Set Up the Backend (Node.js)

The backend server handles requests from the frontend.

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Copy the example file:
        ```bash
        cp .env.example .env
        ```
    -   *No changes are needed in the `.env` file for local development.*

### Step 3: Set Up the Frontend (React)

The frontend is the user interface for the application.

1.  **Navigate to the frontend directory:**
    ```bash
    # From the project root
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Step 4: Set Up the ML API (Python)

The ML API serves the trained machine learning model.

1.  **Navigate to the `ml-api` directory:**
    ```bash
    # From the project root
    cd ml-api
    ```

2.  **Create and activate a Python virtual environment:**
    ```bash
    # Create the environment
    python3 -m venv venv

    # Activate it (on macOS/Linux)
    source venv/bin/activate
    
    # On Windows, use:
    .\venv\Scripts\activate
    ```

3.  **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## Running the Application

To run the full application, you will need to open **three separate terminal tabs or windows** in the project's root directory.

### Terminal 1: Start the ML API (Python)

```bash
# Navigate to the ml-api folder
cd ml-api

# Activate the virtual environment (if not already active)
source venv/bin/activate

# Start the Flask server
python app.py
```
> ✅ Your ML API should now be running on **http://localhost:5000**.

With all three services running, you can now open `http://localhost:4000` in your browser to use the application.

### Terminal 2: Start the Backend (Node.js)

```bash
# Navigate to the backend folder
cd backend

# Start the development server
npm run dev
```
> ✅ Your backend should now be running on **http://localhost:3000**.

### Terminal 3: Start the Frontend (React)

```bash
# Navigate to the frontend folder
cd frontend

# Start the development server
npm run dev
```
> ✅ Your frontend should now be running and accessible at **http://localhost:4000**.