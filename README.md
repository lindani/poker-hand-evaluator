# 🃏 Poker Hand Evaluator

![Poker Demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWoybTRrMDRuemN2YmN1b28zYXV1YmZ1NjI2aWUzeGU3NmxqMDNzdCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/eaA6aUSqFPEjFIcMmd/giphy.gif)
*A React + Node.js application for evaluating poker hands*

## Features

- 🃏 **Real-time hand evaluation** for all standard poker hands
- ♠️♥️♦️♣️ **Interactive card dragging** with visual feedback
- 📱 **Responsive design** works on desktop and mobile
- ✅ **Input validation** prevents invalid submissions
- 📊 **Test coverage** for all hand types

## 📦 Tech Stack

- **Frontend**
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
- **Backend**
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
- **Testing**
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

## 📁 Project Structure

```bash
poker-hand-evaluator/
├── client/ # Frontend React application
│ ├── src/ # Source files
│ │ ├── components/ # Reusable UI components
│ │ └── utils/ # Helper functions
│ └── vite.config.js # Build configuration
│
├── server/ # Backend Node.js server
│ ├── controllers/ # Business logic
│ ├── utils/ # Poker hand evaluation
│ └── routes/ # API endpoints
```

## Getting Started

### Prerequisites
- Node.js v16+
- npm v8+

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/poker-hand-evaluator.git
   cd poker-hand-evaluator
   ```
2. Install dependencies:
```bash
# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```
3. Start the backend server:

```bash
cd server
npm start
```
Server runs on http://localhost:5000

4. Start the frontend:

```bash
cd client
npm run dev
```
Client runs on http://localhost:5173

## Future Development 🚀
### Core Improvements

| Priority          | Feature | Technical Approach  |  Expected Outcome               |
|--------------------|--------------------------------|-----------------------|----------------------------------------|
| 🔴 High      | Royal Flush Detection  | Add special case in `handEvaluator.js` | Distinguish from generic Straight Flush|
| 🟠 Medium      | 7-Card Evaluation   | Implement Texas Hold'em logic in new `holdemEvaluator.js` | Support 2 hole + 5 community cards|
| 🟢 Low      | Probability Calculator   | Add odds service using preflop tables | SDisplay win % against random hands|


## Contributing
- Fork the project

- Create your feature branch (`git checkout -b feature/AmazingFeature`)

- Commit your changes (`git commit -m 'Add some amazing feature'`)

- Push to the branch (`git push origin feature/AmazingFeature`)

- Open a Pull Request

## License
Distributed under the MIT License. See LICENSE for more information.