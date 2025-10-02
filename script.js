const userContainer = document.getElementById('userContainer');
const reloadBtn = document.getElementById('reloadBtn');
const errorDiv = document.getElementById('error');

async function fetchUserData() {
  userContainer.innerHTML = ''; // Clear old data
  errorDiv.textContent = ''; // Clear old errors

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();

    users.forEach(user => {
      const userCard = document.createElement('div');
      userCard.classList.add('user-card');

      userCard.innerHTML = `
        <h2>${user.name}</h2>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;

      userContainer.appendChild(userCard);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    errorDiv.textContent = 'Failed to load user data. Please check your connection and try again.';
  }
}

// Reload button event
reloadBtn.addEventListener('click', fetchUserData);

// Initial fetch
fetchUserData();
