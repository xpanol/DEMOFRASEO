function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).toUpperCase();
}

function renderTodayActivity() {
    const container = document.getElementById("today-activity");

    const activities = getTodayXpanolActivity();

    if (activities.length === 0) {
        container.innerHTML = "No activity yet.";
        return;
    }

    container.innerHTML = activities.map(item => `
        <div class="activity-item">
            <strong>${item.module}</strong>
            <div>${item.activity}</div>
            ${item.duration ? `<small>${item.duration} min</small>` : ""}
        </div>
    `).join("");
}

function renderActivityLog() {
    const container = document.getElementById("activity-log");

    const activities = getXpanolActivity();

    if (activities.length === 0) {
        container.innerHTML = "No activity yet.";
        return;
    }

    const sortedActivities = [...activities].reverse();

    container.innerHTML = sortedActivities.map(item => `
        <div class="activity-item">
            <small>${formatDate(item.date)}</small>
            <strong>${item.module}</strong>
            <div>${item.activity}</div>
            ${item.duration ? `<small>${item.duration} min</small>` : ""}
        </div>
    `).join("");
}

renderTodayActivity();
renderActivityLog();