document.addEventListener("DOMContentLoaded", () => {
    const daysContainer = document.querySelector(".days");
    const currentDateEl = document.querySelector(".current-date");
    const navButtons = document.querySelectorAll(".icons span");
    const fieldList = document.getElementById("field-list");
    const calendarContainer = document.getElementById("calendar-container");
    const timeInput = document.getElementById("time");
    const reservationStatus = document.getElementById("reservation-status");
    const paymentButton = document.getElementById("go-to-payment");

    let date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth();

    const reservations = [
        { field: 'Field 1', date: '2023-03-15', time: '10:00' },
        { field: 'Field 2', date: '2023-03-16', time: '14:00' },
    ];

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Render calendar
    const renderCalendar = () => {
        daysContainer.innerHTML = "";
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let i = firstDayOfMonth; i > 0; i--) {
            daysContainer.innerHTML += '<li class="inactive"></li>';
        }

        for (let i = 1; i <= lastDateOfMonth; i++) {
            const isToday =
                i === date.getDate() &&
                currentMonth === date.getMonth() &&
                currentYear === date.getFullYear()
                    ? "active"
                    : "";
            const currentDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;

            const isReserved = reservations.some(reservation => reservation.date === currentDate);
            const isPast = new Date(currentDate) < date;

            let dateClass = "";
            if (isPast) dateClass = "past";
            if (isReserved) dateClass = "reserved";

            daysContainer.innerHTML += `<li class="${isToday} ${dateClass}" data-date="${currentDate}">${i}</li>`;
        }

        currentDateEl.textContent = `${months[currentMonth]} ${currentYear}`;
    };

    // Navigation buttons for the calendar
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

    // Show the calendar when a field is clicked
    fieldList.addEventListener("click", (event) => {
        const selectedField = event.target.closest("li");
        if (selectedField) {
            calendarContainer.style.display = "block"; // Show the calendar
            renderCalendar();
        }
    });

    // Check if selected date/time is available for reservation
    const checkDateTimeSelection = () => {
        const selectedDate = document.querySelector('.days li.active'); // Get the active date
        const time = timeInput.value; // Get the selected time

        if (selectedDate && time) {
            const selectedDateTime = `${selectedDate.getAttribute('data-date')} ${time}`;
            const isReserved = reservations.some(reservation => 
                reservation.date + ' ' + reservation.time === selectedDateTime
            );

            if (isReserved) {
                paymentButton.style.display = "none"; // Hide the button if the slot is reserved
                reservationStatus.textContent = "This time slot is already reserved!";
                reservationStatus.classList.add('reserved');
            } else {
                paymentButton.style.display = "block"; // Show the button if available
                reservationStatus.textContent = ""; // Clear reservation status
                reservationStatus.classList.remove('reserved');
            }
        } else {
            paymentButton.style.display = "none"; // Hide the button if date/time is not selected
            reservationStatus.textContent = ""; // Clear reservation status
            reservationStatus.classList.remove('reserved');
        }
    };

    // Add event listener for time input
    timeInput.addEventListener('input', checkDateTimeSelection);

    // Handle date selection
    daysContainer.addEventListener('click', (event) => {
        if (event.target.matches("li:not(.inactive)")) {
            document.querySelectorAll('.days li').forEach(day => day.classList.remove("active"));
            event.target.classList.add("active");
            checkDateTimeSelection(); // Check availability after selecting the date
        }
    });

    renderCalendar();
});
