# 💬 TextUp

**TextUp** is a real-time room-based chat application built with **React**, **TypeScript**, and **WebSockets (`ws`)**. It enables users to instantly create or join chat rooms, exchange messages in real time, view online participants, and automatically reconnect after temporary connection interruptions—all wrapped in a bold **Brutalist UI**.

## 🌐 Live Demo

🔗 [ TextUp ](https://text-up.vercel.app/)


## 🚀 Features

* 💬 Real-time messaging using WebSockets
* 🚪 Create or join chat rooms with a unique Room ID
* 👥 Live online users list
* ⚡ Instant message delivery with low latency
* 🔄 Automatic reconnection support
* ♻️ Refresh-safe room joining
* 🆔 Unique sender ID for each user
* 🚪 Leave Room button that closes the user's WebSocket connection and redirects them to the Home page
* 🗑️ Rooms are automatically deleted when all users leave
* 🎨 Responsive Brutalist UI

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router DOM

### Backend

* Node.js
* TypeScript
* WebSockets (`ws`)
* NanoID

## 📂 Project Structure

```text
TextUp/
├── frontend/
│   ├── src/
│   │   ├── Pages/
│   │   │   ├── Home.tsx
│   │   │   └── Room.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   └── index.ts
│   └── package.json
│
└── README.md
```

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/aru-shi2/TextUp.git
cd TextUp
```

### Install and run the backend

```bash
cd backend
npm install
npm run dev
```

### Install and run the frontend

```bash
cd frontend
npm install
npm run dev
```

## 🌐 Environment

Configure the WebSocket URL according to your environment.

### Local

```text
ws://localhost:8080
```

### Production

```text
wss://your-backend-url
```

## 📖 How It Works

1. The application establishes a WebSocket connection.
2. Users create a new room or join an existing one using a unique Room ID.
3. Once connected, the user is automatically added to the selected room.
4. Messages are delivered in real time to everyone in the same room.
5. The online users list updates instantly whenever someone joins or leaves.
6. If the connection is interrupted, the client automatically reconnects and rejoins the room.
7. Clicking **Leave Room** closes the user's WebSocket connection and redirects them back to the Home page.
8. When the last participant leaves a room, it is automatically removed from the server.
