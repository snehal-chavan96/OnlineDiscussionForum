document.addEventListener("DOMContentLoaded", function () {
    const askMentorBtn = document.getElementById("ask-mentor-btn");
    const mentorPanel = document.getElementById("mentor-panel");

    askMentorBtn.addEventListener("click", function () {
        if (mentorPanel.style.display === "none" || mentorPanel.style.display === "") {
            mentorPanel.style.display = "block";
        } else {
            mentorPanel.style.display = "none";
        }
    });
});
