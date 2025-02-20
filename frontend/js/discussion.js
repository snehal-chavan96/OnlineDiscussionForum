document.addEventListener("DOMContentLoaded", function () {
    let discussions = [
        {
            id: "discussion1",
            title: "Spotify Clone Error",
            user: "Saloni Gumani",
            time: "12d ago",
            details: "Saloni Gumani: Facing an issue with cards-container (display: flex; flex-wrap: wrap;).",
            messages: [],
            summary: "Saloni is facing an issue with CSS flex-wrap while making a Spotify clone."
        },
        {
            id: "discussion2",
            title: "Why not print table of 5*10=50?",
            user: "Aditya",
            time: "12d ago",
            details: "Aditya: let n = parseInt(prompt('Enter number')); for(let i=1; i<=10; i++) console.log(n*i);",
            messages: [],
            summary: "Aditya is having trouble printing multiplication tables using JavaScript."
        },
        {
            id: "discussion3",
            title: "Issue in creating cards using CSS",
            user: "Harshal",
            time: "7d ago",
            details: "Harshal: I am trying to create cards using CSS but stuck with flexbox issues.",
            messages: [],
            summary: "Harshal is facing problems in implementing card layout using CSS flexbox."
        },
        {
            id: "discussion4",
            title: "Related to JS",
            user: "Aalok",
            time: "10d ago",
            details: "Aalok: Need help understanding symbol type and closures in JavaScript.",
            messages: [],
            summary: "Aalok needs an explanation of JavaScript symbols and closures."
        }
    ];

    let discussionList = document.getElementById("discussion-list");

    discussions.forEach(discussion => {
        let div = document.createElement("div");
        div.classList.add("discussion-item");
        div.innerHTML = `<p><strong>${discussion.title}</strong></p>
                         <small>${discussion.user} - ${discussion.time}</small>`;
        div.onclick = function () {
            showDiscussion(discussion);
        };
        discussionList.appendChild(div);
    });

    window.showSummary = function (discussionId) {
        let discussion = discussions.find(d => d.id === discussionId);
        let summaryBox = document.getElementById("summary-box");

        if (summaryBox.style.display === "none" || summaryBox.style.display === "") {
            summaryBox.innerHTML = `<p><strong>Summary:</strong> ${discussion.summary}</p>`;
            summaryBox.style.display = "block";
        } else {
            summaryBox.style.display = "none";
        }
    };
});

function showDiscussion(discussion) {
    document.getElementById("discussion-details").innerHTML = `
        <h2>${discussion.title}</h2>
        <p><strong>${discussion.user}</strong>: ${discussion.details}</p>

        <div class="messages" id="messages"></div>

        <div class="message-box">
            <input type="text" id="message-input" placeholder="Write a message...">
            <button onclick="sendMessage('${discussion.id}')">Send</button>
        </div>

        <button id="summary-btn" onclick="showSummary('${discussion.id}')">Summary</button>
        <div class="summary-box" id="summary-box" style="display: none;"></div>
    `;

    updateMessages(discussion);
}

function sendMessage(discussionId) {
    let input = document.getElementById("message-input");
    let messageText = input.value.trim();

    if (messageText === "") return;

    let discussion = discussions.find(d => d.id === discussionId);
    discussion.messages.push(messageText);

    input.value = "";
    updateMessages(discussion);
}

function updateMessages(discussion) {
    let messageBox = document.getElementById("messages");
    messageBox.innerHTML = discussion.messages
        .map(msg => `<p>💬 ${msg}</p>`)
        .join("");
}
