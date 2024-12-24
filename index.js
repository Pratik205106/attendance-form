document.getElementById('attendanceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const tableBody = document.getElementById('tableBody');
    const tableContainer = document.getElementById('tableContainer');

    const row = document.createElement('tr');
    Object.values(data).forEach(value => {
        const cell = document.createElement('td');
        cell.textContent = value;
        cell.className = 'border border-gray-300 p-2';
        row.appendChild(cell);
    });

    tableBody.appendChild(row);
    tableContainer.classList.remove('hidden');

    event.target.reset();
});



const STUDENT_INFO_KEY = "student-info"

const showData = () => {
    const data = localStorage.getItem(STUDENT_INFO_KEY)
    const studentData = JSON.parse(data)

    const resultDiv =document.getElementById("result")
    resultDiv.innerHTML = `<h1>${studentData.firstname}</h1>`
}

const submitForm = () => {
    let fstname = document.getElementById("firstName").value 
    let lstname = document.getElementById("lastName").value 
    let rollNumber = document.getElementById("rollNo").value 


    let payload = {
        fstname,
        lstname, 
        rollNumber
    }
    localStorage.setItem(STUDENT_INFO_KEY, JSON.stringify(payload))     
    showData()
}

let timeout = null;
searchInput.addEventListener("input", (event) => {
    console.log('timeout', timeout)
    clearTimeout(timeout)
    timeout = setTime out (() => {
        searchData ()
    })
})





// document.getElementById('attendanceForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const formData = new FormData(event.target);
//     const data = Object.fromEntries(formData.entries());

//     const tableBody = document.getElementById('tableBody');
//     const tableContainer = document.getElementById('tableContainer');

//     const row = document.createElement('tr');
//     Object.values(data).forEach(value => {
//         const cell = document.createElement('td');
//         cell.textContent = value;
//         cell.className = 'border border-gray-300 p-2';
//         row.appendChild(cell);
//     });

//     if (tableBody && tableContainer) {
//         tableBody.appendChild(row);
//         tableContainer.classList.remove('hidden');
//     }

//     event.target.reset();
// });

// const STUDENT_INFO_KEY = "student-info";

// const showData = () => {
//     const data = localStorage.getItem(STUDENT_INFO_KEY);
//     const studentData = JSON.parse(data);

//     const resultDiv = document.getElementById("result");
//     if (studentData) {
//         resultDiv.innerHTML = `<h1>${studentData.fstname}</h1>`;
//     } else {
//         resultDiv.innerHTML = `<h1>No student data available</h1>`;
//     }
// };

// const submitForm = () => {
//     let fstname = document.getElementById("firstName").value;
//     let lstname = document.getElementById("lastName").value;  // Corrected ID from "laststName"
//     let rollNumber = document.getElementById("rollNo").value;

//     let payload = {
//         fstname,
//         lstname,
//         rollNumber
//     };
//     localStorage.setItem(STUDENT_INFO_KEY, JSON.stringify(payload));
//     showData();
// };

// const searchInput = document.getElementById("searchInput"); // Make sure this ID exists in HTML
// let timeout = null;

// searchInput.addEventListener("input", (event) => {
//     console.log('timeout', timeout);
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//         searchData();  // Ensure this function is defined elsewhere
//     }, 500);
// });

