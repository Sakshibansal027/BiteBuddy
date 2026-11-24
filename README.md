# BiteBuddy 🍔

A full-stack food delivery web app (Zomato/Swiggy-style) built with the MERN stack. Customers browse shops and items in their city, add food to a cart and place orders; shop owners manage their own shop and menu.

> **Status:** work in progress. See [Roadmap](#roadmap) for what is done and what is next.

## Features

**Done**
- Sign up / sign in with email + password (JWT in an httpOnly cookie)
- Google sign in (Firebase Auth)
- Forgot password with a 4-digit OTP sent by email (Nodemailer)
- Three roles: `user`, `owner`, `deliveryboy`
- **Owner:** create / edit a shop, add / edit / delete menu items with image upload (Cloudinary)
- **User:** auto-detects city (geolocation + Geoapify), browse shops and food items of that city, category filter
- Cart with quantity controls and total (Redux)
- Checkout with delivery address on a map (Leaflet) with address search, Cash on Delivery
- Orders are split per shop on the server, and prices are read from the database, not from the client

**In progress / planned** – see [Roadmap](#roadmap)

## Tech stack

| Area | Tools |
|---|---|
| Frontend | React 19, Vite, React Router, Redux Toolkit, Tailwind CSS v4, Axios |
| Maps / location | Leaflet + react-leaflet, Geoapify (reverse geocoding & address search) |
| Auth | JWT, bcryptjs, cookie-parser, Firebase Authentication (Google) |
| Backend | Node.js, Express 5 |
| Database | MongoDB + Mongoose |
| File upload | Multer + Cloudinary |
| Email | Nodemailer (Gmail SMTP) |

## Project structure

```
BiteBuddy/
├── Backend/
│   ├── index.js           # server entry, middlewares, route mounting
│   ├── config/            # MongoDB connection
│   ├── models/            # user, shop, item, order schemas
│   ├── controllers/       # auth, user, shop, items, order logic
│   ├── routes/            # URL -> controller mapping
│   ├── middlewares/       # isAuth (JWT), multer (uploads)
│   └── utils/             # token, mail, cloudinary helpers
└── Frontend/
    ├── firebase.js        # Firebase (Google login) setup
    ├── config.js          # backend URL
    └── src/
        ├── pages/         # SignIn, SignUp, Home, CreateEditShop, AddItem,
        │                  # EditItem, CartPage, Checkout, OrderPlaced, MyOrders ...
        ├── components/    # Nav, dashboards, cards
        ├── hooks/         # data-fetching hooks
        └── redux/         # store and slices (user, owner, map)
```

## Getting started

### Prerequisites
- Node.js 18+
- A MongoDB database (MongoDB Atlas free tier works)
- Accounts / keys for: Cloudinary, Gmail app password, Firebase project, Geoapify

### 1. Clone

```bash
git clone https://github.com/Sakshibansal027/BiteBuddy.git
cd BiteBuddy
```

### 2. Backend

```bash
cd Backend
npm install
cp .env.example .env     # then fill in your own values
npm run dev              # runs on http://localhost:3000
```

### 3. Frontend

```bash
cd Frontend
npm install
cp .env.example .env     # then fill in your own values
npm run dev              # runs on http://localhost:5173
```

The frontend talks to the backend at `http://localhost:3000` (see `Frontend/config.js`), and the backend allows CORS from `http://localhost:5173`.

## Environment variables

Real `.env` files are git-ignored. Copy the `.env.example` files and fill in your own values.

**Backend/.env**

| Variable | Purpose |
|---|---|
| `MONGODB_URL` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign login tokens |
| `EMAIL` | Gmail address used to send OTP mails |
| `PASS` | Gmail **app password** for that address |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Image uploads |

**Frontend/.env**

| Variable | Purpose |
|---|---|
| `VITE_API_KEY` | Firebase web API key (Google sign in) |
| `VITE_GEOAPIKEY` | Geoapify API key (city detection, address search) |

## API overview

All routes are prefixed with `/api`.

| Prefix | What it does |
|---|---|
| `/auth` | sign up, sign in, sign out, send / verify OTP, reset password, Google auth |
| `/user` | current logged-in user |
| `/shop` | create / edit my shop, get my shop, shops by city |
| `/item` | add, edit, delete items, items by city |
| `/order` | place order, my orders |

Protected routes use the `token` cookie (set on login) and the `isAuth` middleware.

## Roadmap

- [x] Authentication (email/password, Google, OTP reset)
- [x] Owner shop and menu management
- [x] City-based browsing, cart, checkout with map
- [x] Place order and list my orders (API)
- [ ] My Orders UI cards for users and owners
- [ ] Owner can update order status (confirmed → preparing → out for delivery → delivered)
- [ ] Clear cart after a successful order
- [ ] Delivery boy module (assignment, accept / reject, tracking)
- [ ] Online payments
- [ ] Ratings and reviews
- [ ] Real-time order updates
- [ ] Deployment

## Author

**Sakshi** – B.Tech IT student and full-stack developer.
