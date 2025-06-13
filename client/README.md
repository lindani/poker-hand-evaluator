# 🃏 Poker Hand Evaluator

This is the frontend for the Poker Hand Evaluator project. It evaluates a 5-card poker hand and returns the best possible hand type (e.g., Full House, Flush, Four of a Kind, etc).

---

## 📦 Tech Stack

- **React (with Vite)** + **TailwindCSS**
---

## ⚙️ Requirements

- Node.js (v16+ recommended)
- npm
---

## 🔧 Installation

```bash
git clone https://github.com/lindani/poker-hand-evaluator.git
cd poker-hand-evaluator/client
npm install
npm run dev
```
This runs the development server using [Vite](https://vite.dev/guide/)
 on  http://localhost:5173/.

## 📁 Folder Structure

```bash
client/
├── node_modules/ # 3rd-party dependencies
├── src/
│   └── components/ # Reusable UI components
│       └── Button/
│           └── ActionButton.js
│       └── Card/
│           └── Card.js
│           └── CardDeck.js
│       └── DropZone.js
│       └── Modal.js
│   └── styles/ # Styling solutions
│       └── CardStyles.js
│   └── utils/ # Helper functions
│       └── cardUtils.js
│   └── App.css # Main styles
│   └── App.jsx # Root component
│   └── main.jsx # Application entry point
├── .gitignore # Ignore node_modules, build files, etc.
├── eslint.config.js # Linting rules
├── package-lock.json # Exact dependency tree
├── package.json # Project metadata and scripts
└── README.md # Project documentation
└── vite.config.js # Build tool config
```

## ✅ Running Tests

### Step-by-Step Testing Process

#### 1. Launch the Application

`npm run dev`
- Starts development server (typically at http://localhost:5173)



#### 2. View the Card Deck

- See all 52 cards displayed in a scrollable grid

- Each card should show its correct image (e.g., "AS" = Ace of Spades)

#### 3. Build Your Hand

- Method 1: Drag & Drop

- Click and hold any card

- Drag it to the "Drop Your Cards Here" zone

- Release to add to your hand

#### 4. Hand Management

- Maximum 5 cards allowed

- To remove a card: Hover over a card in your hand Click the red "×" button that appears

- To clear all cards: Click the "Clear Hand" button

#### 5. Test Different Hand Types

| Hand Type          | Example Cards (Use These)      | Expected Result       | Visual Verification Tips               |
|--------------------|--------------------------------|-----------------------|----------------------------------------|
| **High Card**      | `AS`, `KD`, `QH`, `JC`, `9D`   | "High Card"           | No matching suits or consecutive ranks |
| **One Pair**       | `AS`, `AC`, `KH`, `QD`, `JS`   | "One Pair"            | Exactly 2 cards of same rank           |
| **Two Pair**       | `AS`, `AC`, `KH`, `KD`, `QS`   | "Two Pair"            | Two distinct pairs visible             |
| **Three of a Kind**| `AS`, `AC`, `AD`, `KH`, `QS`   | "Three of a Kind"     | Three matching cards grouped           |
| **Straight**       | `5S`, `6D`, `7H`, `8C`, `9S`   | "Straight"            | 5 consecutive ranks (note: `A` can be low/high) |
| **Flush**          | `2H`, `5H`, `8H`, `JH`, `AH`   | "Flush"               | All cards same suit, non-consecutive   |
| **Full House**     | `AS`, `AC`, `AD`, `KH`, `KS`   | "Full House"          | 3 of one rank + 2 of another           |
| **Four of a Kind** | `AS`, `AC`, `AD`, `AH`, `KS`   | "Four of a Kind"      | Four matching cards + 1 kicker         |
| **Straight Flush** | `5H`, `6H`, `7H`, `8H`, `9H`   | "Straight Flush"      | Consecutive ranks + same suit          |
| **Royal Flush**    | `10H`, `JH`, `QH`, `KH`, `AH`  | "Straight Flush"*     | 10-J-Q-K-A of same suit               |

> *Note: The system currently identifies Royal Flush as "Straight Flush". Consider adding special detection for this edge case.

#### 6. Submit for Evaluation
- Click "Submit Hand" button
- Modal appears with evaluation result
- Correct hand ranking displays (e.g., "Best Hand: Flush")

