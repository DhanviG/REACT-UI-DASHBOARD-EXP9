
import React, { useMemo, useState } from "react";
import "./App.css";

const initialTasks = [
  { id: 1, name: "Finalize homepage", project: "Fintech Project", due: "2026-11-04", status: "In Progress" },
  { id: 2, name: "Conduct user testing", project: "HealthTech", due: "2026-11-05", status: "Completed" },
  { id: 3, name: "Prepare presentation", project: "E-commerce", due: "2026-11-07", status: "Pending" },
  { id: 4, name: "Implement feedback", project: "AI Tool", due: "2026-11-09", status: "In Progress" },
  { id: 5, name: "Update style guide", project: "Energy Solutions", due: "2026-11-11", status: "Pending" },
  { id: 6, name: "Review wireframes", project: "Fintech Project", due: "2026-11-13", status: "Pending" }
];

const initialProjects = [
  { id: 1, name: "Fintech Project", category: "Finance", progress: 75, status: "In Progress", color: "blue" },
  { id: 2, name: "HealthTech", category: "Healthcare", progress: 90, status: "In Progress", color: "green" },
  { id: 3, name: "E-commerce", category: "Shopping", progress: 45, status: "In Progress", color: "pink" },
  { id: 4, name: "AI Tool", category: "Artificial Intelligence", progress: 60, status: "In Progress", color: "orange" }
];

const initialMessages = [
  { id: 1, sender: "Project Manager", subject: "Homepage design review", message: "Please review the latest homepage design before the team meeting.", time: "09:30 AM", unread: true },
  { id: 2, sender: "Development Team", subject: "API integration completed", message: "The API integration for the Fintech project is now completed.", time: "10:15 AM", unread: true },
  { id: 3, sender: "Sarah Wilson", subject: "Meeting reminder", message: "Reminder: project discussion scheduled for tomorrow.", time: "Yesterday", unread: false },
  { id: 4, sender: "Design Team", subject: "Updated style guide", message: "The updated style guide is ready for your feedback.", time: "Yesterday", unread: false }
];

const navItems = [
  { name: "Dashboard", icon: "⌂" },
  { name: "Inbox", icon: "✉" },
  { name: "Projects", icon: "▱" },
  { name: "Calendar", icon: "▦" },
  { name: "Reports", icon: "▤" }
];

function Sidebar({ activePage, setActivePage, unreadCount }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-logo">✿</span>
        <h2>Donee</h2>
        <div className="avatar">D</div>
      </div>

      <div className="sidebar-caption">WORKSPACE</div>

      <nav className="navigation">
        {navItems.map((item) => (
          <button
            key={item.name}
            className={`nav-link ${activePage === item.name ? "active" : ""}`}
            onClick={() => setActivePage(item.name)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.name}</span>
            {item.name === "Inbox" && unreadCount > 0 && (
              <span className="nav-badge">{unreadCount}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="upgrade-card">
          <span className="upgrade-icon">✦</span>
          <strong>Stay productive!</strong>
          <p>Organize your work and manage your projects efficiently.</p>
        </div>
        <div className="profile-card">
          <div className="profile-avatar">D</div>
          <div>
            <strong>Dhanvi</strong>
            <small>Workspace member</small>
          </div>
          <span className="profile-menu">•••</span>
        </div>
      </div>
    </aside>
  );
}

function Header({ activePage, dark, setDark }) {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span className="home-icon">⌂</span>
        <span>{activePage}</span>
      </div>
      <button className="theme-button" onClick={() => setDark(!dark)}>
        {dark ? "☀ Light Mode" : "☾ Dark Mode"}
      </button>
    </header>
  );
}

function PageHeading({ title, subtitle, action }) {
  return (
    <div className="page-heading">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function StatCard({ title, value, change, type }) {
  const heights = type === "orange" ? [60, 40, 55, 30, 45, 25] : [28, 42, 36, 55, 48, 70];

  return (
    <div className="stat-card">
      <p className="stat-title">{title}</p>
      <div className="stat-bottom">
        <div>
          <h2>{value}</h2>
          <p className={`change ${type}`}>{change}</p>
        </div>
        <div className={`mini-bars ${type}`}>
          {heights.map((height, i) => (
            <span key={i} style={{ height: `${height}px` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SummaryStrip({ tasks }) {
  const active = tasks.filter((task) => task.status !== "Completed").length;
  const overdue = tasks.filter((task) =>
    task.status !== "Completed" && task.due < new Date().toISOString().slice(0, 10)
  ).length;

  return (
    <div className="summary-strip">
      <span><b>{active}</b> Active Tasks</span>
      <span><b>{overdue}</b> Overdue Tasks</span>
      <span><b>{tasks.length}</b> Total Tasks</span>
    </div>
  );
}

function TaskTable({ tasks, setTasks }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const filteredTasks = useMemo(() => tasks.filter((task) => {
    const matchesSearch =
      task.name.toLowerCase().includes(search.toLowerCase()) ||
      task.project.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (filter === "All" || task.status === filter);
  }), [tasks, search, filter]);

  function addTask(e) {
    e.preventDefault();
    if (!taskName.trim() || !projectName.trim() || !dueDate) return;

    setTasks([...tasks, {
      id: Date.now(),
      name: taskName.trim(),
      project: projectName.trim(),
      due: dueDate,
      status: "Pending"
    }]);

    setTaskName("");
    setProjectName("");
    setDueDate("");
    setShowForm(false);
  }

  function toggleTask(id) {
    setTasks(tasks.map((task) => task.id === id
      ? { ...task, status: task.status === "Completed" ? "Pending" : "Completed" }
      : task
    ));
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function saveEdit(id) {
    if (!editText.trim()) return;
    setTasks(tasks.map((task) => task.id === id
      ? { ...task, name: editText.trim() }
      : task
    ));
    setEditingId(null);
  }

  function formatDate(date) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
      day: "numeric", month: "short", year: "numeric"
    });
  }

  return (
    <section className="panel task-panel">
      <div className="panel-heading">
        <h2>Today's Tasks</h2>
        <div className="table-actions">
          <input
            className="table-search"
            placeholder="⌕ Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All Tasks</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button className="primary-button" onClick={() => setShowForm(!showForm)}>
            + Add Task
          </button>
        </div>
      </div>

      {showForm && (
        <form className="add-form" onSubmit={addTask}>
          <input placeholder="Task name" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
          <input placeholder="Project name" value={projectName} onChange={(e) => setProjectName(e.target.value)} required />
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
          <button className="primary-button" type="submit">Save Task</button>
          <button className="secondary-button" type="button" onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      )}

      <div className="table-scroll">
        <table className="task-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Project</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>
                  <div className="task-name">
                    <input type="checkbox" checked={task.status === "Completed"} onChange={() => toggleTask(task.id)} />
                    {editingId === task.id ? (
                      <input className="edit-input" value={editText} onChange={(e) => setEditText(e.target.value)} />
                    ) : (
                      <span className={task.status === "Completed" ? "done-text" : ""}>{task.name}</span>
                    )}
                  </div>
                </td>
                <td><span className="project-name">▱ {task.project}</span></td>
                <td>{formatDate(task.due)}</td>
                <td><span className={`status ${task.status.toLowerCase().replace(" ", "-")}`}>{task.status}</span></td>
                <td>
                  {editingId === task.id ? (
                    <button className="action-edit" onClick={() => saveEdit(task.id)}>Save</button>
                  ) : (
                    <button className="action-edit" onClick={() => { setEditingId(task.id); setEditText(task.name); }}>Edit</button>
                  )}
                  <button className="action-delete" onClick={() => deleteTask(task.id)}>×</button>
                </td>
              </tr>
            ))}
            {filteredTasks.length === 0 && <tr><td colSpan="5" className="empty-row">No tasks found.</td></tr>}
          </tbody>
        </table>
      </div>
      <p className="table-footer">Showing {filteredTasks.length} of {tasks.length} tasks</p>
    </section>
  );
}

function PerformanceCard({ tasks }) {
  const completed = tasks.filter((task) => task.status === "Completed").length;
  const percentage = tasks.length ? Math.round(completed / tasks.length * 100) : 0;
  const bars = [55, 35, 72, 62, 84];

  return (
    <section className="panel performance-panel">
      <h2>Performance</h2>
      <div className="performance-value">
        <strong>{percentage}%</strong>
        <span>Tasks completed</span>
      </div>
      <div className="performance-chart">
        {bars.map((height, i) => (
          <div className="performance-column" key={i}>
            <div className="bar-track">
              <div className="performance-bar" style={{ height: `${height}%` }} />
            </div>
            <small>{["Mon", "Tue", "Wed", "Thu", "Fri"][i]}</small>
          </div>
        ))}
      </div>
      <div className="performance-note">Your weekly productivity overview</div>
    </section>
  );
}

function DashboardPage({ tasks, setTasks }) {
  const completed = tasks.filter((task) => task.status === "Completed").length;

  return (
    <>
      <PageHeading title="Welcome back, Dhanvi!" subtitle="Here is your workspace overview." />
      <SummaryStrip tasks={tasks} />

      <div className="stats-grid">
        <StatCard title="Total Projects" value="4" change="+5 vs last month" type="blue" />
        <StatCard title="Total Tasks" value={tasks.length} change={`${completed} completed`} type="orange" />
        <StatCard title="In Reviews" value="23" change="+12 vs last month" type="green" />
      </div>

      <div className="dashboard-grid">
        <TaskTable tasks={tasks} setTasks={setTasks} />
        <PerformanceCard tasks={tasks} />
      </div>

      <div className="panel progress-panel">
        <div className="panel-heading">
          <h2>Task Progress</h2>
          <span className="live-label">Live Overview</span>
        </div>
        <div className="progress-info">
          <span>Completed tasks</span>
          <strong>{completed} / {tasks.length}</strong>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${tasks.length ? completed / tasks.length * 100 : 0}%` }} />
        </div>
      </div>
    </>
  );
}

function InboxPage({ messages, setMessages }) {
  const [selected, setSelected] = useState(messages[0]?.id ?? null);

  const current = messages.find((message) => message.id === selected);

  function openMessage(id) {
    setSelected(id);
    setMessages(messages.map((message) => message.id === id ? { ...message, unread: false } : message));
  }

  return (
    <>
      <PageHeading title="Inbox" subtitle="Manage your messages and team notifications." />
      <div className="inbox-layout panel">
        <div className="message-list">
          <h2>Messages ({messages.length})</h2>
          {messages.map((message) => (
            <button key={message.id} className={`message-item ${selected === message.id ? "selected" : ""}`} onClick={() => openMessage(message.id)}>
              <div className="message-avatar">{message.sender.charAt(0)}</div>
              <div className="message-summary">
                <div className="message-top"><strong>{message.sender}</strong><small>{message.time}</small></div>
                <b>{message.subject}</b>
                <p>{message.message}</p>
              </div>
              {message.unread && <span className="unread-dot" />}
            </button>
          ))}
          {messages.length === 0 && <p className="empty-message">Your inbox is empty.</p>}
        </div>
        <div className="message-detail">
          {current ? (
            <>
              <span className="detail-label">MESSAGE DETAILS</span>
              <h2>{current.subject}</h2>
              <p className="detail-sender">From: {current.sender} · {current.time}</p>
              <div className="detail-message">{current.message}</div>
              <button className="secondary-button" onClick={() => setMessages(messages.filter((m) => m.id !== current.id))}>Delete Message</button>
            </>
          ) : <p>Select a message to read.</p>}
        </div>
      </div>
    </>
  );
}

function ProjectsPage({ projects, setProjects }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  function addProject(e) {
    e.preventDefault();
    if (!name.trim() || !category.trim()) return;
    setProjects([...projects, {
      id: Date.now(), name: name.trim(), category: category.trim(),
      progress: 0, status: "Planning", color: "blue"
    }]);
    setName("");
    setCategory("");
    setShowForm(false);
  }

  return (
    <>
      <PageHeading
        title="Projects"
        subtitle="Organize, monitor and manage your projects."
        action={<button className="primary-button" onClick={() => setShowForm(!showForm)}>+ New Project</button>}
      />
      {showForm && (
        <form className="add-form project-form" onSubmit={addProject}>
          <input placeholder="Project name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
          <button className="primary-button" type="submit">Create Project</button>
          <button className="secondary-button" type="button" onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      )}
      <div className="project-overview">
        <div className="panel project-overview-card"><span>Total Projects</span><strong>{projects.length}</strong></div>
        <div className="panel project-overview-card"><span>In Progress</span><strong>{projects.filter(p => p.status === "In Progress").length}</strong></div>
        <div className="panel project-overview-card"><span>Planning</span><strong>{projects.filter(p => p.status === "Planning").length}</strong></div>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <article className="panel project-card" key={project.id}>
            <div className={`project-symbol ${project.color}`}>▱</div>
            <div className="project-card-top">
              <div><h2>{project.name}</h2><p>{project.category}</p></div>
              <span className={`status ${project.status === "Planning" ? "pending" : "in-progress"}`}>{project.status}</span>
            </div>
            <div className="progress-info"><span>Project progress</span><strong>{project.progress}%</strong></div>
            <div className="progress-track"><div className="progress-fill" style={{ width: `${project.progress}%` }} /></div>
            <div className="project-card-bottom">
              <span>Project #{project.id}</span>
              <button className="action-delete" onClick={() => setProjects(projects.filter(p => p.id !== project.id))}>Delete</button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function CalendarPage({ tasks }) {
  const sortedTasks = [...tasks].sort((a, b) => a.due.localeCompare(b.due));

  return (
    <>
      <PageHeading title="Calendar" subtitle="View upcoming tasks and project deadlines." />
      <div className="calendar-summary">
        <div className="panel"><strong>{tasks.length}</strong><span>Scheduled tasks</span></div>
        <div className="panel"><strong>{tasks.filter(t => t.status === "Completed").length}</strong><span>Completed</span></div>
        <div className="panel"><strong>{tasks.filter(t => t.status !== "Completed").length}</strong><span>Upcoming</span></div>
      </div>
      <section className="panel agenda-panel">
        <div className="panel-heading"><h2>Upcoming Schedule</h2><span className="live-label">Task Agenda</span></div>
        {sortedTasks.length ? sortedTasks.map((task) => (
          <div className="agenda-item" key={task.id}>
            <div className="agenda-date">
              <strong>{new Date(`${task.due}T00:00:00`).getDate()}</strong>
              <span>{new Date(`${task.due}T00:00:00`).toLocaleDateString("en-US", { month: "short" })}</span>
            </div>
            <div className="agenda-description">
              <strong>{task.name}</strong>
              <span>{task.project}</span>
            </div>
            <span className={`status ${task.status.toLowerCase().replace(" ", "-")}`}>{task.status}</span>
          </div>
        )) : <p className="empty-message">No scheduled tasks.</p>}
      </section>
    </>
  );
}

function ReportsPage({ tasks, projects }) {
  const completed = tasks.filter((task) => task.status === "Completed").length;
  const pending = tasks.filter((task) => task.status === "Pending").length;
  const progress = tasks.filter((task) => task.status === "In Progress").length;
  const percentage = tasks.length ? Math.round(completed / tasks.length * 100) : 0;

  const reportStats = [
    { label: "Completed", value: completed, color: "report-green" },
    { label: "Pending", value: pending, color: "report-yellow" },
    { label: "In Progress", value: progress, color: "report-blue" }
  ];

  return (
    <>
      <PageHeading title="Reports & Analytics" subtitle="Understand your team's productivity and project progress." />
      <div className="report-stats">
        <div className="panel report-card"><span>Total Tasks</span><strong>{tasks.length}</strong><small>Across all projects</small></div>
        <div className="panel report-card"><span>Completion Rate</span><strong>{percentage}%</strong><small>Based on completed tasks</small></div>
        <div className="panel report-card"><span>Active Projects</span><strong>{projects.length}</strong><small>Current workspace projects</small></div>
      </div>
      <div className="reports-grid">
        <section className="panel report-breakdown">
          <h2>Task Status Breakdown</h2>
          {reportStats.map((item) => (
            <div className="breakdown-item" key={item.label}>
              <div className="breakdown-heading"><span>{item.label}</span><strong>{item.value}</strong></div>
              <div className="progress-track"><div className={`progress-fill ${item.color}`} style={{ width: `${tasks.length ? item.value / tasks.length * 100 : 0}%` }} /></div>
            </div>
          ))}
        </section>
        <section className="panel report-breakdown">
          <h2>Project Overview</h2>
          {projects.map((project) => (
            <div className="breakdown-item" key={project.id}>
              <div className="breakdown-heading"><span>{project.name}</span><strong>{project.progress}%</strong></div>
              <div className="progress-track"><div className="progress-fill" style={{ width: `${project.progress}%` }} /></div>
            </div>
          ))}
          {!projects.length && <p className="empty-message">No projects available.</p>}
        </section>
      </div>
      <section className="panel report-note">
        <h2>Productivity Summary</h2>
        <p>You have completed {completed} out of {tasks.length} tasks. Your current completion rate is {percentage}%.</p>
      </section>
    </>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [dark, setDark] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [projects, setProjects] = useState(initialProjects);
  const [messages, setMessages] = useState(initialMessages);

  const unreadCount = messages.filter((message) => message.unread).length;

  return (
    <div className={`app-shell ${dark ? "dark-theme" : ""}`}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} unreadCount={unreadCount} />
      <div className="main-area">
        <Header activePage={activePage} dark={dark} setDark={setDark} />
        <main className="page-content">
          {activePage === "Dashboard" && <DashboardPage tasks={tasks} setTasks={setTasks} />}
          {activePage === "Inbox" && <InboxPage messages={messages} setMessages={setMessages} />}
          {activePage === "Projects" && <ProjectsPage projects={projects} setProjects={setProjects} />}
          {activePage === "Calendar" && <CalendarPage tasks={tasks} />}
          {activePage === "Reports" && <ReportsPage tasks={tasks} projects={projects} />}
        </main>
      </div>
    </div>
  );
}
