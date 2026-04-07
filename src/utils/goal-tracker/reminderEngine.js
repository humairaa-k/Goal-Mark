let intervalId;
const triggered = new Set();

export function ReminderEngine(goalSource, showSnackbar) {
  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(() => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    const goals =
      typeof goalSource === "function" ? goalSource() : goalSource;
    const appIsVisible = document.visibilityState === "visible";

    (goals || []).forEach((goal) => {
      const key = `${goal.id}-${currentTime}`;
      const isActive = goal.status === "active";
      const hasReminder = goal.reminder?.enabled;
      const sameTime = goal.reminder?.time === currentTime;
      const alreadyShown = triggered.has(key);

      if (isActive && hasReminder && sameTime && !alreadyShown) {
        if (appIsVisible && showSnackbar) {
          showSnackbar(`Don't forget: ${goal.title}`);
        } else {
          showBrowserNotification(goal);
        }
        triggered.add(key);
      }
    });
  }, 60000);
}

function showBrowserNotification(goal) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Goal Reminder", {
      body: `Don't forget: ${goal.title}`
    });
  }
}
