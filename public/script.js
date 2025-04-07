// script.js

// Shared Functions
async function getSchedules() {
    try {
        const response = await fetch('/api/schedules');
        if (!response.ok) throw new Error('Failed to fetch schedules');
        return await response.json();
    } catch (e) {
        console.error('Error fetching schedules:', e);
        return [];
    }
}

async function saveSchedule(schedule) {
    try {
        const response = await fetch('/api/schedules', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(schedule)
        });
        if (!response.ok) throw new Error('Failed to save schedule');
        return await response.json();
    } catch (e) {
        console.error('Error saving schedule:', e);
        throw e;
    }
}

async function deleteSchedule(id) {
    try {
        const response = await fetch(`/api/schedules/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete schedule');
    } catch (e) {
        console.error('Error deleting schedule:', e);
        throw e;
    }
}

function isTimeSlotTaken(startTime, endTime, day, schedules) {
    return schedules.some(s => {
        const sStart = new Date(`2000-01-01T${s.startTime}`);
        const sEnd = new Date(`2000-01-01T${s.endTime}`);
        const newStart = new Date(`2000-01-01T${startTime}`);
        const newEnd = new Date(`2000-01-01T${endTime}`);
        return s.day === day && (
            (newStart >= sStart && newStart < sEnd) ||
            (newEnd > sStart && newEnd <= sEnd) ||
            (newStart <= sStart && newEnd >= sEnd)
        );
    });
}

// Index.html Functions
async function addSchedule() {
    const day = document.getElementById('day').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const className = document.getElementById('className').value;
    const subject = document.getElementById('subject').value;
    const teacher = document.getElementById('teacher').value;

    if (!day || !startTime || !endTime || !className || !subject || !teacher) {
        alert('Please fill all fields!');
        return;
    }

    if (startTime >= endTime) {
        alert('End time must be after start time!');
        return;
    }

    const schedules = await getSchedules();
    if (isTimeSlotTaken(startTime, endTime, day, schedules)) {
        alert('This time slot overlaps with an existing schedule!');
        return;
    }

    try {
        await saveSchedule({ day, startTime, endTime, className, subject, teacher });
        alert('Schedule added successfully!');
        document.querySelectorAll('.input-field').forEach(input => input.value = '');
        showSchedules();
    } catch (e) {
        alert('Failed to add schedule. Check console for details.');
    }
}

async function showSchedules() {
    const schedules = await getSchedules();
    const notesContainer = document.getElementById('notes');
    if (!notesContainer) return;

    notesContainer.innerHTML = schedules.length === 0 
        ? '<p class="empty-msg">No schedules yet. Add one above!</p>'
        : schedules.map(s => `
            <div class="card">
                <h3>${s.startTime} - ${s.endTime} (${s.className})</h3>
                <p>${s.day} | ${s.subject} | 👩‍🏫 ${s.teacher}</p>
                <button class="deleteBtn" data-id="${s._id}">🗑️ Delete</button>
            </div>
        `).join('');

    // Add event listeners to delete buttons
    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', async () => {
            const id = button.getAttribute('data-id');
            try {
                await deleteSchedule(id);
                alert('Schedule deleted!');
                showSchedules();
            } catch (e) {
                alert('Failed to delete schedule.');
            }
        });
    });
}

async function searchSchedules() {
    const searchTxt = document.getElementById('searchTxt').value.toLowerCase().trim();
    const schedules = await getSchedules();
    const notesContainer = document.getElementById('notes');
    if (!notesContainer) return;

    if (!searchTxt) {
        showSchedules();
        return;
    }

    const filtered = schedules.filter(s => 
        s.className.toLowerCase().includes(searchTxt) || 
        s.subject.toLowerCase().includes(searchTxt) || 
        s.teacher.toLowerCase().includes(searchTxt)
    );

    notesContainer.innerHTML = filtered.length === 0 
        ? '<p class="empty-msg">No matching schedules found!</p>'
        : filtered.map(s => `
            <div class="card">
                <h3>${s.startTime} - ${s.endTime} (${s.className})</h3>
                <p>${s.day} | ${s.subject} | 👩‍🏫 ${s.teacher}</p>
                <button class="deleteBtn" data-id="${s._id}">🗑️ Delete</button>
            </div>
        `).join('');

    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', async () => {
            const id = button.getAttribute('data-id');
            try {
                await deleteSchedule(id);
                alert('Schedule deleted!');
                showSchedules();
            } catch (e) {
                alert('Failed to delete schedule.');
            }
        });
    });
}

function exportSchedule() {
    getSchedules().then(schedules => {
        const blob = new Blob([JSON.stringify(schedules, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'schedules.json';
        a.click();
        URL.revokeObjectURL(url);
    });
}

function importSchedule(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async e => {
        try {
            const imported = JSON.parse(e.target.result);
            const currentSchedules = await getSchedules();
            const conflicts = imported.some(s => isTimeSlotTaken(s.startTime, s.endTime, s.day, currentSchedules));
            if (conflicts) {
                alert('Import failed: Conflicts with existing time slots!');
                return;
            }
            for (const s of imported) {
                await saveSchedule({
                    day: s.day,
                    startTime: s.startTime,
                    endTime: s.endTime,
                    className: s.className,
                    subject: s.subject,
                    teacher: s.teacher
                });
            }
            alert('Schedules imported successfully!');
            showSchedules();
        } catch (error) {
            alert('Error importing schedules: Invalid file format');
        }
    };
    reader.readAsText(file);
}

// Timetable.html Functions
async function renderTable() {
    const classFilter = document.getElementById('classFilter');
    const dayFilter = document.getElementById('dayFilter');
    const tableSection = document.getElementById('tableSection');
    if (!tableSection) return;

    const schedules = await getSchedules();
    const selectedClass = classFilter.value;
    const selectedDay = dayFilter.value;
    const filtered = schedules.filter(s => 
        (!selectedClass || s.className === selectedClass) && 
        (!selectedDay || s.day === selectedDay)
    );

    tableSection.innerHTML = filtered.length === 0 
        ? '<div class="empty-msg">No schedules match these filters!</div>'
        : `
            <table id="timetable">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Day</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Subject</th>
                        <th>Teacher</th>
                    </tr>
                </thead>
                <tbody>
                    ${filtered.map(s => `
                        <tr>
                            <td>${s.className || 'N/A'}</td>
                            <td>${s.day || 'N/A'}</td>
                            <td>${s.startTime || 'N/A'}</td>
                            <td>${s.endTime || 'N/A'}</td>
                            <td>${s.subject || 'N/A'}</td>
                            <td>${s.teacher || 'N/A'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
}

function downloadPDF() {
    const element = document.getElementById('timetable');
    if (!element) {
        alert('No timetable available to download!');
        return;
    }

    html2pdf()
        .set({
            margin: 1,
            filename: 'timetable.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .from(element)
        .save();
}

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
    if (document.getElementById('notes')) { // index.html
        await showSchedules();
        document.getElementById('searchTxt').addEventListener('input', searchSchedules);
        document.getElementById('addScheduleBtn').addEventListener('click', addSchedule);
        document.getElementById('exportBtn').addEventListener('click', exportSchedule);
        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('importFile').click();
        });
        document.getElementById('importFile').addEventListener('change', importSchedule);
    } else if (document.getElementById('tableSection')) { // timetable.html
        const classFilter = document.getElementById('classFilter');
        const dayFilter = document.getElementById('dayFilter');
        const schedules = await getSchedules();
        
        const uniqueClasses = [...new Set(schedules.map(s => s.className))];
        uniqueClasses.forEach(cls => {
            const option = document.createElement('option');
            option.value = cls;
            option.textContent = cls;
            classFilter.appendChild(option);
        });

        classFilter.addEventListener('change', renderTable);
        dayFilter.addEventListener('change', renderTable);
        document.getElementById('downloadPdfBtn').addEventListener('click', downloadPDF);
        await renderTable();
    }
});