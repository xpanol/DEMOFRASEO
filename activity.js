const XPANOL_ACTIVITY_KEY = "xpanol_activity";

function getXpanolActivity() {
    const data = localStorage.getItem(XPANOL_ACTIVITY_KEY);

    if (!data) {
        return [];
    }

    try {
        return JSON.parse(data);
    } catch (error) {
        console.error("Could not read XPANOL activity:", error);
        return [];
    }
}

function saveXpanolActivity(activity) {
    localStorage.setItem(
        XPANOL_ACTIVITY_KEY,
        JSON.stringify(activity)
    );
}

function logXpanolActivity({
    module,
    sector = "",
    activity = "",
    completed = true,
    duration = null
}) {
    const activities = getXpanolActivity();

    activities.push({
        id: Date.now(),
        date: new Date().toISOString(),
        module,
        sector,
        activity,
        completed,
        duration
    });

    saveXpanolActivity(activities);
}

function getTodayXpanolActivity() {
    const activities = getXpanolActivity();

    const today = new Date().toISOString().split("T")[0];

    return activities.filter(item =>
        item.date.startsWith(today)
    );
}