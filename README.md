# Inventory Order Management System

A full-stack web application for managing inventory and customer orders efficiently. This system provides a comprehensive solution for tracking products, managing customers, and handling orders with a modern, responsive user interface.

## 🎯 Features

- **Product Management**: Create, update, delete, and view inventory items
- **Customer Management**: Maintain customer information and details
- **Order Management**: Create and manage customer orders with order items
- **Dashboard**: View real-time inventory and order statistics
- **Responsive UI**: Modern, mobile-friendly interface built with React
- **RESTful API**: Complete backend API for all operations
- **Database**: PostgreSQL for reliable data storage

## 🛠 Tech Stack

### Frontend (63.8%)
- **React 19** - UI library
- **Vite** - Modern build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

### Backend (35%)
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **Uvicorn** - ASGI web server
- **Pydantic** - Data validation using Python type annotations
- **PostgreSQL** - Relational database

### DevOps
- **Docker & Docker Compose** - Containerization and orchestration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Docker (v20.10 or higher)
- Docker Compose (v2.0 or higher)
- OR
- Python 3.11+
- Node.js 16+
- PostgreSQL 15+

## 🚀 Getting Started

### Quick Start with Docker Compose

The easiest way to run the application is using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/pratyushkr23/inventory-order-management.git
cd inventory-order-management

# Start all services
docker-compose up --build
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Database**: localhost:5433

### Manual Setup (Without Docker)

#### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with database credentials
cat > .env << EOF
DATABASE_URL=postgresql://postgres:Diptidb@localhost:5433/inventory_management
EOF

# Run the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

#### Database Setup

```bash
# Create PostgreSQL database
createdb -U postgres -p 5433 inventory_management

# Set password if needed
psql -U postgres -p 5433 -c "ALTER USER postgres WITH PASSWORD 'Diptidb';"
```

## 📁 Project Structure

```
inventory-order-management/
├── backend/
│   ├── app/
│   │   ├── api/              # API route handlers
│   │   │   ├── product.py
│   │   │   ├── customer.py
│   │   │   ├── order.py
│   │   │   └── dashboard.py
│   │   ├── models/           # SQLAlchemy ORM models
│   │   │   ├── product.py
│   │   │   ├── customer.py
│   │   │   ├── order.py
│   │   │   └── order_item.py
│   │   └── database/         # Database configuration
│   │       └── database.py
│   ├── main.py               # FastAPI application entry point
│   ├── requirements.txt       # Python dependencies
│   ├── Dockerfile            # Backend Docker image
│   └── .env                  # Environment variables (not in repo)
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── App.jsx           # Main App component
│   │   └── main.jsx          # React entry point
│   ├── package.json          # Node dependencies
│   ├── vite.config.js        # Vite configuration
│   └── Dockerfile            # Frontend Docker image
├── docker-compose.yml        # Docker Compose configuration
└── README.md                 # This file
```

## 🔌 API Endpoints

### Products
- `GET /products` - List all products
- `POST /products` - Create a new product
- `GET /products/{id}` - Get product details
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product

### Customers
- `GET /customers` - List all customers
- `POST /customers` - Create a new customer
- `GET /customers/{id}` - Get customer details
- `PUT /customers/{id}` - Update customer
- `DELETE /customers/{id}` - Delete customer

### Orders
- `GET /orders` - List all orders
- `POST /orders` - Create a new order
- `GET /orders/{id}` - Get order details
- `PUT /orders/{id}` - Update order
- `DELETE /orders/{id}` - Delete order

### Dashboard
- `GET /dashboard` - Get dashboard statistics

For interactive API documentation, visit http://localhost:8000/docs when the backend is running.

## 🗄 Database Schema

### Products
- `id` (Integer, Primary Key)
- `name` (String)
- `description` (String)
- `price` (Float)
- `quantity` (Integer)
- `created_at` (DateTime)

### Customers
- `id` (Integer, Primary Key)
- `name` (String)
- `email` (String)
- `phone` (String)
- `address` (String)
- `created_at` (DateTime)

### Orders
- `id` (Integer, Primary Key)
- `customer_id` (Foreign Key)
- `order_date` (DateTime)
- `total_amount` (Float)
- `status` (String)

### OrderItems
- `id` (Integer, Primary Key)
- `order_id` (Foreign Key)
- `product_id` (Foreign Key)
- `quantity` (Integer)
- `price` (Float)

## 🐳 Docker Compose Services

### Database Service (db)
- **Image**: postgres:15
- **Port**: 5433 → 5432
- **Database**: inventory_management
- **User**: postgres
- **Password**: Diptidb
- **Volume**: postgres_data

### Backend Service
- **Build**: ./backend
- **Port**: 8000 → 8000
- **Depends On**: db
- **Environment**: Loaded from ./backend/.env

### Frontend Service
- **Build**: ./frontend
- **Port**: 5173 → 5173
- **Depends On**: backend

## 📝 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL=postgresql://postgres:Diptidb@localhost:5433/inventory_management
DEBUG=True
```

## 🔍 Available Scripts

### Backend
```bash
# Run development server with auto-reload
uvicorn main:app --reload

# Run with specific host and port
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 📦 Dependencies

### Backend (Python)
- fastapi==0.136.3
- uvicorn==0.49.0
- SQLAlchemy==2.0.50
- psycopg2-binary==2.9.12
- python-dotenv==1.2.2
- pydantic==2.13.4
- email-validator==2.3.0

### Frontend (Node.js)
See [frontend/package.json](frontend/package.json) for complete list.

## 🐛 Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running on port 5433
- Verify credentials in `.env` file
- Check if `inventory_management` database exists

### Port Already in Use
- Change port mappings in `docker-compose.yml`
- Kill process using the port:
  ```bash
  # Linux/macOS
  lsof -i :5173
  kill -9 <PID>
  
  # Windows
  netstat -ano | findstr :5173
  taskkill /PID <PID> /F
  ```

### Frontend not connecting to Backend
- Ensure backend is running on port 8000
- Check CORS configuration in `backend/main.py`
- Verify API base URL in frontend axios configuration

## 🚦 Development Workflow

1. **Backend Development**:
   - Frontend changes auto-reload via Vite HMR
   - Backend changes auto-reload via uvicorn --reload
   - Use `/docs` endpoint for API testing

2. **Database Changes**:
   - Models are auto-created via `Base.metadata.create_all()`
   - For migrations, consider adding Alembic

3. **Frontend Development**:
   - Use React DevTools browser extension
   - Check browser console for errors
   - Use network tab to debug API calls

## 📚 Learning Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

[pratyushkr23](https://github.com/pratyushkr23)

## 📞 Support

For issues and questions, please open an issue on GitHub: [Issues](https://github.com/pratyushkr23/inventory-order-management/issues)

---

**Happy coding!** 🚀