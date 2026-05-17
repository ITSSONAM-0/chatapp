# Chat App

A full-stack real-time chat application built using React and Socket.io. This project allows users to create an account, see who is online, and send text messages and images in real-time.

## Features
- **Real-time messaging:** Users can chat instantly without refreshing the page, powered by Socket.io.
- **Authentication:** JWT-based login and signup system. The token is saved in local storage to keep users logged in.
- **Online status:** See which users are currently active with a live green dot indicator.
- **Image sharing:** Send images in chat. The app converts images to base64 on the frontend before sending them to the backend.
- **Responsive UI:** Built with Tailwind CSS, so it works well on both mobile and desktop screens.
- **State Management:** Used React Context API to manage the chat and auth state globally instead of adding Redux, keeping the app lightweight.

## Tech Stack
- **Frontend:** React 19, Vite, Tailwind CSS, React Router
- **Real-time:** Socket.io-client
- **API Calls:** Axios

## How to run locally

1. Clone the repository
```bash
git clone <your-repo-url>
cd chatapp-main
```

2. Install the packages
```bash
npm install
```

3. Setup environment variables
Create a `.env` file in the root folder and add your backend URL.
```env
VITE_BACKEND_URL=http://localhost:5000
```

4. Start the app
```bash
npm run dev
```

## How it works under the hood
- **Auth:** `AuthContext` checks if a valid token exists when the app loads. If it does, the user is logged in automatically and the socket connection is started.
- **Chat:** `ChatContext` listens for the `newMessage` socket event. If the new message belongs to the currently open chat, it adds it to the screen and scrolls to the bottom automatically using `useRef`. Otherwise, it updates the unseen message counter for that user.
