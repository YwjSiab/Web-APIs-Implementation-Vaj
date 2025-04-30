document.addEventListener('DOMContentLoaded', getUserLocation);
function getUserLocation() {
    const locationStatus = document.getElementById("locationStatus");

    if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        if (locationStatus) locationStatus.textContent = "Geolocation not supported.";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            if (locationStatus) {
                locationStatus.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
            }
        },
        (error) => {
            let message;
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    message = "User denied the request for Geolocation.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    message = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    message = "The request to get user location timed out.";
                    break;
                default:
                    message = "An unknown error occurred.";
            }
            console.error(message);
            if (locationStatus) {
                locationStatus.textContent = `Error: ${message}`;
            }
        }
    );
}

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
        const parsed = JSON.parse(json);
        if (!parsed) {
            console.warn("No animal data found for ID:", id);
            return null;
        }
        return parsed;
    } catch (err) {
        console.error("Failed to load from localStorage:", err.message);
        return null;
    }
}

function isRateLimited() {
    const key = "Submission";
    const last = sessionStorage.getItem(key);
    const now = Date.now();

    if (last && now - parseInt(last) < 30000) {
        console.warn("Rate limit: please wait before submitting again.");
        return true;
    }
    
    try {
        sessionStorage.setItem(key, now.toString());
    } catch (err) {
        console.error("Failed to update session storage:", err.message);
    }
    return false;
}

window.checkRateLimit = function () {
    if (!isRateLimited()) {
      console.log("Submitted!");
    }
  };