// state manager(brain)
import { createContext, useEffect, useState } from 'react';
import { getGoals, getStats, saveGoals, saveStats } from '../services/storage'
import { createDefaultStats } from '../services/models'
import { useNotification } from './NotificationContext';

import { ReminderEngine } from '../utils/goal-tracker/reminderEngine';

export const GoalContext = createContext(); //global variable,empty box

export const GoalProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [goals, setGoals] = useState([]);
  const [stats, setStats] = useState(createDefaultStats());
  const [archivedGoals, setArchivedGoals] = useState([]);
  
  const [deletedGoals, setDeletedGoals] = useState([]);
  const [restoredCount, setRestoredCount] = useState(0);
  const { showNotification } = useNotification();


 useEffect(() => {
    try {
      const storedGoals = getGoals();
      const storedStats = getStats();
      const archived = JSON.parse(localStorage.getItem("archivedGoals")) || [];
      const deleted = JSON.parse(localStorage.getItem("deletedGoals")) || [];

      setGoals(storedGoals);
      setStats(storedStats);
      setArchivedGoals(archived);
      setDeletedGoals(deleted);
    } catch (err) {
      console.error(err);
    } finally {

       setTimeout(() => {
          setLoading(false); 
      },2000)
    }

  }, []);


  // Save to localStorage whenever goals or stats change
  useEffect(() => {
    saveGoals(goals)
  }, [goals])

  useEffect(() => {
    saveStats(stats)   //error: passed wrong state
  }, [stats]);

  //---------NEW STORAGE FOR ARCHIVE AND DELETE-------

  useEffect(() => {
    localStorage.setItem("archivedGoals", JSON.stringify(archivedGoals));
  }, [archivedGoals]);

  useEffect(() => {
    localStorage.setItem("deletedGoals", JSON.stringify(deletedGoals));
  }, [deletedGoals]);

  useEffect(() => {
    ReminderEngine(() => goals, showNotification);
  }, [goals, showNotification])

  // -------------------- Actions ---------

  const addGoal = (goal) => {
    setGoals((prev) => [...prev, goal])
  };

  const updateGoal = (id, updatedGoal) => {
    setGoals((prev) =>
      prev.map((g) => g.id === id ? { ...updatedGoal, updatedAt: new Date().toISOString() } : g)
    )
  };

  const deleteGoal = (goalId) => {

    const goal =
      goals.find((g) => g.id === goalId) ||
      archivedGoals.find((g) => g.id === goalId);

    if (!goal) return;

    setGoals((prev) => prev.filter((g) => g.id !== goalId));
    setArchivedGoals((prev) => prev.filter((g) => g.id !== goalId));

    const deletedGoal = {
      ...goal,
      deleted: true,
      deletedAt: new Date().toISOString(),
      status: "deleted",
    }

    setDeletedGoals((prev) => [deletedGoal, ...prev]);
  };


  const togglePause = (id) => {
    setGoals((prev) =>
      prev.map((g) => g.id === id ?
     { ...g, status: g.status === "paused" ? "active" : "paused" } : g)
    )
  };


  const addProgress = (id, amount = 1) => {
    let completedGoalId = null;
    let completedGoalData = null;
    let xpGainTotal = 0;
    let shouldIncreaseComplete = false;

    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id && g.status === "active") {
          const newProgress = (g.progress || 0) + amount;
          const isCompleted = newProgress >= g.target;

          const logs = [
            ...(g.logs || []),
            { date: new Date().toISOString(), amount },
          ];

          xpGainTotal += amount * 20;

          const updatedGoal = {
            ...g,
            progress: newProgress,
            logs,
            status: isCompleted ? "completed" : g.status,
            completedAt: isCompleted ? new Date().toISOString() : g.completedAt,
            updatedAt: new Date().toISOString(),
          };

          if (isCompleted) {
            completedGoalId = g.id;
            completedGoalData = updatedGoal;
            shouldIncreaseComplete = true;
          }

          return updatedGoal;
        }
        return g;
      })
    );

    setStats((prevStats) => {
      let newStreak = prevStats.streak;
      const today = new Date().toDateString();

      if (prevStats.lastProgressDate) {
        const lastTime = new Date(prevStats.lastProgressDate);
        const diff = Math.floor(
          (new Date() - lastTime) / (1000 * 60 * 60 * 24)
        );

        if (diff === 1) newStreak += 1;
        else if (diff > 1) newStreak = 1;
      } else {
        newStreak = 1;
      }

      return {
        ...prevStats,
        xpTotal: prevStats.xpTotal + xpGainTotal,
        streak: newStreak,
        completeCount: shouldIncreaseComplete
          ? prevStats.completeCount + 1
          : prevStats.completeCount,
        lastProgressDate: today,
      };
    });

    if (completedGoalId && completedGoalData) {
      setTimeout(() => {
        archiveGoal(completedGoalData);
      }, 0);
    }
  };


  const archiveGoal = (goalOrId) => {
  const goal =
    typeof goalOrId === "object"
      ? goalOrId
      : goals.find((g) => g.id === goalOrId);

  if (!goal) return;

  setGoals((prev) => prev.filter((g) => g.id !== goal.id));

  setArchivedGoals((prev) => {
    if (prev.some((g) => g.id === goal.id)) return prev;

    return [
      {
        ...goal,
        status: "completed",
        completedAt: goal.completedAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      ...prev,
    ];
  });
};

  const allArchiveGoals = archivedGoals;


  const restoreGoal = (goalId) => {
    const goal = deletedGoals.find((g) => g.id === goalId) ||
                 archivedGoals.find((g) => g.id === goalId);

    if (!goal) return;

    setDeletedGoals((prev) => prev.filter((g) => g.id !== goalId));
    setArchivedGoals((prev) => prev.filter((g) => g.id !== goalId));

    setGoals((prev) => [
      {
        ...goal,
        progress: 0,
        status: "active",
        logs: [],
        deleted: false,
        deletedAll: null,
      },
      ...prev,
    ]);

    setRestoredCount((prev) => prev + 1);
  };

  const permanentDeleteGoal = (goalId) => {
    setArchivedGoals((prev) => prev.filter((g) => g.id !== goalId));
    setDeletedGoals((prev) => prev.filter((g) => g.id !== goalId));
  };

  const clearArchive = () => {
    setArchivedGoals([]);
    setDeletedGoals([]);
  }


  return (
    <GoalContext.Provider
      value={{
        goals,
        archivedGoals,
        deletedGoals,
        stats,
        addGoal,
        setGoals,
        updateGoal,
        deleteGoal,
        togglePause,
        addProgress,
        archiveGoal,
        restoreGoal,
        permanentDeleteGoal,
        clearArchive,
        restoredCount,
        loading,
      }}>
      {children}
    </GoalContext.Provider>
  );
}

