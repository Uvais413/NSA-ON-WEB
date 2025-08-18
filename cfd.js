// feedback.js

function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.name.value.trim();
  const classValue = form.class.value;
  const message = form.message.value.trim();

  if (!name || !classValue || !message) {
    showFeedbackMessage("Please fill all the fields.", "error");
    return false;
  }

  // Submit the form using fetch (AJAX)
  fetch(form.action, {
    method: "POST",
    body: new URLSearchParams(new FormData(form))
  })
    .then(response => response.json())
    .then(data => {
      if (data.result === "success") {
        showFeedbackMessage("Thanks for your feedback!", "success");
        form.reset();
      } else {
        showFeedbackMessage("Error submitting feedback. Try again.", "error");
      }
    })
    .catch(err => {
      console.error(err);
      showFeedbackMessage("Network error. Try again.", "error");
    });

  return false;
}

// Function to show feedback message
function showFeedbackMessage(msg, type) {
  let msgDiv = document.getElementById("feedbackMessage");
  if (!msgDiv) {
    msgDiv = document.createElement("div");
    msgDiv.id = "feedbackMessage";
    msgDiv.style.marginTop = "15px";
    msgDiv.style.padding = "12px 20px";
    msgDiv.style.borderRadius = "10px";
    msgDiv.style.fontWeight = "600";
    document.getElementById("feedback").appendChild(msgDiv);
  }

  msgDiv.textContent = msg;

  if (type === "success") {
    msgDiv.style.backgroundColor = "#28a745"; // green
    msgDiv.style.color = "#fff";
  } else {
    msgDiv.style.backgroundColor = "#dc3545"; // red
    msgDiv.style.color = "#fff";
  }

  // Fade out message after 5 seconds
  setTimeout(() => {
    msgDiv.textContent = "";
    msgDiv.style.backgroundColor = "transparent";
  }, 5000);
}
