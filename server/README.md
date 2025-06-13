# 🃏 Poker Hand Evaluator API

This is the backend API for the Poker Hand Evaluator project. It evaluates a 5-card poker hand and returns the best possible hand type (e.g., Full House, Flush, Four of a Kind, etc).

---

## 📦 Tech Stack

- **Node.js (with npm)** + **Express** – REST API
- **Jest**
---

## ⚙️ Requirements

- Node.js (v16+ recommended)
- npm
---

## 🔧 Installation

```bash
git clone https://github.com/lindani/poker-hand-evaluator.git
cd poker-hand-evaluator/server
npm install
npm run dev
```
This runs the server using [Nodemon](https://nodemon.io/)
 on http://localhost:5000.

## 📁 Folder Structure

```bash
server/
├── controllers/
│   └── evaluateControllers.js # Handles API request/response logic
├── helpers/ # Reusable utility functions
│   └── handEvaluator.js
├── node_modules/ # 3rd-party dependencies
├── routes/ # API endpoint definitions
│   └── evaluate.js
├── tests/
│   └── handEvaluator.test.js  # Test suites
├── server.js # Server entry point
├── app.js # Express app configuration
├── package-lock.json # Exact dependency tree
├── package.json # Project metadata and scripts
└── README.md # Project documentation
```

## ✅ Running Tests
Unit tests are written using [Jest](https://jestjs.io/). To run all tests:

```bash
npm run test
```
You should see output similar to:
```bash
PASS  tests/handEvaluator.test.js
getBestHand
  ✓ returns Full House for a hand with three 3s and two 2s (X ms)
  ✓ returns Four of a Kind for a hand with four 10s and one 2s (X ms)
  ✓ ...
Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        1.619 s, estimated 2 s
Ran all test suites.
```
## 📬 API Usage
`📥 POST /api/evaluate example using Curl`

```bash
curl -X POST http://localhost:5000/api/evaluate \
  -H "Content-Type: application/json" \
  -d '{"cards": ["AS", "AD", "AC", "AH", "2S"]}'
```
Response:
`{
  "hand": "Four of a Kind"
}`

## 🧰 GUI Tools (Alternatives)
You can also test the API using tools like:
- 🔹[Postman](https://www.postman.com/)
- 🔹[Insomnia](https://insomnia.rest/)

## 🧠 Notes
The hand must contain exactly 5 cards.

- Card format: Each card is a 2-character string: <value><suit>, e.g., AS = Ace of Spades, 0D = 10 of Diamonds.
- Values: A, 2-9, 0 (for 10), J, Q, K
Suits: S (Spades), H (Hearts), D (Diamonds), C (Clubs)