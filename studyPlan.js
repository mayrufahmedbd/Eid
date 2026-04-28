
// ===== CONFIG =====
const CONFIG = {
  startDate: "2026-05-01",
  examDate: "2026-07-02"
};


// ===== STUDY DATA =====
const studyData = {
  subjects: {
    "English 2nd": {
      type: "high",
      topics: ["Tense", "Voice", "Narration", "Preposition", "Article"]
    },
    "Bangla 2nd": {
      type: "high",
      topics: ["Grammar", "Essay", "Paragraph", "Letter"]
    },
    "ICT": {
      type: "high",
      topics: ["Number System", "Database", "Networking", "HTML"]
    },
    "Economics": {
      type: "medium",
      topics: ["Demand", "Inflation", "Graphs", "Definitions"]
    },
    "Civics": {
      type: "medium",
      topics: ["Constitution", "Rights", "Governance"]
    },
    "Logic": {
      type: "practice",
      topics: ["Syllogism", "Fallacies"]
    },
    "Islam": {
      type: "easy",
      topics: ["Short Questions", "Structured Answers"]
    },
    "English 1st": {
      type: "extra",
      topics: ["Seen Passage", "Summary"]
    },
    "Bangla 1st": {
      type: "extra",
      topics: ["Important Questions", "Summary"]
    }
  }
};


// ===== DATE HELPERS =====
function getDayIndex() {
  const start = new Date(CONFIG.startDate);
  const today = new Date();
  return Math.max(0, Math.floor((today - start) / (1000 * 60 * 60 * 24)));
}

function getDaysLeft() {
  const exam = new Date(CONFIG.examDate);
  const today = new Date();
  return Math.ceil((exam - today) / (1000 * 60 * 60 * 24));
}

function getPhase(day) {
  if (day <= 25) return "coverage";
  if (day <= 45) return "practice";
  return "revision";
}


// ===== PROGRESS SYSTEM (IMPORTANT) =====
function loadProgress() {
  return JSON.parse(localStorage.getItem("studyProgress")) || {};
}

function saveProgress(progress) {
  localStorage.setItem("studyProgress", JSON.stringify(progress));
}

function getNextTopic(subject, progress) {
  const topics = studyData.subjects[subject].topics;
  const index = progress[subject] || 0;

  // Loop but controlled
  const topic = topics[index % topics.length];
  progress[subject] = index + 1;

  return topic;
}


// ===== TASK GENERATOR =====
function generateTasks() {
  const day = getDayIndex();
  const phase = getPhase(day);
  const daysLeft = getDaysLeft();

  let progress = loadProgress();
  let tasks = [];

  // PRIORITY ORDER
  const order = [
    "English 2nd",
    "Bangla 2nd",
    "ICT",
    "Economics",
    "Civics",
    "Logic",
    "Islam"
  ];

  // LIMIT TASKS PER DAY
  const maxSubjects = 4;

  for (let i = 0; i < maxSubjects; i++) {
    const subject = order[(day + i) % order.length];
    const topic = getNextTopic(subject, progress);

    let taskDetail = "";

    if (phase === "coverage") {
      taskDetail = `Study + understand "${topic}"`;
    } 
    else if (phase === "practice") {
      taskDetail = `Practice questions on "${topic}" + write 2 answers`;
    } 
    else {
      taskDetail = `Revise "${topic}" + solve past questions`;
    }

    tasks.push({
      subject,
      topic,
      detail: taskDetail
    });
  }

  // ADD WRITING TASK (MANDATORY)
  tasks.push({
    subject: "Writing",
    topic: "Answer Writing",
    detail: "Write 3-5 answers from any subjects"
  });

  // ADD REVISION BLOCK
  tasks.push({
    subject: "Revision",
    topic: "Daily Revision",
    detail: "Revise yesterday topics (1 hour)"
  });

  saveProgress(progress);

  return { tasks, phase, daysLeft };
}


// ===== RENDER =====
function render() {
  const app = document.getElementById("app");
  const { tasks, phase, daysLeft } = generateTasks();

  app.innerHTML = `
    <div class="card">
      <h2>⏳ ${daysLeft} Days Left</h2>
      <p>Current Phase: <strong>${phase.toUpperCase()}</strong></p>
    </div>

    <div class="card">
      <h2>🤖 Today's Smart Plan</h2>
      <ul>
        ${tasks.map(t => `
          <li>
            <strong>${t.subject}</strong> → ${t.topic}<br>
            <small>${t.detail}</small>
          </li>
        `).join("")}
      </ul>
    </div>

    <div class="card">
      <h2>✅ Daily Checklist</h2>
      <label><input type="checkbox"> Completed Tasks</label><br>
      <label><input type="checkbox"> Writing Done</label><br>
      <label><input type="checkbox"> Revision Done</label>
    </div>
  `;
}


// ===== INIT =====
window.onload = render;