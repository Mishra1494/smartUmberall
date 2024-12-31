function refreshData() {
    fetch('/get-updates')
      .then(response => response.json())
      .then(data => {
        document.getElementById('location').textContent = `Location: ${data.location}`;
        document.getElementById('humidity').textContent = `Humidity: ${data.humidity}%`;
        document.getElementById('temperature').textContent = `Temperature: ${data.temperature}°C`;
        document.getElementById('status').textContent = `Status: ${data.status}`;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  
  // Placeholder for locating umbrella
  function locateUmbrella() {
    alert('Opening map to locate umbrella...');
    // Replace with actual GPS tracking logic
  }