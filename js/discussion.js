document.addEventListener("DOMContentLoaded", function () {
    let discussions = [
        {
            id: "discussion1",
            title: "Spotify Clone Error",
            user: "Saloni Gumani",
            time: "12d ago",
            details: "Saloni Gumani: Facing an issue with cards-container (display: flex; flex-wrap: wrap;).",
            messages: []
        },
        {
            id: "discussion2",
            title: "Why not print table of 5*10=50?",
            user: "Aditya",
            time: "12d ago",
            details: `Aditya: let n = parseInt(prompt("Enter number")); for(let i=1; i<=10; i++) console.log(n*i);`,
            messages: []
        },
        {
            id: "discussion3",
            title: "Issue in creating cards using CSS",
            user: "Harshal",
            time: "7d ago",
            details: "Harshal: I am trying to create cards using CSS but stuck with flexbox issues.",
            messages: []
        },
        {
            id: "discussion4",
            title: "Related to JS",
            user: "Aalok",
            time: "10d ago",
            details: "Aalok: Need help understanding symbol type and closures in JavaScript.",
            messages: []
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
