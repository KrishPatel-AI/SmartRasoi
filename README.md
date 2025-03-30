# SmartRasoi

## Project Overview
AI-Powered Smart Kitchen & Waste Minimizer for Restaurants.

## Tech Stack
- **Frontend:** Next.js, TypeScript, Tailwind CSS, ShadCN UI
- **Backend:** nodejs, Express, Flask (Python), 
- **Database:** Supabase (PostgreSQL) , mongodb, 
-**AI (ML):** sk learn, pandas, Numpy, kaggle dataset,
- **AI Integration:**  Gemini 

---

## Setup Instructions

### Prerequisites
- Node.js & npm
- Python 3.10+
- PostgreSQL (via Supabase)

### Ai Setup
1. Navigate to the ai folder:
    ```bash
    cd ai
    ```
2. Install dependencies:
    ```bash
    pip install
    ```
3. Start the Port
    ```bash
    python app.py
    ```
    
### Backend Setup
1. Navigate to the backend folder:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install 
    ```
3. Start the server:
    ```bash
    node server.js 
    ```

### Frontend Setup (Next.js)
1. Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
. Run the Next.js app:
    ```bash
    npm run dev
    ```

---

## Features
- **Loss-to-Profit Visualization:** Track and display financial waste using charts.
- **AI Insights:** Get actionable recommendations for reducing food waste.
- **Operational Decision Support:** Optimize purchasing and inventory management.

---

## Environment Variables
Create a `.env` file in both frontend and backend with the following variables:

### Backend (.env)
```
# Server Configuration
PORT=8080

# MongoDB Connection (Replace with actual values)
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority&appName=<app-name>

# Flask API URL
FLASK_API_URL=http://127.0.0.1:5000

# PostgreSQL Database Connection (Replace with actual values)
DATABASE_URL="postgresql://<db-username>:<db-password>@<db-host>:5432/<db-name>?sslmode=require"

```

### Frontend (.env)
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## Contribution Guidelines
- Fork the repository and create your branch.
- Commit your changes with meaningful messages.
- Submit a pull request.

---


## Contact
For queries, reach out to the project maintainers via email or GitHub.

