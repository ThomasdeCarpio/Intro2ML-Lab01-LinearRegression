# 🎵 Song Popularity Predictor

This is the main repository for the **Lab 01: Linear Regression Project** for the Machine Learning course. The project consists of a full-stack application that predicts song popularity based on its audio features.

-   **Frontend:** A modern React application for user interaction, data input, and visualization.
-   **Backend:** A Node.js/Express API that orchestrates services, connects to the database, and communicates with the ML model.
-   **Machine Learning Model:** A Python-based microservice that serves predictions from a trained Linear Regression model.

## 🏛️ High-Level Architecture

The project follows a microservice architecture, separating the web application from the machine learning model for performance, scalability, and maintainability.

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

## 💻 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, TailwindCSS, Recharts, Axios |
| **Backend** | Node.js, Express.js, Supabase Client, Axios |
| **Machine Learning** | Python, Flask/FastAPI, Scikit-learn, Pandas |
| **Database** | PostgreSQL (via Supabase) |

## 📂 Project Structure

.
├── 📁 backend/         # Node.js/Express backend source code
├── 📁 frontend/        # React frontend source code
└── 📄 README.md        # This file```

## 🚀 Getting Started: Running the Full Stack

To run the complete application, you will need **three separate terminal windows**: one for the backend, one for the frontend, and one for the Python ML API.

### 1. Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or newer)
-   [Python](https://www.python.org/) (v3.8 or newer)
-   A [Supabase](https://supabase.com/) project with the `songs` and `predictions` tables created.

### 2. Initial Setup (Do this once)

1.  **Clone the Repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Set Up Backend Environment:**
    -   Navigate to the backend folder: `cd backend`
    -   Create your own `.env` file from the example: `cp .env.example .env`
    -   Edit the `.env` file and add your Supabase credentials.

3.  **Set Up Frontend Environment:**
    -   Navigate to the frontend folder: `cd frontend`
    -   The frontend does not require a `.env` file as it will make requests to the backend server.

### 3. Running the Application

Open three terminal windows in your project's root directory.

#### **Terminal 1: Start the Backend (Node.js)**

```bash
# Navigate to the backend folder
cd backend

# Install dependencies (only needed the first time)
npm install

# Start the development server
npm run dev
```
> ✅ Your backend should now be running on **http://localhost:3000**.

#### **Terminal 2: Start the Frontend (React)**

```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies (only needed the first time)
npm install

# Start the development server
npm run dev
```
> ✅ Your frontend should now be running and accessible at **http://localhost:4000**.

#### **Terminal 3: Start the Machine Learning API (Python)**

*(These are placeholder instructions for your teammates)*

```bash
# Navigate to the ML model's folder (e.g., cd ml-model)
cd <ml-model-folder>

# Install Python dependencies (only needed the first time)
pip install -r requirements.txt

# Start the Flask/FastAPI server
python app.py
```
> ✅ Your ML API should now be running on **http://localhost:5000**.

With all three services running, you can now use the application as intended.

## API Endpoints Overview

The Node.js backend exposes the following main endpoints:

-   `POST /api/predictions`: Submits song features to get a popularity prediction.
-   `GET /api/statistics/trends`: Retrieves aggregated data from the `songs` table for visualizations.
-   `GET /api/statistics/model-stats`: Retrieves performance metrics of the trained model.
-   `GET /api/statistics/history`: Retrieves a log of recent predictions.