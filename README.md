# SmartRasoi

## Project Overview
AI-Powered Smart Kitchen & Waste Minimizer for Restaurants.

## Tech Stack
- **Frontend:** Next.js, TypeScript, Tailwind CSS, ShadCN UI
- **Backend:** FastAPI (Python)
- **Database:** Supabase (PostgreSQL)
- **AI Integration:** OpenAI / Hugging Face / Gemini (Optional)
- **ORM:** Prisma

---

## Folder Structure
Here is the project structure for easy navigation:

```
SmartRasoi
├── backend
│   ├── fastapi_backend
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── routes.py
│   │   ├── services.py
│   │   ├── utils.py
│   │   └── .env
│   ├── prisma_client.py
│   └── requirements.txt
├── frontend
│   ├── app
│   │   ├── dashboard
│   │   │   ├── loss-to-profit
│   │   │   │   ├── page.tsx
│   │   │   │   └── components
│   │   │   │       └── Chart.tsx
│   │   └── layout.tsx
│   ├── prisma
│   │   ├── schema.prisma
│   ├── public
│   ├── components
│   ├── styles
│   ├── utils
│   ├── .env
│   ├── next.config.js
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

---

## Setup Instructions

### Prerequisites
- Node.js & npm
- Python 3.10+
- PostgreSQL (via Supabase)
- Prisma CLI

### Backend Setup (FastAPI)
1. Navigate to the backend folder:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3. Start the FastAPI server:
    ```bash
    uvicorn fastapi_backend.main:app --reload
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
3. Generate Prisma client:
    ```bash
    npx prisma generate
    ```
4. Run the Next.js app:
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
DATABASE_URL=postgresql://<username>:<password>@<host>:5432/<database>
OPENAI_API_KEY=your_openai_api_key
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

## License
This project is licensed under the MIT License.

---

## Contact
For queries, reach out to the project maintainers via email or GitHub.

