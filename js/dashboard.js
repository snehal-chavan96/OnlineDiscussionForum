document.addEventListener("DOMContentLoaded", function () {
    // Search button functionality
    document.getElementById("search-btn").addEventListener("click", function () {
        let query = document.getElementById("search-bar").value.toLowerCase();
        alert("Searching for: " + query);
    });

    // Dummy discussions data
    let discussions = [
        { user: "Alice", topic: "How to center a div in CSS?" },
        { user: "Bob", topic: "Best resources to learn Python?" },
        { user: "Charlie", topic: "How to deploy a Flask app?" }
    ];

    let discussionsContainer = document.querySelector(".discussion-box");
    discussionsContainer.innerHTML = "";
    discussions.forEach(discussion => {
        let div = document.createElement("div");
        div.innerHTML = `<strong>${discussion.user}</strong>: ${discussion.topic}`;
        div.style.padding = "10px";
        div.style.borderBottom = "1px solid #444";
        discussionsContainer.appendChild(div);
    });

    // Dummy leaderboard data
    let leaderboardData = [
        { user: "Stinger", score: 408 },
        { user: "Goku99", score: 234 },
        { user: "MrBlack2", score: 133 },
        { user: "Sigahana", score: 130 }
    ];

    let leaderboardContainer = document.querySelector(".leaderboard-box");
    leaderboardContainer.innerHTML = "";
    leaderboardData.forEach((entry, index) => {
        let div = document.createElement("div");
        div.innerHTML = `#${index + 1} <strong>${entry.user}</strong> - ${entry.score} Points`;
        div.style.padding = "10px";
        div.style.borderBottom = "1px solid #444";
        leaderboardContainer.appendChild(div);
    });
});
