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

//     tableBody.appendChild(row);
//     tableContainer.classList.remove('hidden');

//     event.target.reset();
// });



// const STUDENT_INFO_KEY = "student-info"

// const showData = () => {
//     const data = localStorage.getItem(STUDENT_INFO_KEY)
//     const studentData = JSON.parse(data)

//     const resultDiv =document.getElementById("result")
//     resultDiv.innerHTML = `<h1>${studentData.firstname}</h1>`
// }

// const submitForm = () => {
//     let firstname = document.getElementById("firstName").value 
//     let laststname = document.getElementById("laststName").value 
//     let rollNumber = document.getElementById("rollNumber").value 


//     let payload = {
//         firstName,
//         lastName, 
//         rollNumber
//     }
//     localStorage.setItem(STUDENT_INFO_KEY, JSON.stringify(payload))
//     showData()
// }


const submitForm = () => {
        let firstname = document.getElementById("firstName").value 
         let laststname = document.getElementById("laststName").value 
         let rollNumber = document.getElementById("rollNumber").value 

         let payload ={
            firstname,
            laststname,
            rollNumber
         }
         localStorage.setItem("student-info", JSON.stringify(payload))
}
