# UrbanCart - Premium E-Commerce Platform

UrbanCart is a modern, full-featured MERN e-commerce platform built with Next.js, React, MongoDB, and Express.js. It provides a seamless shopping experience with role-based access control, comprehensive product management, and complete order processing.

## Features

### Customer Features
- Browse and search products with advanced filtering
- Product details with ratings and reviews
- Shopping cart with persistent storage
- Checkout with multiple payment options
- Order tracking and history
- User profile management
- Wishlist functionality
- Promo code support

### Admin Features
- Comprehensive dashboard with analytics
- Product management (CRUD operations)
- Order management and tracking
- User management
- Revenue and sales metrics

### Vendor Features
- Vendor dashboard with sales metrics
- Product listing and management
- Order tracking for vendor products
- Revenue analytics

### Platform Features
- Role-based access control (RBAC)
- Secure authentication with JWT + Cookies
- Responsive mobile-first design
- Premium dark/light theme support
- Real-time cart updates
- Multiple promo codes (SAVE20, FLAT50, SUMMER30)
- Product filtering and search
- Order confirmation and tracking

## Tech Stack

**Frontend:**
- Next.js 16 (React 19)
- TypeScript
- Tailwind CSS v4
- Lucide Icons
- Client-side state management with localStorage

**Backend:**
- Node.js + Express.js (via Next.js API Routes)
- MongoDB for data storage
- JWT for authentication
- Bcrypt for password hashing

**Deployment:**
- Vercel (recommended)
- MongoDB Atlas (cloud database)

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB connection (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd urbancart
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create `.env.local` file:
\`\`\`env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/urbancart
JWT_SECRET=your-secret-key-here
\`\`\`

4. Run development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Accounts

### Customer
- Email: `customer@example.com`
- Password: `customer123`

### Vendor
- Email: `vendor@example.com`
- Password: `vendor123`

### Admin
- Email: `admin@example.com`
- Password: `admin123`

## Promo Codes

- **SAVE20**: 20% off entire purchase
- **FLAT50**: $50 off orders over $200
- **SUMMER30**: 30% off selected items

## API Endpoints

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin/vendor)
- `PUT /api/products/:id` - Update product (admin/vendor)
- `DELETE /api/products/:id` - Delete product (admin)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details

## Project Structure

\`\`\`
urbancart/
├── app/
│   ├── api/              # API routes
│   ├── admin/            # Admin dashboard
│   ├── vendor/           # Vendor dashboard
│   ├── products/         # Product pages
│   ├── cart/             # Shopping cart
│   ├── checkout/         # Checkout page
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   └── layout.tsx        # Root layout
├── components/
│   ├── navbar.tsx        # Navigation bar
│   ├── product-card.tsx  # Product card component
│   └── ui/               # UI components
├── lib/
│   ├── db.ts             # Database connection
│   ├── auth.ts           # Authentication utilities
│   └── seed-data.ts      # Sample data
├── public/               # Static assets
└── globals.css           # Global styles
\`\`\`

## Features Breakdown

### Authentication & Authorization
- JWT-based authentication
- Cookie-based session management
- Role-based access control (RBAC)
- Protected routes and API endpoints

### Product Management
- Advanced product search and filtering
- Category-based browsing
- Price range filtering
- Product ratings and reviews
- Stock management
- Multiple product images

### Shopping Cart
- Persistent cart storage
- Real-time cart updates
- Quantity management
- Cart summary with totals

### Checkout & Orders
- Multi-step checkout process
- Shipping address collection
- Payment information handling
- Order confirmation
- Order tracking
- Email notifications

### Admin Dashboard
- Sales analytics
- User management
- Product management
- Order management
- Revenue tracking

### Vendor Dashboard
- Sales metrics
- Product management
- Order tracking
- Revenue analytics

## Responsive Design

- Mobile-first approach
- Fully responsive on all screen sizes
- Touch-friendly interfaces
- Optimized for performance

## Security Features

- Password hashing with bcrypt
- JWT token validation
- CORS protection
- Input validation
- SQL injection prevention (MongoDB)
- Secure cookie storage

## Performance Optimizations

- Server-side rendering with Next.js
- Image optimization
- Code splitting
- Lazy loading
- Efficient database queries

## Future Enhancements

- Payment gateway integration (Stripe)
- Email notifications
- Advanced analytics
- Inventory management
- Supplier management
- Product recommendations
- Social media integration
- Mobile app version
- Two-factor authentication
- Multi-language support

## Troubleshooting

### Database Connection Issues
- Verify MongoDB URI in `.env.local`
- Check MongoDB Atlas IP whitelist
- Ensure database credentials are correct

### Authentication Issues
- Clear browser cache and localStorage
- Check JWT_SECRET environment variable
- Verify cookie settings in browser

### Product Not Loading
- Check MongoDB collections exist
- Verify product data structure
- Check browser console for errors

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Create an issue in the repository
- Contact: support@urbancart.example.com

## Deployed URL

Visit UrbanCart at: [deployment-url]

---

Made with ❤️ by UrbanCart Team
\`\`\`

```typescript file="" isHidden
