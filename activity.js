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

function updateFraseoActivity({
    exerciseId,
    language,
    sentenceNumber,
    shaCompleted = false,
    retoCompleted = false,
    retoScore = null
}) {
    const activities = getXpanolActivity();

    let item = activities.find(activity =>
        activity.module === "FRASEO" &&
        activity.exerciseId === exerciseId
    );

    if (!item) {
        item = {
            id: Date.now(),
            date: new Date().toISOString(),
            module: "FRASEO",
            sector: "Digital Marketing",
            exerciseId,
            language,
            sentenceNumber,
            shaCompleted: false,
            retoCompleted: false,
            retoScore: null,
            completion: 0
        };

        activities.push(item);
    }

    if (shaCompleted) {
        item.shaCompleted = true;
    }

    if (retoCompleted) {
        item.retoCompleted = true;
        item.retoScore = retoScore;
    }

    item.completion =
        (item.shaCompleted ? 50 : 0) +
        (item.retoCompleted ? 50 : 0);

    item.date = new Date().toISOString();

    saveXpanolActivity(activities);
}

function getTodayXpanolActivity() {
    const activities = getXpanolActivity();

    const today = new Date().toISOString().split("T")[0];

    return activities.filter(item =>
        item.date.startsWith(today)
    );
}
