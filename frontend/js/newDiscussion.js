document.addEventListener("DOMContentLoaded", function () {
    const askMentorBtn = document.getElementById("ask-mentor-btn");
    const mentorPanel = document.getElementById("mentor-panel");
    const discussionBox = document.getElementById("discussion-box");
    const postBtn = document.getElementById("post-btn");
    const mentorBtn = document.getElementById("mentor-btn");
    const discussionMessages = document.getElementById("discussion-messages");
    const mentorMessages = document.getElementById("mentor-messages");
    const prevDiscussionsList = document.getElementById("previous-discussions-list");

    askMentorBtn.addEventListener("click", function () {
        if (mentorPanel.style.display === "none" || mentorPanel.style.display === "") {
            mentorPanel.style.display = "block";
            discussionBox.style.width = "50%";
            mentorPanel.style.width = "50%";
        } else {
            mentorPanel.style.display = "none";
            discussionBox.style.width = "100%";
        }
    });

    postBtn.addEventListener("click", function () {
        let input = document.getElementById("discussion-input").value.trim();
        if (input !== "") {
            let message = document.createElement("p");
            message.textContent = input;
            message.style.background = "#333";
            message.style.padding = "10px";
            message.style.borderRadius = "5px";
            discussionMessages.appendChild(message);

            // Add to previous discussions
            let listItem = document.createElement("li");
            listItem.textContent = input;
            listItem.addEventListener("click", function () {
                loadPreviousDiscussion(input);
            });
            prevDiscussionsList.appendChild(listItem);

            document.getElementById("discussion-input").value = "";
        }
    });

    mentorBtn.addEventListener("click", function () {
        let input = document.getElementById("mentor-input").value.trim();
        if (input !== "") {
            let message = document.createElement("p");
            message.textContent = input;
            message.style.background = "#444";
            message.style.padding = "10px";
            message.style.borderRadius = "5px";
            mentorMessages.appendChild(message);
            document.getElementById("mentor-input").value = "";
        }
    });

    function loadPreviousDiscussion(discussionText) {
        discussionMessages.innerHTML = "";
        let message = document.createElement("p");
        message.textContent = discussionText;
        message.style.background = "#333";
        message.style.padding = "10px";
        message.style.borderRadius = "5px";
        discussionMessages.appendChild(message);
    }
});
