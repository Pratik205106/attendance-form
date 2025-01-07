// Utility function to retrieve and store data in localStorage
const getAttendanceData = () => JSON.parse(localStorage.getItem("attendanceData")) || [];
const saveAttendanceData = (data) => localStorage.setItem("attendanceData", JSON.stringify(data));

// Show popup message
function showPopupMessage(message, type = "info") {
    const popupContainer = document.createElement("div");
    popupContainer.className = `fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center`;

    const popup = document.createElement("div");
    popup.className = `bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center`;

    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messageElement.className = `text-lg ${type === "error" ? "text-red-600" : "text-green-600"}`;

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.className = "mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none";
    closeButton.addEventListener("click", () => {
        document.body.removeChild(popupContainer);
    });

    popup.appendChild(messageElement);
    popup.appendChild(closeButton);
    popupContainer.appendChild(popup);
    document.body.appendChild(popupContainer);
}

// Form submission handler
function submitForm(event) {
    event.preventDefault();

    const form = document.getElementById("attendanceForm");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Validate Mobile Number
    if (!/^\d{10}$/.test(data.mobileNumber)) {
        showPopupMessage("Please enter a valid 10-digit mobile number.", "error");
        return;
    }

    const currentIndex = form.getAttribute("data-index");
    const attendanceData = getAttendanceData();

    if (currentIndex !== null) {
        // Update existing data
        attendanceData[currentIndex] = data;
        showPopupMessage("Data updated successfully!", "success");
        form.removeAttribute("data-index");
    } else {
        // Add new data
        attendanceData.push(data);
        showPopupMessage("Form submitted and saved in localStorage!", "success");
    }

    saveAttendanceData(attendanceData);
    form.reset();
    displayData();
}

// Display data in the table
function displayData() {
    const tableBody = document.getElementById("tableBody");
    const attendanceData = getAttendanceData();
    tableBody.innerHTML = "";

    attendanceData.forEach((data, index) => {
        const row = document.createElement("tr");

        // Create table cells for each data field
        Object.keys(data).forEach(key => {
            const cell = document.createElement("td");
            cell.textContent = data[key];
            cell.className = "border px-4 py-2 text-gray-800";
            row.appendChild(cell);
        });

        // Edit button cell
        const editCell = document.createElement("td");
        editCell.appendChild(createActionButton("Edit", "bg-yellow-500", () => editData(index)));
        row.appendChild(editCell);

        // Delete button cell
        const deleteCell = document.createElement("td");
        deleteCell.appendChild(createActionButton("Delete", "bg-red-500", () => deleteData(index)));
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    });
}

// Create action buttons
function createActionButton(text, classes, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = `${classes} text-white px-4 py-2 rounded hover:opacity-80 focus:outline-none`;
    button.style.width = "100px"; // Ensure consistent size
    button.addEventListener("click", onClick);
    return button;
}

// Edit data
function editData(index) {
    const attendanceData = getAttendanceData();
    const data = attendanceData[index];

    if (data) {
        const form = document.getElementById("attendanceForm");
        Object.keys(data).forEach(key => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) input.value = data[key];
        });
        form.setAttribute("data-index", index);
    }
}

// Delete data
function deleteData(index) {
    const attendanceData = getAttendanceData();
    if (confirm("Are you sure you want to delete this record?")) {
        attendanceData.splice(index, 1);
        saveAttendanceData(attendanceData);
        showPopupMessage("Data deleted successfully!", "success");
        displayData();
    }
}

// Debounce function
function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

// Search data
function setupSearchHandler() {
    const searchInput = document.getElementById("searchData");
    searchInput.addEventListener(
        "input",
        debounce(() => {
            const query = searchInput.value.toLowerCase();
            const rows = document.querySelectorAll("#tableBody tr");

            rows.forEach(row => {
                const matches = Array.from(row.children).some(cell => cell.textContent.toLowerCase().includes(query));
                row.style.display = matches ? "" : "none";
            });
        }, 300)
    );
}

// Initialize
window.onload = () => {
    displayData();
    setupSearchHandler();
};

