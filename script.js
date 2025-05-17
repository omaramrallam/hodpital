// تسجيل الدخول
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const userType = document.getElementById('userType').value;
    const userId = document.getElementById('userId').value;

    localStorage.setItem('userType', userType);
    localStorage.setItem('userId', userId);

    if (userType === 'patient') {
        window.location.href = 'patient.html';
    } else {
        window.location.href = 'doctor.html';
    }
});

// إضافة قياسات (واجهة المريض)
document.getElementById('healthForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const pulse = parseInt(document.getElementById('pulse').value);
    const oxygen = parseInt(document.getElementById('oxygen').value);
    const temp = parseFloat(document.getElementById('temp').value);
    const patientId = localStorage.getItem('userId');
    const timestamp = new Date().toLocaleString('ar-EG');

    // التحقق من صحة القياسات
    if (pulse < 30 || pulse > 200 || oxygen < 70 || oxygen > 100 || temp < 35 || temp > 42) {
        alert('يرجى إدخال قيم ضمن النطاقات الطبيعية!');
        return;
    }

    const measurement = { patientId, timestamp, pulse, oxygen, temp };
    let measurements = JSON.parse(localStorage.getItem('measurements')) || [];
    measurements.push(measurement);
    localStorage.setItem('measurements', JSON.stringify(measurements));

    displayPatientMeasurements();
    this.reset();
});

// عرض قياسات المريض
function displayPatientMeasurements() {
    const dataBody = document.getElementById('dataBody');
    const patientId = localStorage.getItem('userId');
    dataBody.innerHTML = '';

    const measurements = JSON.parse(localStorage.getItem('measurements')) || [];
    measurements
        .filter(m => m.patientId === patientId)
        .forEach(measurement => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${measurement.timestamp}</td>
                <td>${measurement.pulse}</td>
                <td>${measurement.oxygen}</td>
                <td>${measurement.temp}</td>
            `;
            dataBody.appendChild(row);
        });

    document.getElementById('patientId').textContent = patientId;
}

// عرض قياسات المرضى (واجهة الطبيب)
function displayDoctorMeasurements(filterPatientId = '') {
    const dataBody = document.getElementById('dataBody');
    dataBody.innerHTML = '';

    const measurements = JSON.parse(localStorage.getItem('measurements')) || [];
    measurements
        .filter(m => !filterPatientId || m.patientId === filterPatientId)
        .forEach(measurement => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${measurement.patientId}</td>
                <td>${measurement.timestamp}</td>
                <td>${measurement.pulse}</td>
                <td>${measurement.oxygen}</td>
                <td>${measurement.temp}</td>
            `;
            dataBody.appendChild(row);
        });

    document.getElementById('doctorId').textContent = localStorage.getItem('userId');
}

// تصفية القياسات (واجهة الطبيب)
function filterMeasurements() {
    const patientId = document.getElementById('patientFilter').value;
    displayDoctorMeasurements(patientId);
}

// تسجيل الخروج
function logout() {
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    window.location.href = 'index.html';
}

// تهيئة الصفحات
