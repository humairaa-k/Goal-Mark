
const defaultReminder = {
  enabled: false,
  time: ""
};

// Goal shape
export function createNewGoal({
  title = "",
  category = "",
  type = "daily",
  target = 1,
  startDate = new Date().toISOString(),
  endDate = null,
  deadline = null,
  startTime = "",
  endTime = "",
  color = "#1976d2",
  icon = "",
  notes = "",
  reminder = {}
} = {}) {
  return {
    id: Date.now(),
    title,
    category,
    type,
    target,
    progress: 0,
    status: "active",
    startDate,
    endDate,
    deadline,
    startTime,
    endTime,
    logs: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    color,
    icon,
    notes,
    reminder: { ...defaultReminder, ...reminder }
  };
}

   // UserStats shape
  export function createDefaultStats() {
    return {
      xpTotal: 0,
      streak: 0,
      completeCount: 0,
      lastProgressDate: null, // to help streak calculation
    };
  }
