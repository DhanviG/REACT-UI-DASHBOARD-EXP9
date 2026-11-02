
import React, { useState } from "react";
import "./App.css";

function Header({ title, darkMode, toggleTheme }) {
  return (
    <header className="header">
      <h2>{title}</h2>
      <button onClick={toggleTheme}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </header>
  );
}

function Sidebar({ activePage, setActivePage }) {
  const pages = ["Dashboard", "Courses", "Assignments", "Profile"];

  return (
    <aside className="sidebar">
      <h2>Student Portal</h2>

      {pages.map((page) => (
        <button
          key={page}
          className={activePage === page ? "active" : ""}
          onClick={() => setActivePage(page)}
        >
          {page}
        </button>
      ))}
    </aside>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      <span>{icon}</span>
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <h1>Welcome Back, Student!</h1>
      <p>Here is your academic overview.</p>

      <div className="stats">
        <StatCard title="Courses" value="06" icon="📚" />
        <StatCard title="Assignments" value="12" icon="📝" />
        <StatCard title="Completed" value="09" icon="✅" />
        <StatCard title="Attendance" value="92%" icon="📊" />
      </div>

      <section className="content-card">
        <h2>Recent Activities</h2>
        <p>✓ Completed ReactJS assignment</p>
        <p>✓ Attended Database Management class</p>
        <p>✓ Submitted Java programming task</p>
      </section>
    </>
  );
}

function Courses() {
  const courses = [
    { name: "ReactJS Development", code: "CS301", progress: "80%" },
    { name: "Database Management", code: "CS302", progress: "65%" },
    { name: "Java Programming", code: "CS303", progress: "90%" },
    { name: "Web Technologies", code: "CS304", progress: "75%" }
  ];

  return (
    <>
      <h1>My Courses</h1>
      <p>View your enrolled courses and learning progress.</p>

      <div className="stats">
        {courses.map((course) => (
          <div className="stat-card" key={course.code}>
            <h3>{course.name}</h3>
            <p>Course Code: {course.code}</p>
            <h2>{course.progress}</h2>
            <p>Progress Completed</p>
          </div>
        ))}
      </div>
    </>
  );
}

function Assignments() {
  const tasks = [
    { name: "ReactJS UI Design", due: "05 November 2026", status: "Completed" },
    { name: "SQL Queries", due: "07 November 2026", status: "Pending" },
    { name: "Java Programming", due: "10 November 2026", status: "Pending" },
    { name: "Web Development", due: "12 November 2026", status: "Completed" }
  ];

  return (
    <>
      <h1>My Assignments</h1>
      <p>Track your assignment deadlines and status.</p>

      <section className="content-card">
        {tasks.map((task, index) => (
          <div className="task" key={index}>
            <div>
              <h3>{task.name}</h3>
              <p>Due Date: {task.due}</p>
            </div>
            <span className={task.status === "Completed" ? "completed" : "pending"}>
              {task.status}
            </span>
          </div>
        ))}
      </section>
    </>
  );
}

function Profile() {
  return (
    <>
      <h1>Student Profile</h1>

      <section className="content-card profile">
        <div className="avatar">S</div>
        <h2>Student Name</h2>
        <p>student@example.com</p>

        <hr />

        <p><b>Department:</b> Computer Science</p>
        <p><b>Year:</b> Third Year</p>
        <p><b>Student ID:</b> STU2026</p>
        <p><b>Attendance:</b> 92%</p>
      </section>
    </>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "Courses":
        return <Courses />;
      case "Assignments":
        return <Assignments />;
      case "Profile":
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-content">
        <Header
          title="Student Dashboard"
          darkMode={darkMode}
          toggleTheme={() => setDarkMode(!darkMode)}
        />

        {renderPage()}
      </main>
    </div>
  );
}

export default App;
