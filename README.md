# ✈️ TCAS Visualizer

A dynamic 3D Traffic Collision Avoidance System (TCAS) visualizer built with React and Three.js. This project simulates aircraft interactions, allowing users to explore collision detection, protected zones, and resolution advisories.

---

## 🚀 Features

🌐 Interactive 3D Visualization
Simulates aircraft in 3D space using real-time motion and camera controls with Three.js.

✈️ Dynamic TCAS Logic
Implements accurate traffic and resolution advisory logic based on vector math and collision prediction algorithms.

🧠 CPA & Protected Zone Calculations
Calculates Closest Point of Approach (CPA), horizontal and vertical protected zones, and time-to-violation intervals.

📊 Real-Time Alerts
Displays Traffic Advisories (TAs) and Resolution Advisories (RAs) when potential threats are detected.

🧮 Equation Rendering
Built-in LaTeX rendering for clean and readable mathematical explanations.

---

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/npx2218/tcas-visualizer.git
cd tcas-visualizer
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```

Then open your browser and visit: http://localhost:3000

## 🧠 How It Works

The TCAS Visualizer models two aircraft in 3D space and simulates their interaction over time using vector math and spatial analysis. It implements key principles of the real-world Traffic Collision Avoidance System, including:

- Relative Motion & CPA Calculation
- Protected Zones
- Violation Detection
- Traffic & Resolution Advisories

An example of the visualizer is seen when a user first loads into the website.

## 🎮 Controls

To interact with the models:

1. Click and drag to rotate the 3D scene.
2. Scroll to zoom in/out.
3. Press "Play" to simulate aircraft motion and see live alerts.
4. Adjust parameters like speed, position, and altitude offset using the control panel.

# 🧑‍💻 Author

Neel Bansal
