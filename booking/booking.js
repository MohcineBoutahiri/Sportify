document.addEventListener("DOMContentLoaded", () => {
    const daysContainer = document.querySelector(".days");
    const currentDateEl = document.querySelector(".current-date");
    const navButtons = document.querySelectorAll(".icons span");
    const fieldList = document.getElementById("field-list");
    const calendarContainer = document.getElementById("calendar-container");
    const timeInput = document.getElementById("time");
    const timeDisplay = document.getElementById("time-display");
    const goToPaymentButton = document.getElementById("go-to-payment"); // The payment button

    let date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth();

    // Sample reservations (this would be replaced with real data)
    const reservations = [
        { field: 'Field 1', date: '2023-03-15', time: '10:00' },
        { field: 'Field 2', date: '2023-03-16', time: '14:00' },
    ];

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Store selected field details
    let selectedField = null;
    
    // Render the calendar based on the current month and year
    const renderCalendar = () => {
        daysContainer.innerHTML = "";
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Add inactive days (days before the first day of the month)
        for (let i = firstDayOfMonth; i > 0; i--) {
            daysContainer.innerHTML += '<li class="inactive"></li>';
        }

        // Add days of the month
        for (let i = 1; i <= lastDateOfMonth; i++) {
            const isToday =
                i === date.getDate() &&
                currentMonth === date.getMonth() &&
                currentYear === date.getFullYear()
                    ? "active"
                    : "";
            const currentDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;

            // Check if the date is reserved or past
            const isReserved = reservations.some(reservation => reservation.date === currentDate);
            const isPast = new Date(currentDate) < date;

            // Add styles based on past or reserved dates
            let dateClass = "";
            if (isPast) dateClass = "past";
            if (isReserved) dateClass = "reserved";

            daysContainer.innerHTML += `<li class="${isToday} ${dateClass}" data-date="${currentDate}">${i}</li>`;
        }

        // Update the current date displayed
        currentDateEl.textContent = `${months[currentMonth]} ${currentYear}`;
    };

    // Navigation buttons functionality
    navButtons.forEach(button => {
        button.addEventListener("click", () => {
            currentMonth += button.id === "prev" ? -1 : 1;

            if (currentMonth < 0 || currentMonth > 11) {
                currentYear += currentMonth < 0 ? -1 : 1;
                currentMonth = (currentMonth + 12) % 12;
            }

            renderCalendar();
        });
    });

    // Show the calendar when a field is selected
    fieldList.addEventListener("click", (event) => {
        const selectedFieldElement = event.target.closest("li");
        if (selectedFieldElement) {
            // Extract field name, price, and location
            const fieldName = selectedFieldElement.querySelector("h3").textContent;
            const price = selectedFieldElement.querySelector("p").textContent;
            const location = selectedFieldElement.querySelectorAll("p")[1].textContent;

            selectedField = { fieldName, price, location };

            // Show the calendar and store the selected field
            calendarContainer.style.visibility = "visible";
            calendarContainer.style.opacity = 1;
            renderCalendar();
        }
    });

    // Handle day selection
    daysContainer.addEventListener('click', (event) => {
        if (event.target.matches("li:not(.inactive)")) {
            document.querySelectorAll('.days li').forEach(day => day.classList.remove("active"));
            event.target.classList.add("active");
            checkDateTimeSelection();
        }
    });

    // Handle time selection
    timeInput.addEventListener('input', function () {
        const time = this.value;
        timeDisplay.textContent = time ? time : 'None';
        checkDateTimeSelection();
    });

    // Check if a valid date and time are selected
    const checkDateTimeSelection = () => {
        const selectedDate = document.querySelector('.days li.active');
        const time = timeInput.value;

        if (selectedDate && time && selectedField) {
            const selectedDateTime = `${selectedDate.getAttribute('data-date')} ${time}`;

            // Save booking details to localStorage
            const bookingDetails = {
                field: selectedField.fieldName,
                price: selectedField.price,
                location: selectedField.location,
                date: selectedDate.getAttribute('data-date'),
                time: time
            };

            localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

            // Check if this slot is reserved
            const isReserved = reservations.some(reservation => reservation.date + ' ' + reservation.time === selectedDateTime);
            if (!isReserved) {
                goToPaymentButton.style.display = "block";
            } else {
                goToPaymentButton.style.display = "none";
            }
        } else {
            goToPaymentButton.style.display = "none";
        }
    };

    // Initialize the calendar
    renderCalendar();
});
