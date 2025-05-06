// Data
const staffData = {
    "Guru Besar": "Puan Aida Laila Aswati",
    "Penolong Kanan": "Puan Nur Ainu Shahadah",
    "Guru Data": "Puan Rosmanina",
    "Guru PA Sistem": "Puan Rosmanina",
    "Guru Kokurikulum": "Encik Muhamad Mulhim",
    "Setiausaha Kurikulum": "Puan Nur Dalila",
    "Guru Kebersihan & Keceriaan": "Puan Nur Asmalina",
    "Guru Disiplin": "Encik Wan Muhamad Sodiqin",
    "Guru Kantin": "Encik Amirul Hishamuddin",
    "Guru Bilik Buku & Stor": "Encik Muhamad Shahirul Hamid",
    "Guru": "Encik Ahmad Taqiyuddin",
    "Guru Lain": "Puan Nur Ainun Shahadah"
};

const kelasData = {
    "1A": "Puan Nur Dalila",
    "1B": "Puan Nor Asmalina",
    "Tahun 2": "Encik Wan Muhamad Sodiqin",
    "3A": "Encik Mohamad Syahirul Hamzi",
    "3B": "Encik Ahmad Taqiyuddin",
    "4A": "Puan Aida Laila Aswati",
    "4B": "Encik Muhamad Mulhim",
    "Tahun 5": "Puan Rosmanina",
    "6A": "Encik Amirul Hishamudin",
    "6B": "Puan Nur Ainun Shahadah"
};

const subjects = [
    "Sirah",
    "Tauhid",
    "Akhlak",
    "Jawi dan Khat",
    "Tilawah Al-Quran",
    "Amali Solat",
    "Akidah",
    "Ibadah",
    "Adab Islamiah",
    "Hafazan Al-Quran"
];

let events = [];

// Navigation
function showSection(sectionName) {
    const sections = ['staff', 'kelas', 'subjects', 'calendar'];
    sections.forEach(section => {
        const element = document.getElementById(`${section}Section`);
        element.classList.toggle('hidden', section !== sectionName);
    });
}

// Staff Section
function renderStaff() {
    const staffList = document.getElementById('staffList');
    staffList.innerHTML = '';

    Object.entries(staffData).forEach(([role, name]) => {
        const card = document.createElement('div');
        card.className = 'staff-card';
        card.innerHTML = `
            <h3 class="font-semibold text-primary-green">${role}</h3>
            <p class="mt-2 text-gray-700">${name}</p>
        `;
        staffList.appendChild(card);
    });
}

// Kelas Section
function renderKelas() {
    const kelasList = document.getElementById('kelasList');
    kelasList.innerHTML = '';

    Object.entries(kelasData).forEach(([kelas, guru]) => {
        const card = document.createElement('div');
        card.className = 'kelas-card';
        card.innerHTML = `
            <h3 class="font-semibold text-primary-green">${kelas}</h3>
            <p class="mt-2 text-gray-700 hidden">Guru Kelas: ${guru}</p>
        `;
        card.addEventListener('click', () => {
            const guruInfo = card.querySelector('p');
            guruInfo.classList.toggle('hidden');
        });
        kelasList.appendChild(card);
    });
}

// Subjects Section
function renderSubjects() {
    const subjectsList = document.getElementById('subjectsList');
    subjectsList.innerHTML = '';

    subjects.forEach(subject => {
        const card = document.createElement('div');
        card.className = 'subject-card';
        card.innerHTML = `
            <i class="fas fa-book-open text-2xl text-primary-purple mb-2"></i>
            <h3 class="font-semibold">${subject}</h3>
        `;
        subjectsList.appendChild(card);
    });
}

// Calendar Section
let currentDate = new Date();

function showAddEventModal(year, month, date) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h3 class="text-xl font-semibold mb-4 text-primary-green">Tambah Acara</h3>
            <div class="mb-4">
                <label for="eventTitle" class="block text-sm font-medium text-gray-700 mb-1">Tajuk Acara</label>
                <input type="text" id="eventTitle" placeholder="Masukkan tajuk acara" 
                       class="w-full p-2 border rounded focus:ring-2 focus:ring-primary-green focus:border-primary-green">
                <div id="titleError" class="hidden text-red-500 text-sm mt-1">Sila masukkan tajuk acara</div>
            </div>
            <div class="mb-6">
                <label for="eventType" class="block text-sm font-medium text-gray-700 mb-1">Jenis Acara</label>
                <select id="eventType" class="w-full p-2 border rounded focus:ring-2 focus:ring-primary-green focus:border-primary-green">
                    <option value="Akademik">Akademik</option>
                    <option value="Kokurikulum">Kokurikulum</option>
                </select>
            </div>
            <div class="flex justify-end space-x-3">
                <button onclick="this.closest('.fixed').remove()" 
                        class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors duration-200">
                    Batal
                </button>
                <button onclick="validateAndAddEvent(${year}, ${month}, ${date})" 
                        class="px-4 py-2 bg-primary-green text-white rounded hover:bg-light-green transition-colors duration-200">
                    Tambah
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Add input event listener to hide error message when user starts typing
    const titleInput = document.getElementById('eventTitle');
    const titleError = document.getElementById('titleError');
    titleInput.addEventListener('input', () => {
        titleError.classList.add('hidden');
    });
}

function validateAndAddEvent(year, month, date) {
    const title = document.getElementById('eventTitle').value.trim();
    const titleError = document.getElementById('titleError');

    if (!title) {
        titleError.classList.remove('hidden');
        return;
    }

    const type = document.getElementById('eventType').value;
    
    // Add event
    events.push({
        title,
        type,
        date: new Date(year, month, date)
    });
    
    // Store in localStorage
    localStorage.setItem('calendarEvents', JSON.stringify(events));
    
    // Close modal
    document.querySelector('.fixed').remove();
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    successMsg.textContent = 'Acara berjaya ditambah!';
    document.body.appendChild(successMsg);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        successMsg.classList.add('animate-fade-out');
        setTimeout(() => successMsg.remove(), 300);
    }, 3000);
    
    // Re-render calendar
    renderCalendar();
}

function renderCalendar() {
    const calendar = document.getElementById('calendar');
    const currentMonth = document.getElementById('currentMonth');
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    currentMonth.textContent = new Date(year, month).toLocaleDateString('ms-MY', {
        month: 'long',
        year: 'numeric'
    });

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    calendar.innerHTML = `
        <div class="grid grid-cols-7 gap-1">
            ${['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu']
                .map(day => `<div class="p-2 text-center font-semibold text-primary-green">${day}</div>`)
                .join('')}
            ${Array(firstDay.getDay()).fill(0)
                .map(() => '<div class="p-4"></div>')
                .join('')}
            ${Array(lastDay.getDate()).fill(0)
                .map((_, i) => {
                    const date = i + 1;
                    const dateEvents = events.filter(event => {
                        const eventDate = new Date(event.date);
                        return eventDate.getDate() === date && 
                               eventDate.getMonth() === month && 
                               eventDate.getFullYear() === year;
                    });
                    
                    return `
                        <div class="p-2 border text-center hover:bg-gray-50 cursor-pointer relative" 
                             onclick="showAddEventModal(${year}, ${month}, ${date})">
                            <span class="text-gray-700">${date}</span>
                            ${dateEvents.map(event => `
                                <div class="mt-1 text-xs p-1 rounded ${
                                    event.type === 'Akademik' ? 'bg-light-green text-white' : 'bg-light-purple text-white'
                                }">${event.title}</div>
                            `).join('')}
                        </div>
                    `;
                })
                .join('')}
        </div>
    `;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load saved events
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
        events = JSON.parse(savedEvents).map(event => ({
            ...event,
            date: new Date(event.date)
        }));
    }

    // Initialize all sections
    renderStaff();
    renderKelas();
    renderSubjects();
    renderCalendar();

    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Show staff section by default
    showSection('staff');
});
