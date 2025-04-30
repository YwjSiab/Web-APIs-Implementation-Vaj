function getUserLocation() {
    if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    console.error("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.error("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    console.error("The request to get user location timed out.");
                    break;
                default:
                    console.error("An unknown error occurred.");
            }
        }
    );
}

// Call it on page load
getUserLocation();

window.sampleAnimal = { id: 1, species: "Bear", name: "Baloo", age: 10 };

window.saveToLocal = function(animal) {
    try {
        const json = JSON.stringify(animal);
        localStorage.setItem(`animal-${animal.id}`, json);
        console.log("Animal saved to Local Storage.");
    } catch (err) {
        console.error("Failed to save to localStorage:", err.message);
    }
}

window.loadFromLocal = function(id) {
    try {
        const json = localStorage.getItem(`animal-${id}`);
        return JSON.parse(json);
    } catch (err) {
        console.error("Failed to load from localStorage:", err.message);
        return null;
    }
}

function isRateLimited() {
    const key = "zooSubmission";
    const last = sessionStorage.getItem(key);
    const now = Date.now();

    if (last && now - parseInt(last) < 30000) { // 30 seconds
        console.warn("Rate limit: please wait before submitting again.");
        return true;
    }

    sessionStorage.setItem(key, now.toString());
    return false;
}

// Usage
if (!isRateLimited()) {
    console.log("Submitted!");
}
