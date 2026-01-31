React Developer Intern – Assignment
This project is a single-page React application built as part of the React Developer Intern assignment.
It demonstrates core and advanced React concepts such as state management, side effects, form handling, timers, UI synchronization, and modular component design.
The application contains five independent tasks, each implemented as a clean, reusable component.
🛠️ Tech Stack
React (Vite)
Node.js: v18+
JavaScript (ES6+)
Tailwind CSS (for styling)
LocalStorage API (data persistence)
📂 Project Structure
Copy code

src/
├── components/
│   ├── Todo/
│   │   ├── TodoApp.jsx
│   │   ├── TodoItem.jsx
│   │   └── FilterControls.jsx
│   ├── Forms/
│   │   └── UserForm.jsx
│   ├── Progress/
│   │   └── MultiProgressBar.jsx
│   ├── Timer/
│   │   └── CountdownTimer.jsx
│   └── Search/
│       └── SearchList.jsx
├── hooks/
│   └── useLocalStorage.js
├── App.jsx
└── main.jsx
This structure ensures:
High modularity
Easy readability
Reusable components
🚀 How to Run the Project Locally
1️⃣ Prerequisites
Node.js v18 or above
npm or yarn
Check version:
Copy code
Bash
node -v
2️⃣ Installation Steps
Copy code
Bash
git clone <your-github-repo-link>
cd my-assignment
npm install
3️⃣ Start the Application
Copy code
Bash
npm run dev
Open in browser:
Copy code

http://localhost:5173
📌 Task Breakdown & Implementation Details
✅ Task 1 – Todo Application
Features Implemented
Add new tasks using a form
Display tasks using component mapping
Delete tasks
Mark tasks as completed
Assign priority (Low / Medium / High)
Filter tasks:
All
Active
Completed
Persist tasks using LocalStorage
Responsive UI with Tailwind CSS
Key Concepts Used
useState for task management
useEffect for saving/loading from LocalStorage
Controlled inputs
Conditional rendering
✅ Task 2 – Form Handling & Password Toggle
Form Fields
Name
Email
ID
Password
Functionality
Prevents page reload on submit
Validates:
All fields required
Email format validation
Displays validation errors inline
Toggle Show / Hide Password
Displays submitted data below the form
Clears form after successful submission
Key Concepts Used
Controlled form inputs
Regex email validation
Conditional input type switching
Error state management
✅ Task 3 – Dynamic Multi-Input Progress Bar
Features
Multiple numeric inputs (0–100)
Single main progress bar based on combined values
Sub-bars for each input
Live updates while typing
Animated progress fill
Color changes:
🔴 Below 40%
🟡 Between 40%–70%
🟢 Above 70%
Validation Rules
Values < 0 → auto set to 0
Values > 100 → auto set to 100
Key Concepts Used
Array state handling
Inline dynamic styles
Conditional Tailwind classes
UI synchronization
✅ Task 4 – Advanced Countdown Timer
Timer Configuration
Default value: 10 seconds
Accepts only positive integers
Input disabled while timer is running
Controls
Button
Behavior
Start
Starts countdown
Pause
Pauses without resetting
Resume
Continues from paused time
Reset
Stops and resets timer
Visual States
Displays remaining time with milliseconds
Shows status:
Running
Paused
Completed
Displays “Time’s up!” when finished
Start button hidden permanently after completion
Persistence
Timer state saved in LocalStorage
On refresh:
Timer resumes correctly
Remaining time restored
Status preserved
Key Concepts Used
setInterval with cleanup
Timestamp-based time calculation
Preventing multiple timers
State-driven UI control
✅ Task 5 – Live Search with Highlighting
Features
Search input (case-insensitive)
Filters predefined name list
Highlights matching text in bold
Supports multiple matches in a single word
Displays:
Matching result count
“No matches found” message when applicable
Highlight Logic
Uses Regex with split() to preserve matches
Wraps matching segments in <b> tags
Key Concepts Used
String manipulation
Regex handling
Conditional rendering
Dynamic list filtering
🧠 Assumptions & Design Decisions
Tailwind CSS chosen for faster UI development
LocalStorage used instead of backend (as per assignment scope)
Components kept independent to simplify evaluation
No external state management library used to keep logic transparent
Timer precision handled via timestamps to survive page refresh
⚠️ Limitations / Trade-offs
No backend or authentication implemented
Data stored only in browser LocalStorage
Styling focused on clarity over heavy animations
📦 Submission Checklist
✅ Public GitHub Repository
✅ Clean, readable, modular code
✅ Complete README with setup instructions
✅ All 5 tasks implemented
✅ No unnecessary libraries
✅ No copy-paste without understanding
