# Stack Visualizer: Bracket Validator

A **React-based interactive visualization tool** that demonstrates how the **stack data structure** is used to validate balanced brackets/parentheses in programming. This educational tool provides step-by-step execution with visual feedback, making it perfect for learning data structures and algorithms.


## 🎯 Features

- **Interactive Step-by-Step Execution**: Watch the algorithm work in real-time
- **Visual Stack Representation**: See how brackets are pushed and popped from the stack
- **Color-Coded Brackets**: Different colors for parentheses `()`, curly braces `{}`, and square brackets `[]`
- **Real-Time Validation Messages**: Clear feedback on each step of the validation process
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Educational Focus**: Perfect for learning stack-based algorithms


## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/bracket-validator.git
   cd bracket-validator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application

### Building for Production
```bash
npm run build
# or
yarn build
```

## 🎮 How to Use

1. **Enter a bracket expression** in the input field (e.g., `{[()]}`, `((()))`, `[{()}]`)
2. **Click "Next Step"** to execute the algorithm step by step
3. **Watch the stack** as brackets are pushed and popped
4. **Read the messages** to understand what's happening at each step
5. **See the final result** - whether the expression is valid or invalid
6. **Click "Reset"** to try a new expression

### Example Test Cases

| Expression | Result | Description |
|------------|--------|-------------|
| `()` | ✅ Valid | Simple parentheses |
| `{[()]}` | ✅ Valid | Nested brackets |
| `((()))` | ✅ Valid | Multiple nested parentheses |
| `({[]})` | ✅ Valid | Mixed brackets properly nested |
| `([)]` | ❌ Invalid | Incorrectly nested |
| `((()` | ❌ Invalid | Unmatched opening brackets |
| `()))` | ❌ Invalid | Extra closing brackets |

## 🧠 Algorithm Explanation

The **Balanced Brackets** problem uses a **stack data structure** with the following algorithm:

1. **Initialize** an empty stack
2. **Iterate** through each character in the string:
   - If it's an **opening bracket** `(`, `{`, or `[`: **push** it onto the stack
   - If it's a **closing bracket** `)`, `}`, or `]`:
     - If the stack is **empty**: the expression is **invalid**
     - If the **top of the stack matches** the closing bracket: **pop** from the stack
     - If they **don't match**: the expression is **invalid**
3. **After processing all characters**:
   - If the stack is **empty**: the expression is **valid**
   - If the stack is **not empty**: the expression is **invalid**

### Time & Space Complexity
- **Time Complexity**: O(n) where n is the length of the input string
- **Space Complexity**: O(n) in the worst case (all opening brackets)

## 📚 Related Problems

### LeetCode Problems

| Problem | Difficulty | Link | Description |
|---------|------------|------|-------------|
| **20. Valid Parentheses** | Easy | [LeetCode](https://leetcode.com/problems/valid-parentheses/) | The core problem this visualizer demonstrates |
| **22. Generate Parentheses** | Medium | [LeetCode](https://leetcode.com/problems/generate-parentheses/) | Generate all valid combinations of parentheses |
| **32. Longest Valid Parentheses** | Hard | [LeetCode](https://leetcode.com/problems/longest-valid-parentheses/) | Find the longest valid parentheses substring |
| **301. Remove Invalid Parentheses** | Hard | [LeetCode](https://leetcode.com/problems/remove-invalid-parentheses/) | Remove minimum parentheses to make valid |
| **678. Valid Parenthesis String** | Medium | [LeetCode](https://leetcode.com/problems/valid-parenthesis-string/) | Valid parentheses with wildcards |
| **921. Minimum Add to Make Parentheses Valid** | Medium | [LeetCode](https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/) | Minimum additions for valid parentheses |
| **1021. Remove Outermost Parentheses** | Easy | [LeetCode](https://leetcode.com/problems/remove-outermost-parentheses/) | Remove outer parentheses from primitives |

### GeeksforGeeks Problems

| Problem | Difficulty | Link | Description |
|---------|------------|------|-------------|
| **Check for Balanced Brackets** | Easy | [GFG](https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/) | Core balanced brackets problem |
| **Length of Longest Balanced Subsequence** | Medium | [GFG](https://www.geeksforgeeks.org/length-of-the-longest-valid-parentheses-subsequence/) | Find longest balanced subsequence |
| **Find Maximum Length of Balanced Parentheses** | Medium | [GFG](https://www.geeksforgeeks.org/length-of-the-longest-valid-parentheses-substring/) | Maximum length valid parentheses |
| **Remove Invalid Parentheses** | Hard | [GFG](https://www.geeksforgeeks.org/remove-invalid-parentheses/) | Remove minimum invalid parentheses |
| **Check if Expression is Balanced** | Easy | [GFG](https://www.geeksforgeeks.org/check-if-given-parentheses-expression-is-balanced-or-not/) | Mathematical expression validation |
| **Convert Infix to Postfix** | Medium | [GFG](https://www.geeksforgeeks.org/infix-to-postfix-converter/) | Uses stack for expression conversion |

### Additional Stack-Based Problems

| Problem | Platform | Difficulty | Description |
|---------|----------|------------|-------------|
| **Next Greater Element** | LeetCode/GFG | Medium | Classic stack problem |
| **Largest Rectangle in Histogram** | LeetCode | Hard | Advanced stack application |
| **Evaluate Reverse Polish Notation** | LeetCode | Medium | Stack-based expression evaluation |
| **Basic Calculator** | LeetCode | Hard | Calculator implementation using stack |

## 🏗️ Technical Implementation

### Key Components

- **`App`**: Main component managing state and logic
- **`Stack`**: Visual representation of the stack data structure  
- **`StackItem`**: Individual bracket elements with color coding
- **`isMatchingPair`**: Helper function to check bracket pairs

### Technologies Used

- **React 18+** with Hooks (useState)
- **Vanilla CSS** with inline styles for simplicity
- **ES6+ JavaScript** features
- **Responsive Design** principles

### Color Scheme

- **Parentheses** `()`: Green (#6BCB77)
- **Curly Braces** `{}`: Blue (#4D96FF)  
- **Square Brackets** `[]`: Yellow (#FFC93C)

## 🎯 Educational Value

This visualizer is perfect for:

- **Computer Science Students** learning data structures
- **Coding Interview Preparation** for stack-based problems
- **Algorithm Visualization** and understanding
- **Teaching Tool** for educators
- **Self-Study** for developers learning DSA



## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


**Made with ❤️ vaiju**

*Happy Learning! 🚀*
