// Get the search button element
const searchBtn = document.getElementById("searchBtn");

// Add a click event listener to the search button
searchBtn.addEventListener("click", async () => {
  // Get the user input element and the value entered
  const userInput = document.getElementById("userInput");
  const userName = userInput.value;

  // Get the infoList element to display user information
  const infoList = document.getElementById("infoList");
  const payload = {
    user_name: userName,
  };

  const jsonData = JSON.stringify(payload);

  console.log(jsonData)

  try {
    // Make a request to backend to get user information
    const response = await axios.post("https://backend-service-h1x1.onrender.com/github-profiler", jsonData, {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json"
      },
    });

    // Extract user data from the response
    const user = response.data;

    // Clear previous results in the infoList
    infoList.innerHTML = "";

    // Create list items function
    const createListItem = (label, value) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<p><span>${label}:</span>  ${value}</p>`;
      return listItem;
    };

    // Add list items for different user details
    infoList.appendChild(createListItem("Name", user.name));
    infoList.appendChild(createListItem("Bio", user.bio));
    infoList.appendChild(createListItem("Blog", user.blog));
    infoList.appendChild(createListItem("Company", user.company));
    infoList.appendChild(
      createListItem("Account Creation Date", user.created_at)
    );
    infoList.appendChild(createListItem("Email", user.email));
    infoList.appendChild(createListItem("Followers", user.followers));
    infoList.appendChild(createListItem("Following", user.following));
    infoList.appendChild(createListItem("Hireable", user.hireable));
    infoList.appendChild(createListItem("GitHub Page", user.html_url));
    infoList.appendChild(createListItem("Location", user.location));
  } catch (error) {
    // Log any errors that occur during the API request
    alert(error);
  }
});
