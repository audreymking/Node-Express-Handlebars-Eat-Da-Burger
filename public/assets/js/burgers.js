// Waits to attach  handlers until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.info("DOM loaded");
  }

  // Devoured button-- updates
  const changesDevouredButton = document.querySelectorAll(".change-devoured");

  // Set up the event listener for the create button
  if (changesDevouredButton) {
    changesDevouredButton.forEach((button) => {
      button.addEventListener("click", (e) => {
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute("data-id");
        const newDevoured = e.target.getAttribute("data-newdevoured");

        const newDevouredState = {
          devoured: newDevoured,
        };

        fetch(`/api/burgers/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          // Serializes the JSON body
          body: JSON.stringify(newDevouredState),
        }).then((response) => {
          console.log(
            "JSON.stringify(newDevouredState)",
            JSON.stringify(newDevouredState)
          );
          // Check that the response is all good
          // Reload the page so the user can see the new quote
          if (response.ok) {
            console.log(`changed devoured to: ${newDevoured}`);
            location.reload("/");
          } else {
            alert("Oops, something went wrong!");
          }
        });
      });
    });
  }

  // Creates burger button
  const createBurgerBtn = document.getElementById("create-form");

  if (createBurgerBtn) {
    createBurgerBtn.addEventListener("submit", (e) => {
      e.preventDefault();

      // Takes what the client submits
      const newBurger = {
        name: document.getElementById("ca").value.trim(),
        devoured: false,
      };

      // Send POST request to create a new burger
      fetch("/api/burgers", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        // Serializes the JSON body
        body: JSON.stringify(newBurger),
      }).then(() => {
        // Empties the form
        document.getElementById("ca").value = "";

        // Reloads the page so the client can see the burger they created
        console.log("Created a new burger!");
        location.reload();
      });
    });
  }

  // Deletes the burger object
  const deleteBurgerBtn = document.querySelectorAll(".delete-burger");

  // Sets up the event listeners for each delete button
  deleteBurgerBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");

      // Sends the delete request
      fetch(`/api/burgers/${id}`, {
        method: "DELETE",
      }).then((res) => {
        console.log(res);
        console.log(`Deleted burger: ${id}`);

        // Reloads the page
        location.reload();
      });
    });
  });
});
