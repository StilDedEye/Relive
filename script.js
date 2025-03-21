let appTitle = "Relive";
let iForTitleTypingAnimation = 0;
let speedForTitle = 100; 

let appSubtitle = "Yesterday once more"
let iForSubtitleTypingAnimation = 0;
let speedForSubtitle = 25; 


window.onload = function() {
    titleTypingAnimation();
    subtitleTypingAnimation();
}

// region TYPING TEXT ANIMATIONS
function titleTypingAnimation () {
    if (iForTitleTypingAnimation < appTitle.length) {
        let tempTitle = document.getElementById("appTitle").innerHTML;
        tempTitle = tempTitle.substring(0, tempTitle.length-1);

        document.getElementById("appTitle").innerHTML = tempTitle;
        document.getElementById("appTitle").innerHTML += appTitle.charAt(iForTitleTypingAnimation);
        document.getElementById("appTitle").innerHTML += "|";

        iForTitleTypingAnimation++;
        setTimeout(titleTypingAnimation, speedForTitle);
    } else
        document.getElementById("appTitle").innerHTML = document.getElementById("appTitle").innerHTML.substring(0, document.getElementById("appTitle").innerHTML.length-1);
}
function subtitleTypingAnimation () {
    if (iForSubtitleTypingAnimation < appSubtitle.length) {
        let tempSubtitle = document.getElementById("appSubtitle").innerHTML;
        tempSubtitle = tempSubtitle.substring(0, tempSubtitle.length-1);

        document.getElementById("appSubtitle").innerHTML = tempSubtitle;
        document.getElementById("appSubtitle").innerHTML += appSubtitle.charAt(iForSubtitleTypingAnimation);
        document.getElementById("appSubtitle").innerHTML += "|";
        iForSubtitleTypingAnimation++;
        setTimeout(subtitleTypingAnimation, speedForSubtitle);
    } else 
        document.getElementById("appSubtitle").innerHTML = document.getElementById("appSubtitle").innerHTML.substring(0, document.getElementById("appSubtitle").innerHTML.length-1);
}
// endregion


document.addEventListener("DOMContentLoaded", () => {
    const image = document.querySelector(".appTitle");
    
    window.addEventListener("scroll", () => {
        let scrollPos = window.scrollY;
       // image.style.transform = `rotate(${scrollPos * 0.2}deg)`;
    });

});


async function getLatestReleases() {
    console.log("CIA");
    const owner = "stilDedEye";
    const repo = "Relive";
    const url = `https://api.github.com/repos/${owner}/${repo}/releases`;

    try {
        const response = await fetch(url);
        const releases = await response.json();
        
        const container = document.getElementById("release-container");

        if (Array.isArray(releases)) {
            releases.forEach(release => {
                const card = document.createElement("div");
                card.className = "release-card";
                card.innerHTML = `
                    <h3>${release.name || release.tag_name}</h3>
                    <p>${release.body ? release.body.substring(0, 100) + "..." : "No description available"}</p>
                    <a href="${release.html_url}" target="_blank">View Release</a>
                `;
                container.appendChild(card);
            });
        }
    } catch (error) {
        console.error("Errore nel recupero delle release:", error);
    }
}

getLatestReleases();
