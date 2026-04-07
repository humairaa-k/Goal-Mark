
const GOALS_KEY = "goal-tracker-goals";
const STATS_KEY = "goal-tracker-stats";

// ----- GOALS ------

export function getGoals() {
  const data = localStorage.getItem(GOALS_KEY);
  if (!data) return [];

  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error parsing goals from storage:", err);
    return [];
  }
}

export function saveGoals(goals) {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
}

// ----- STATS ------

const defaultStats = {
  xpTotal: 0,
  streak: 0,
  completeCount: 0,
  lastProgressDate: null
};

export function getStats() {
  const data = localStorage.getItem(STATS_KEY);
  if (!data) return defaultStats;

  try {
    const parsed = JSON.parse(data);
    return { ...defaultStats, ...parsed };
  } catch (err) {
    console.error("Error parsing stats from storage:", err);
    return defaultStats;
  }
}

export function saveStats(stats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}
