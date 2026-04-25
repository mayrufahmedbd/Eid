const data = {
  goal: "Score 80+ in all subjects in 5 months",
  duration_days: 150,
  phases: [
    { name: "Phase 1 - Build Basics", days: "1-60" },
    { name: "Phase 2 - Practice + Writing", days: "61-120" },
    { name: "Phase 3 - Revision + Model Test", days: "121-150" }
  ],
  daily_routine: {
    morning: { time: "6:00-8:00", subjects: ["ICT", "English"] },
    midday: { time: "11:00-1:00", subjects: ["Economics", "Civics"] },
    evening: { time: "4:00-6:00", subjects: ["Bangla", "Logic"] },
    night: { time: "8:00-9:30", subjects: ["Islam Education", "Revision"] }
  },
  subjects: {
    ICT: {
      phase1: ["Number system", "Digital devices", "HTML", "Database", "Networking"],
      phase2: ["Short questions", "Creative questions"],
      phase3: ["Board questions"]
    },
    English_2nd: {
      phase1: ["Tense", "Voice", "Narration"],
      phase2: ["CV writing", "Essay"],
      phase3: ["Model test"]
    }
  },
  weekly_plan: {
    study_days: 6,
    revision_day: 1,
    tasks: ["Revise all subjects", "Solve questions", "Mock test"]
  },
  daily_rules: [
    "Study 2-3 topics",
    "Write answers",
    "Revise daily",
    "No mobile distraction"
  ]
};

// Goal
document.getElementById("goal").innerHTML =
  `<div class="card"><strong>Goal:</strong> ${data.goal} (${data.duration_days} days)</div>`;

// Phases
const phasesDiv = document.getElementById("phases");
data.phases.forEach(p => {
  phasesDiv.innerHTML += `<div class="card">${p.name} (${p.days})</div>`;
});

// Routine
const routineDiv = document.getElementById("routine");
for (let key in data.daily_routine) {
  const r = data.daily_routine[key];
  routineDiv.innerHTML += `
    <div class="card">
      <strong>${key.toUpperCase()}</strong><br>
      Time: ${r.time}<br>
      Subjects: ${r.subjects.join(", ")}
    </div>
  `;
}

// Subjects
const subjectsDiv = document.getElementById("subjects");
for (let subject in data.subjects) {
  const s = data.subjects[subject];

  let html = `<div class="card"><strong>${subject}</strong>`;
  ["phase1", "phase2", "phase3"].forEach(phase => {
    if (s[phase]) {
      html += `<p><b>${phase}:</b></p><ul>`;
      s[phase].forEach(item => {
        html += `<li>${item}</li>`;
      });
      html += `</ul>`;
    }
  });
  html += `</div>`;

  subjectsDiv.innerHTML += html;
}

// Weekly
document.getElementById("weekly").innerHTML = `
  <div class="card">
    Study Days: ${data.weekly_plan.study_days}<br>
    Revision Day: ${data.weekly_plan.revision_day}
    <ul>
      ${data.weekly_plan.tasks.map(t => `<li>${t}</li>`).join("")}
    </ul>
  </div>
`;

// Rules
const rulesUl = document.getElementById("rules");
data.daily_rules.forEach(rule => {
  rulesUl.innerHTML += `<li>${rule}</li>`;
});