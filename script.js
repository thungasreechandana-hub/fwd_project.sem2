function runAnalysis() {
    const fileInput = document.getElementById('hidden-file-input');
    
    // 1. Check if a file is actually uploaded
    if (!fileInput.files.length) {
        alert("Please upload a resume first, bro!");
        return;
    }

    // 2. Calculate a Dynamic Score
    // Base score for having a file
    let finalScore = 40; 
    
    // Points for Experience
    const expValue = document.getElementById('experience').value;
    if (expValue === "Junior") finalScore += 10;
    if (expValue === "Senior") finalScore += 20;

    // Points for Technical Skills (Each checkbox is worth 5 points)
    const skillsChecked = document.querySelectorAll('.options-grid input[type="checkbox"]:checked');
    finalScore += (skillsChecked.length * 5);

    // Points for Certifications (Each checkbox is worth 5 points)
    // Capping total score at 100%
    if (finalScore > 100) finalScore = 100;

    // 3. Update Analysis Details in UI
    document.getElementById('res-exp').innerText = expValue;
    
    // Collect the names of checked skills to display them
    let skillsList = [];
    skillsChecked.forEach(skill => {
        skillsList.push(skill.parentElement.innerText.trim());
    });
    // If no skills checked, show "None detected"
    const skillsDisplay = skillsList.length > 0 ? skillsList.join(", ") : "None detected";
    
    // Note: You might need to add id="res-skills" to a <span> in your HTML to see this line work
    const resSkillsElement = document.getElementById('res-skills');
    if (resSkillsElement) {
        resSkillsElement.innerText = skillsDisplay;
    }

    // 4. Score Animation
    let currentScore = 0;
    document.getElementById('score-val').innerText = "0%";
    
    const interval = setInterval(() => {
        if (currentScore >= finalScore) {
            clearInterval(interval);
        } else {
            currentScore++;
            document.getElementById('score-val').innerText = currentScore + "%";
            
            // Change color based on score strength
            const scoreDisplay = document.getElementById('score-val');
            if (currentScore < 50) scoreDisplay.style.color = "#ff6b6b";
            else if (currentScore < 80) scoreDisplay.style.color = "#845ef7";
            else scoreDisplay.style.color = "#2ecc71";
        }
    }, 15);

    // 5. Populate Result Lists
    document.getElementById('suggestions-list').innerHTML = `
        <div class="list-item suggestion-item">✔ ${skillsList.length < 3 ? "Add more technical keywords" : "Technical keywords look good"}</div>
        <div class="list-item suggestion-item">✔ Ensure project links are clickable</div>
        <div class="list-item suggestion-item">✔ Formatting is optimized for ATS</div>`;

    document.getElementById('jobs-list').innerHTML = `
        <div class="list-item job-item">• ${skillsList.includes("Java") ? "Backend Developer" : "Software Engineer"}</div>
        <div class="list-item job-item">• ${skillsList.includes("HTML") ? "Frontend Developer" : "Web Analyst"}</div>`;

    document.getElementById('prep-list').innerHTML = `
        <div class="list-item prep-item">• Data Structures & Algorithms</div>
        <div class="list-item prep-item">• System Design Basics</div>
        <div class="list-item prep-item">• Behavioral Questions</div>`;

    // 6. Scroll Down to results
    document.getElementById('results-area').scrollIntoView({ behavior: 'smooth' });
}