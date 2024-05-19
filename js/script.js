// Main Variables
let getBtn = document.querySelector(".get-btn");
let showData = document.querySelector(".show-data");
let input = document.querySelector(".get-repos input");
let error = document.querySelector(".alert");

// Event listener to trigger fetching repos when the button is clicked
getBtn.addEventListener('click', function(event) {
    getRepos();
    event.preventDefault(); // Prevent the default form submission
});

// Event listener to hide the alert when typing starts
input.addEventListener('input', function() {
    if (error) {
        error.style.display = "none";
    }
});


// Get repos function 
function getRepos() {
    if (input.value === "") { // If value is empty
        error.style.display="block";
      
    } else {
        fetch(`https://api.github.com/users/${input.value}/repos`)
        .then((response) => response.json())
        .then((repos) => {
            // Empty the container 
            showData.innerHTML = "";

            // Loop on repos
            repos.forEach(repo => {
                // Create main div element 
                let mainDiv = document.createElement("div");
                mainDiv.className = "repo-box";

              
              // Create Repo Name Paragraph Element
            let repoNameParagraph = document.createElement("p");
            repoNameParagraph.className="tittle";
            // Create Repo Name Text Node
            let repoNameText = document.createTextNode(repo.name);

            // Append Repo Name Text Node to Repo Name Paragraph Element
            repoNameParagraph.appendChild(repoNameText);


            // Append Repo Name Paragraph to Main Div
            mainDiv.appendChild(repoNameParagraph);


                

                // Create a container for the URL and stars
                let content = document.createElement("div");
                content.className = 'content';

                // Create repo URL anchor
                let theUrl = document.createElement('a');
                theUrl.className = 'repo-link';
                theUrl.href = `https://github.com/${input.value}/${repo.name}`;
                theUrl.setAttribute("target", "_blank");
              

                // Create Font Awesome eye icon
                let eyeIcon = document.createElement("i");
                eyeIcon.className = 'fa-regular fa-eye';
                
                // Append the eye icon to the anchor tag
                theUrl.insertBefore(eyeIcon, theUrl.firstChild);

                // Append the URL anchor to the content div
                content.appendChild(theUrl);

                // Create stars count span
                let starsSpan = document.createElement("span");
                starsSpan.className = 'repo-stars';

                // Create Font Awesome star icon
                let starIcon = document.createElement("i");
                starIcon.className = 'fa-regular fa-star';

                // Create the stars count text
                let starsText = document.createTextNode(`  ${repo.stargazers_count}`);

                // Append the icon and the stars count text to the stars span
                starsSpan.appendChild(starIcon);
                starsSpan.appendChild(starsText);

                // Append the stars span to the content div
                content.appendChild(starsSpan);

               // Create the <p> element for the date
            let dateText = document.createElement("p");

            // Create a text node containing the date
            let date = document.createTextNode(repo.updated_at);


                // Append the content div to the main div
                mainDiv.appendChild(content);

                // Append main div to container 
                showData.appendChild(mainDiv);
            });

            input.value = ""; // Clear input value after fetching repos
        })
        
    }
}
