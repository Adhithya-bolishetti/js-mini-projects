let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

const jobForm = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");
const filterStatus = document.getElementById("filterStatus");
const searchInput = document.getElementById("searchInput");

const company = document.getElementById("company");
const role = document.getElementById("role");
const locationInput = document.getElementById("location");
const dateInput = document.getElementById("date");
const resume = document.getElementById("resume");
const status = document.getElementById("status");


function renderJobs() {
    jobList.innerHTML = "";

    let filteredJobs = jobs.filter(job => {
        const statusMatch = filterStatus.value === "all" || job.status === filterStatus.value;

        const searchMatch = job.company.toLowerCase().includes(searchInput.value.toLowerCase()) ||
                            job.role.toLowerCase().includes(searchInput.value.toLowerCase());

        return statusMatch && searchMatch;
    });

    filteredJobs.forEach(job => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${job.company}</td>
            <td>${job.role}</td>
            <td>${job.location}</td>
            <td>${job.date}</td>
            <td>${job.resume}</td>
            <td><span class="status ${job.status}">${job.status}</span></td>
            <td><button onclick="deleteJob(${job.id})">Delete</button></td>`;
            jobList.appendChild(tr);
    });
}

jobForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const newJob = {
        id: Date.now(),
        company: company.value,
        role: role.value,
        location: locationInput.value,
        date: dateInput.value,
        resume: resume.files[0]?.name || "No Resume",
        status: status.value
    };

    jobs.push(newJob);

    localStorage.setItem("jobs", JSON.stringify(jobs));

    jobForm.reset();
    renderJobs();
});

function deleteJob(id) {
    jobs = jobs.filter(job => job.id !== id);
    localStorage.setItem("jobs", JSON.stringify(jobs));
    renderJobs();
}

filterStatus.addEventListener("change", renderJobs);
searchInput.addEventListener("input", renderJobs);

renderJobs();