/* =========================================
   1. DATA STATIS (PRODI, DOSEN, & BERITA)
   ========================================= */
   const dataProdi = {
    'TEKNIK INFORMATIKA': {
        logo: 'logo-ti.png',
        visi: "Menjadi Program Studi unggulan dalam rekayasa perangkat lunak dan kecerdasan buatan nasional.",
        misi: ["Menyelenggarakan pendidikan IT berbasis industri.", "Mengembangkan riset AI yang bermanfaat bagi masyarakat.", "Meningkatkan sertifikasi kompetensi mahasiswa."]
    },
    'SISTEM INFORMASI': {
        logo: 'logo-si.png',
        visi: "Menjadi pusat unggulan tata kelola IT dan wirausaha digital pada tahun 2032.",
        misi: ["Mencetak lulusan yang mahir manajemen data.", "Mengembangkan sistem informasi bisnis kreatif.", "Menumbuhkan jiwa technopreneurship."]
    },
    'DESAIN KOMUNIKASI VISUAL': {
        logo: 'logo-dkv.png',
        visi: "Mewujudkan lulusan kreatif visual berbasis kearifan lokal yang mendunia.",
        misi: ["Eksplorasi desain digital modern.", "Pelestarian budaya lewat karya visual.", "Kolaborasi dengan industri kreatif nasional."]
    },
    'TEKNIK SIPIL': {
        logo: 'logo-ts.png',
        visi: "Menjadi pelopor pembangunan infrastruktur berkelanjutan yang inovatif.",
        misi: ["Pendidikan teknik konstruksi ramah lingkungan.", "Riset material bangunan modern.", "Pengabdian infrastruktur daerah."]
    }
};

const beritaFkom = [
    "🔥 Pendaftaran Mahasiswa Baru FKOM UNIKU 2026 Telah Dibuka!",
    "⭐ Prodi Sistem Informasi Raih Akreditasi UNGGUL.",
    "🚀 FKOM Jalin Kerjasama Teknologi dengan Google Cloud.",
    "📢 Pendaftaran Tracer Study bagi lulusan 2025 dibuka."
];

/* =========================================
   2. STATE & DATABASE GLOBAL
   ========================================= */
let currentProdi = "";
let currentUserRole = ""; // "mahasiswa", "alumni", atau "staff"
let isAlumniAuthenticated = false;
let isStaffAuthenticated = false;

let databaseAlumni = [
    { id: 1, nama: "Budi Santoso", prodi: "SISTEM INFORMASI", tahun: "2024", hp: "08123456789", email: "budi@uniku.ac.id", prestasi: "Lulusan Terbaik", posisi: "Bekerja (Data Analyst)" },
    { id: 2, nama: "Siti Aminah", prodi: "TEKNIK INFORMATIKA", tahun: "2023", hp: "08987654321", email: "siti@uniku.ac.id", prestasi: "Juara Hackathon", posisi: "Wirausaha (Tech Startup)" }
];

const daftarLoker = [
    {
        id: 1,
        posisi: "Fullstack Developer",
        perusahaan: "PT. Global Tech",
        lokasi: "Jakarta (Remote)",
        tipe: "Full-time",
        deadline: "20 Februari 2026",
        deskripsi: "Kami mencari Fullstack Developer yang berpengalaman dengan Stack MERN atau Laravel/Vue untuk membangun platform edukasi terbaru.",
        kualifikasi: ["Lulusan S1 Teknik Informatika/Sistem Informasi", "Menguasai JavaScript (Node.js & React/Vue)", "Memahami RESTful API dan Database SQL/NoSQL"],
        linkLamar: "https://uniku.ac.id"
    },
    {
        id: 2,
        posisi: "Data Analyst",
        perusahaan: "Bank Mandiri",
        lokasi: "Jakarta",
        tipe: "Full-time",
        deadline: "10 Maret 2026",
        deskripsi: "Mengolah dataset besar untuk memberikan insight bisnis bagi departemen perbankan digital.",
        kualifikasi: ["Mahir SQL dan Python/R", "Memahami visualisasi data (Tableau/PowerBI)", "Teliti dan memiliki kemampuan analisis kuat"],
        linkLamar: "https://uniku.ac.id"
    },
    {
        id: 3,
        posisi: "UI/UX Designer",
        perusahaan: "Startup Maju",
        lokasi: "Bandung (Hybrid)",
        tipe: "Remote",
        deadline: "15 Maret 2026",
        deskripsi: "Merancang pengalaman pengguna yang mulus untuk aplikasi mobile e-commerce.",
        kualifikasi: ["Mahir menggunakan Figma", "Memiliki portofolio desain UI/UX yang kuat", "Memahami konsep Design Thinking"],
        linkLamar: "https://uniku.ac.id"
    }
];

// KODE AKSES KHUSUS
const KODE_RAHASIA = {
    STAFF: "FKOMADMIN2025",
    ALUMNI: "ALUMNIFKOM",
    MHS: "MHSFKOM"
};

/* =========================================
   3. FUNGSI NAVIGASI HALAMAN
   ========================================= */
function goToProdi() {
    $('#welcome-page').fadeOut(500, function() {
        $('#prodi-page').removeClass('hidden-section').hide().fadeIn(500);
    });
}

function goToDetailProdi(prodi) {
    currentProdi = prodi;
    $('#title-prodi-detail').text(prodi);
    $('#visi-text').text(dataProdi[prodi].visi);
    
    let misiHtml = "";
    dataProdi[prodi].misi.forEach(m => {
        misiHtml += `<li class="mb-2"><i class="fas fa-check-circle text-primary me-2"></i>${m}</li>`;
    });
    $('#misi-list').html(misiHtml);

    $('#prodi-page').fadeOut(500, function() {
        $('#visi-misi-prodi').removeClass('hidden-section').hide().fadeIn(500);
    });
}

function goToDashboard() {
    const namaProdiTerpilih = currentProdi; 

    $('#main-title-header').text(namaProdiTerpilih); 
    $('#sub-title-header').text("PROGRAM STUDI");    
    $('#nav-prodi-label').text(namaProdiTerpilih);  
   
    let gambarLogo = "logo fkom outline.png"; 
    
    if (namaProdiTerpilih === "TEKNIK INFORMATIKA") {
        gambarLogo = "LOGO TI.png"; 
    } else if (namaProdiTerpilih === "SISTEM INFORMASI") {
        gambarLogo = "LOGO SI.png";
    } else if (namaProdiTerpilih === "DESAIN KOMUNIKASI VISUAL") {
        gambarLogo = "LOGO DKV.png";
    } else if (namaProdiTerpilih === "TEKNIK SIPIL") {
        gambarLogo = "LOGO TS.png";
    }

    $('#logo-prodi-header').attr('src', gambarLogo);

    $('#visi-misi-prodi').fadeOut(500, function() {
        $('#main-dashboard').removeClass('hidden-section').hide().fadeIn(800);
        switchMainTab('home');
        window.scrollTo(0, 0);
    });
}

function backToProdiSelection() {
    $('#main-dashboard, #visi-misi-prodi').fadeOut(500, function() {
        $('#prodi-page').fadeIn();
        window.scrollTo(0, 0);
    });
}

function backToHome() {
    if(confirm("Apakah Anda ingin kembali ke halaman utama?")) {
        location.reload();
    }
}

function switchMainTab(tabName) {
    if (tabName === 'form' && currentUserRole === 'mahasiswa') {
        alert("Mohon maaf, menu 'Isi Data Alumni' hanya tersedia untuk Alumni.");
        return;
    }
    if (tabName === 'form' && !isAlumniAuthenticated && !isStaffAuthenticated) {
        $('#passwordModal').modal('show');
        return;
    }
    executeSwitchTab(tabName);
}

function executeSwitchTab(tabName) {
    $('.nav-role.main-nav').removeClass('active text-dark fw-bold').addClass('text-muted');
    $(`#tab-${tabName}`).addClass('active text-dark fw-bold').removeClass('text-muted');

    $('[id^="subpage-"]').addClass('hidden-section').hide();
    $(`#subpage-${tabName}`).removeClass('hidden-section').stop().fadeIn(400);

    updatePublicAlumniTable();
}
/* =========================================
   4. LOGIKA LOGIN & OTORITAS (AUTH)
   ========================================= */
   function openLoginForm(kategori) {
    const modalTitle = document.querySelector('#passwordModal .modal-title');
    const modalDesc = document.querySelector('#passwordModal .text-muted');
    const emailLabel = document.querySelector('#passwordModal label:nth-of-type(1)');
    const emailInput = document.getElementById('staffEmail');
    const loginBtn = document.querySelector('#passwordModal .btn-warning');

    $('#authError').hide();

    if (kategori === 'Staff') {
        modalTitle.innerHTML = '<i class="fas fa-user-lock me-2"></i>Verifikasi Akses Staff';
        modalDesc.innerText = "Login khusus Staff/Dosen untuk manajemen data penuh.";
        emailLabel.innerText = "EMAIL STAFF";
        emailInput.placeholder = "admin@uniku.ac.id";
        loginBtn.innerHTML = 'MASUK SEBAGAI ADMIN <i class="fas fa-sign-in-alt ms-1"></i>';
        
        loginBtn.onclick = verifyStaffAccess; 
        
    } 
    else if (kategori === 'Mahasiswa') {
        modalTitle.innerHTML = '<i class="fas fa-user-graduate me-2"></i>Login Mahasiswa';
        modalDesc.innerText = "Gunakan NIM Anda untuk mengakses layanan akademik.";
        emailLabel.innerText = "NIM MAHASISWA";
        emailInput.placeholder = "Masukkan NIM Anda";
        loginBtn.innerHTML = 'MASUK SEBAGAI MAHASISWA <i class="fas fa-sign-in-alt ms-1"></i>';
 
        loginBtn.onclick = verifyMahasiswaAccess;

    } 
    else if (kategori === 'Alumni') {
        modalTitle.innerHTML = '<i class="fas fa-user-tag me-2"></i>Portal Alumni';
        modalDesc.innerText = "Silahkan login untuk memperbarui data Tracer Study.";
        emailLabel.innerText = "NIM / EMAIL ALUMNI";
        emailInput.placeholder = "Masukkan NIM atau Email";
        loginBtn.innerHTML = 'MASUK SEBAGAI ALUMNI <i class="fas fa-sign-in-alt ms-1"></i>';
        
        loginBtn.onclick = verifyAlumniAccess;
    }
    
    let loginModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('passwordModal'));
    loginModal.show();
}

function verifyStaffAccess() {
    const email = $('#staffEmail').val().trim();
    const pass = $('#staffPassword').val();
    const kode = $('#authCode').val().trim();

    const isAdminEmail = (email === "admin@uniku.ac.id");
    const isAdminPass = (pass === "admin123");
    const isAdminKode = (kode === "FKOMADMIN");

    if (isAdminEmail && isAdminPass && isAdminKode) {
        currentUserRole = "staff";
        isStaffAuthenticated = true;
        
        alert("Login Berhasil! Selamat Datang Admin.");
        
        const modalElement = document.getElementById('passwordModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) modalInstance.hide();

        onLoginSuccess(); 

    } else {
        alert("DATA ATAU KODE OTORITAS SALAH!"); 
        $('#authError').text("Kredensial tidak valid. Silahkan hubungi IT Center.").fadeIn();
    }
}

/* ===================================================
   5. LOGIKA TERPADU: SATU VERIFIKASI UNTUK LOGIN & DAFTAR
   KODE RAHASIA: ALUMNIFKOM
   =================================================== */

const KODE_RAHASIA_ALUMNI = "ALUMNIFKOM"; 

$(document).ready(function() {
    
    $('#tab-form').on('click', function(e) {
        if (!isAlumniAuthenticated) {
            e.preventDefault(); 
            e.stopImmediatePropagation(); 

            $('#modalTitle').text("VERIFIKASI AKSES ALUMNI (DAFTAR)"); 
            bukaModalAkses();
        }
    });

    $(document).on('click', '#btnLoginAlumni, .login-alumni-trigger', function(e) {
        e.preventDefault();
        
        if (!isAlumniAuthenticated) {
            $('#modalTitle').text("VERIFIKASI AKSES ALUMNI (LOGIN)"); 
            bukaModalAkses();
        } else {
            direksiKeFormAlumni();
        }
    });

    $(document).off('click', '#mainLoginBtn').on('click', '#mainLoginBtn', function(e) {
        e.preventDefault();
        
        const title = $('#modalTitle').text().toUpperCase();
        
        if (title.includes("ALUMNI")) {
            verifyAlumniAccess(); 
        } else {
            if (typeof verifyMahasiswaAccess === "function") verifyMahasiswaAccess();
        }
    });
});

function bukaModalAkses() {
    $('#staffEmail, #staffPassword, #authCode').val('');
    const modalEl = document.getElementById('passwordModal');
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

function direksiKeFormAlumni() {
    $('#welcome-page, #prodi-page, #visi-misi-prodi').hide();
    $('#main-dashboard').removeClass('hidden-section').show();
    
    if (typeof executeSwitchTab === "function") {
        executeSwitchTab('form');
    }
}

function verifyAlumniAccess() {
    const identitas = $('#staffEmail').val().trim(); 
    const pass = $('#staffPassword').val().trim(); 
    const kode = $('#authCode').val().trim().toUpperCase(); 

    if (identitas !== "" && pass !== "" && kode === KODE_RAHASIA_ALUMNI) {
        currentUserRole = "alumni";
        isAlumniAuthenticated = true;
        
        alert("SELAMAT DATANG ALUMNI FKOM UNIKU!\nLogin Berhasil menggunakan Email: " + identitas);
        
        const modalEl = document.getElementById('passwordModal');
        bootstrap.Modal.getInstance(modalEl).hide();

        $('#welcome-page, #prodi-page, #visi-misi-prodi').hide();
        $('#main-dashboard').removeClass('hidden-section').hide().fadeIn(800);
        
        if (typeof executeSwitchTab === "function") executeSwitchTab('form');
        if (typeof applyRolePermissions === "function") applyRolePermissions();
        if (typeof renderLoker === "function") renderLoker();
        
    } else {
        if (pass === "") {
            alert("LOGIN GAGAL!\nPassword Gmail Anda wajib diisi.");
        } else if (kode !== KODE_RAHASIA_ALUMNI) {
            alert("KODE OTORITAS SALAH!\nGunakan: ALUMNIFKOM");
        } else {
            alert("LOGIN GAGAL!\nPastikan Email dan Kode Otoritas Alumni sudah benar.");
        }
    }
}

function prosesVerifikasiAlumniTunggal() {
    const identitas = $('#staffEmail').val().trim(); 
    const pass = $('#staffPassword').val().trim(); 
    const kode = $('#authCode').val().trim().toUpperCase(); 

    if (identitas !== "" && pass !== "" && kode === "ALUMNIFKOM") {
        
        isAlumniAuthenticated = true;
        currentUserRole = "alumni";
        
        alert("VERIFIKASI BERHASIL!\nSelamat Datang Alumni FKOM.");

        const modalEl = document.getElementById('passwordModal');
        bootstrap.Modal.getInstance(modalEl).hide();

        direksiKeFormAlumni();

    } else {
        if (kode !== "ALUMNIFKOM") {
            alert("KODE OTORITAS SALAH!\nGunakan: ALUMNIFKOM");
        } else {
            alert("DATA TIDAK LENGKAP!\nEmail/NIM dan Password tidak boleh kosong.");
        }
    }
}

function verifyMahasiswaAccess() {
    const nim = $('#staffEmail').val().trim(); 
    const pass = $('#staffPassword').val().trim(); 
    const kode = $('#authCode').val().trim();

    if (nim !== "" && pass !== "" && kode === KODE_RAHASIA.MHS) {
        currentUserRole = "mahasiswa";
        
        alert("SELAMAT DATANG MAHASISWA FKOM UNIKU!\nLogin Berhasil.");

        bootstrap.Modal.getInstance(document.getElementById('passwordModal')).hide();
        $('#welcome-page, #prodi-page, #visi-misi-prodi').hide();
        $('#main-dashboard').removeClass('hidden-section').hide().fadeIn(800);
        
        ambilDataDariSheets(); 
        updatePublicAlumniTable(); 

        executeSwitchTab('home');
        applyRolePermissions();
        renderLoker();
    } else {
        if (pass === "") {
            alert("LOGIN GAGAL!\nPassword Gmail/Akun Anda wajib diisi.");
        } else {
            alert("LOGIN GAGAL!\nPastikan NIM dan Kode Otoritas Mahasiswa sudah benar.");
        }
    }
}

function applyRolePermissions() {
    $('[contenteditable]').attr('contenteditable', 'false').css({
        'border': 'none',
        'padding': '0'
    });

    if (currentUserRole === 'staff') {
        $('.edit-area, h1, h2, h3, h4, h5, p, .card-text').attr('contenteditable', 'true').css({
            'border': '1px dashed #FFC107',
            'padding': '5px',
            'cursor': 'edit'
        });
        
        $('.admin-only').fadeIn();
        console.log("Mode Edit Staff Aktif");
    } else {
        $('.admin-only').hide();
    }
}
/* =========================================
   6. FUNGSI RENDER DATA (ALUMNI & LOKER)
   ========================================= */
function updatePublicAlumniTable() {
    const tableBody = $('#alumni-public-table');
    if (!tableBody.length) return;
    tableBody.empty();
    
    databaseAlumni.forEach((data, index) => {
        let kolomAksi = "";
        if (currentUserRole === "staff") {
            kolomAksi = `<td><button class="btn btn-sm btn-danger" onclick="hapusDataAlumni(${data.id})"><i class="fas fa-trash"></i></button></td>`;
        } else {
            kolomAksi = `<td>-</td>`; 
        }

        tableBody.append(`
            <tr>
                <td>${index + 1}</td>
                <td class="fw-bold">${data.nama}</td>
                <td>${data.nim}</td>
                <td>${data.prodi}</td>
                <td>${data.tahun}</td>
                <td>${data.hp}</td>
                <td>${data.prestasi}</td>
                <td><span class="badge bg-primary">${data.posisi}</span></td>
                ${kolomAksi} 
            </tr>
        `);
    });
}

function hapusDataAlumni(id) {
    if(confirm("Apakah Anda yakin ingin menghapus data alumni ini?")) {
        databaseAlumni = databaseAlumni.filter(item => item.id !== id);
        updatePublicAlumniTable();
    }
}

function renderLoker() {
    const container = document.getElementById('loker-container');
    const statusLogin = document.querySelector('.dropdown-toggle').innerText.toLowerCase();
    
    const isStaff = statusLogin.includes("staf") || statusLogin.includes("admin");

    container.innerHTML = ""; 

    dataLoker.forEach((loker) => {
        const tombolKhususStaff = isStaff ? 
            `<button class="btn btn-dark btn-sm w-100 mt-2" onclick="bukaEditLoker(${loker.id})">
                <i class="fas fa-edit"></i> Edit Loker
            </button>` : ""; 

        container.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card shadow-sm border-0">
                    <div class="card-body">
                        <h6>${loker.posisi}</h6>
                        <p class="small text-primary">${loker.pt}</p>
                        <a href="${loker.link}" class="btn btn-outline-primary btn-sm w-100">Lihat Detail</a>
                        ${tombolKhususStaff}
                    </div>
                </div>
            </div>`;
    });
}
/* ============================================================
   7. SISTEM MANAJEMEN LOKER (LOGIKA GOOGLE SHEETS)
   ============================================================ */

const urlSheets = "https://script.google.com/macros/s/AKfycbxD4EIcZtodn0efWTx6iPdw66kD1b5NH_n1ZlXQj8DeqebUvAPWuY-Y6hdk6aALv36I/exec";
let daftarLokerSheets = []; 

function muatLoker() {
    console.log("Memuat data loker dari Google Sheets...");
    fetch(urlSheets)
        .then(response => response.json())
        .then(data => {
            daftarLokerSheets = data; 
            const container = document.getElementById('loker-container');
            
            if (!container) {
                console.error("Elemen #loker-container tidak ditemukan!");
                return;
            }

            container.innerHTML = ""; 

            if (data.length === 0) {
                container.innerHTML = '<div class="col-12 text-center"><p class="text-muted">Belum ada lowongan tersedia.</p></div>';
                return;
            }

            data.forEach((loker, index) => {
                container.innerHTML += `
                    <div class="col-lg-4 col-md-6 mb-4"> 
                        <div class="card shadow-sm bg-white border-0 h-100" style="border-radius: 12px; transition: transform 0.3s;">
                            <div class="card-body p-4">
                                <h6 class="fw-bold mb-1">${loker.posisi}</h6>
                                <p class="small text-primary mb-2">${loker.pt}</p>
                                <p class="small text-muted mb-3">
                                    <i class="fas fa-map-marker-alt me-1"></i>${loker.lokasi || 'Cirebon'}
                                </p>
                                <hr class="my-3 opacity-25">
                                <button onclick="bukaModalSheets(${index})" class="btn btn-warning btn-sm w-100 fw-bold py-2" 
                                   style="border-radius: 8px; background-color: #ffc412; border: none; color: #000;">
                                   Lihat Detail
                                </button>
                            </div>
                        </div>
                    </div>`;
            });
            console.log("Berhasil memuat " + data.length + " lowongan.");
        })
        .catch(error => {
            console.error('Gagal mengambil data dari Sheets:', error);
            const container = document.getElementById('loker-container');
            if (container) container.innerHTML = '<p class="text-danger text-center">Gagal memuat data. Periksa koneksi atau URL Script.</p>';
        });
}

function bukaModalSheets(index) {
    const loker = daftarLokerSheets[index];
    if (!loker) return;
    
    document.getElementById('modalLokerPosisi').innerText = loker.posisi;
    document.getElementById('modalLokerPerusahaan').innerText = loker.pt;
    
    const areaDeskripsi = document.getElementById('modalLokerDeskripsi');
    if (areaDeskripsi) {
        areaDeskripsi.innerText = loker.deskripsi || "Tidak ada deskripsi pekerjaan.";
    }
    
    const btnLamar = document.getElementById('btnLamarSekarang');
    if (btnLamar) {
        btnLamar.href = loker.linkLamar || "#";
        btnLamar.target = "_blank";
        btnLamar.innerText = "Lamar Sekarang";
        btnLamar.className = "btn btn-primary w-100"; 
    }
    
    let myModal = new bootstrap.Modal(document.getElementById('lokerDetailModal'));
    myModal.show();
}

document.addEventListener("DOMContentLoaded", function() {
    muatLoker();
});

/* =========================================
   8. GLOBAL VARIABLES & CONFIGURATION
   ========================================= */
databaseAlumni = []; 
const urlTickerBaru = "https://script.google.com/macros/s/AKfycbzgH1ZvjrMqxNImYXz-xcINphUEma6by6Hf0V3MPzWP32sFdTTeF5BxpyxQNbsrddYe/exec";
const scriptURL = 'https://script.google.com/macros/s/AKfycbwpUji6h4vDHn4e9xxDV6OJ3Is1QXLsnoa5USyK7Rh9lXH3OzoYkv6oSGi3hLTslMc/exec'; 
const mitraScriptURL = 'https://script.google.com/macros/s/AKfycbwmqz3MeXYSxP6ywcjIAIix51DCFdjyjMHaBBLAR0H5ovErWn80bIFUjRgIRYjSpH8u/exec';

function startNewsTicker() {
    console.log("Mengambil data ticker dari Sheets...");
    fetch(urlTickerBaru)
        .then(res => res.json())
        .then(data => {
            if (data && data.length > 0) {
                let i = 0;
                const tickerElement = $('#news-ticker');
                tickerElement.text(data[0]);

                setInterval(() => {
                    tickerElement.fadeOut(500, function() {
                        i = (i + 1) % data.length;
                        $(this).text(data[i]).fadeIn(500);
                    });
                }, 4000);
            }
        })
        .catch(err => {
            console.error("Gagal memuat ticker:", err);
            $('#news-ticker').text("Gagal memuat berita terbaru.");
        });
}

/* =========================================
   9. DATA SYNCHRONIZATION (ALUMNI)
   ========================================= */
function ambilDataDariSheets() {
    console.log("Sedang mengambil data terbaru dari Spreadsheet...");
    fetch(scriptURL)
        .then(res => res.json())
        .then(data => {
            if(data && data.length > 0) {
                databaseAlumni = data.map(item => ({
                    id: Math.random(),
                    nama: item.nama || "",
                    nim: item.nim || "",
                    prodi: item.prodi || "",
                    tahun: item.tahun || "",
                    hp: item.hp || "",
                    email: item.email || "",
                    prestasi: item.prestasi || "",
                    posisi: item.status || "" 
                }));
                updatePublicAlumniTable();
            }
        })
        .catch(err => console.error("Gagal ambil data:", err));
}

function updatePublicAlumniTable() {
    const tableBody = document.getElementById("alumni-public-table");
    if (!tableBody) return;
    
    tableBody.innerHTML = "";
    databaseAlumni.forEach((item, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${item.nama}</td>
                <td>${item.nim}</td>
                <td>${item.prodi}</td>
                <td>${item.tahun}</td>
                <td>${item.hp}</td>
                <td>${item.prestasi}</td>
                <td>${item.posisi}</td>
                <td class="btn-edit-staff" style="display:none;">
                    <button class="btn btn-sm btn-warning">Edit</button>
                </td>
            </tr>`;
        tableBody.innerHTML += row;
    });
}

function toggleAlumniDetails() {
    const status = $('#inputPosisi').val();
    const detailArea = $('#detailTambahan');
    const label1 = $('#labelDetail1');
    const label2 = $('#labelDetail2');
    const title = $('#detailTitle');
    
    if (status === "Bekerja") {
        detailArea.show();
        title.text("Detail Pekerjaan");
        label1.text("NAMA PERUSAHAAN / INSTANSI");
        label2.text("DAERAH / LOKASI KERJA");
    } 
    else if (status === "Wirausaha") {
        detailArea.show();
        title.text("Detail Usaha");
        label1.text("NAMA USAHA");
        label2.text("BERGERAK DI BIDANG");
    } 
    else if (status === "Pendidikan") {
        detailArea.show();
        title.text("Detail Studi Lanjut");
        label1.text("NAMA UNIVERSITAS");
        label2.text("PROGRAM STUDI / JENJANG");
    } 
    else {
        detailArea.hide();
    }
}

/* =========================================
   10. SEARCH & FILTER FUNCTIONS
   ========================================= */
function filterAlumni() {
    let inputNama = document.getElementById("searchAlumni").value.toLowerCase();
    let selectTahun = document.getElementById("filterTahunAlumni").value;
    let selectProdi = document.getElementById("filterProdiAlumni").value.toUpperCase();
    
    let table = document.getElementById("alumni-public-table");
    let tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
        let tdNama = tr[i].getElementsByTagName("td")[1];
        let tdProdi = tr[i].getElementsByTagName("td")[3]; 
        let tdTahun = tr[i].getElementsByTagName("td")[4]; 

        if (tdNama && tdProdi && tdTahun) {
            let txtNama = (tdNama.textContent || tdNama.innerText).toLowerCase();
            let txtProdi = (tdProdi.textContent || tdProdi.innerText).toUpperCase();
            let txtTahun = (tdTahun.textContent || tdTahun.innerText).trim();

            let matchNama = txtNama.indexOf(inputNama) > -1;
            let matchProdi = (selectProdi === "" || txtProdi.includes(selectProdi));
            let matchTahun = (selectTahun === "" || txtTahun === selectTahun);

            tr[i].style.display = (matchNama && matchProdi && matchTahun) ? "" : "none";
        }
    }
}

function bukaPanelCari() {
    const panel = document.getElementById('panelCari');
    if (panel) {
        panel.style.display = 'flex';
        document.getElementById('inputCariFitur').focus();
    }
}

function tutupPanelCari() {
    document.getElementById('panelCari').style.display = 'none';
}

function mulaiMencari() {
    let keyword = document.getElementById('inputCariFitur').value.toLowerCase();
    let box = document.getElementById('boxHasil');
    box.innerHTML = "";

    const daftarTools = [
        { nama: "Beranda & Info", target: "home", desc: "Halaman depan portal" },
        { nama: "Daftar Alumni", target: "form", desc: "Formulir pendaftaran alumni" },
        { nama: "Data Alumni / Database", target: "data", desc: "Tabel database alumni FKOM" }
    ];

    if (keyword.length > 0) {
        let matches = daftarTools.filter(t => t.nama.toLowerCase().includes(keyword));
        matches.forEach(item => {
            let div = document.createElement('div');
            div.className = "list-group-item list-group-item-action p-3";
            div.innerHTML = `<strong>${item.nama}</strong><br><small>${item.desc}</small>`;
            div.onclick = function() {
                tutupPanelCari();
            };
            box.appendChild(div);
        });
    }
}

/* =========================================
   11. MAIN INITIALIZATION (DOCUMENT READY)
   ========================================= */
$(document).ready(function() {
    startNewsTicker();
    ambilDataDariSheets();

    $('#formAlumni').on('submit', function(e) {
        e.preventDefault();
        const btnSubmit = $(this).find('button[type="submit"]');
        btnSubmit.html('<i class="fas fa-spinner fa-spin"></i> Mengirim...').prop('disabled', true);

        const statusVal = $('#inputPosisi').val();
        const detailVal = $('#inputDetail1').val();
        const posisiLengkap = detailVal ? `${statusVal} (${detailVal})` : statusVal;

        const formData = {
            nama: $('#inputNama').val(),
            nim: $('#inputNIM').val(),
            prodi: $('#inputProdi').val(),
            tahun: $('#inputTahun').val(),
            hp: $('#inputHP').val(),
            email: $('#inputEmail').val(),
            prestasi: $('#inputPrestasi').val(),
            status: posisiLengkap 
        };

        fetch(scriptURL, { 
            method: 'POST', 
            mode: 'no-cors', 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            alert('DATA BERHASIL DISIMPAN KE GOOGLE SHEETS!');
            databaseAlumni.unshift({ id: Date.now(), ...formData, posisi: formData.status });
            updatePublicAlumniTable();
            $('#formAlumni')[0].reset();
            $('#detailTambahan').hide(); 
            btnSubmit.html('SIMPAN DATA <i class="fas fa-paper-plane ms-2"></i>').prop('disabled', false);
        })
        .catch(error => {
            console.error('Error!', error);
            alert('Gagal mengirim data.');
            btnSubmit.text("SIMPAN DATA").prop('disabled', false);
        });
    });

    const mitraForm = document.getElementById('mitraForm');
    if (mitraForm) {
        mitraForm.addEventListener('submit', e => {
            e.preventDefault();
            const submitBtnMitra = mitraForm.querySelector('button[type="submit"]');
            const modalElement = document.getElementById('devModal');
            const formDataMitra = new FormData(mitraForm);

            submitBtnMitra.disabled = true;
            submitBtnMitra.innerHTML = "Menyimpan...";

            fetch(mitraScriptURL, {
                method: 'POST',
                body: formDataMitra
            })
            .then(() => {
                submitBtnMitra.disabled = false;
                submitBtnMitra.innerHTML = "Simpan Data";
                mitraForm.reset();

                let modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
                modalInstance.hide();

                modalElement.addEventListener('hidden.bs.modal', function handler() {
                    modalInstance.dispose();
                    document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
                    document.body.classList.remove('modal-open');
                    document.body.style.overflow = 'auto';
                    alert("Data Berhasil Disimpan!");
                    modalElement.removeEventListener('hidden.bs.modal', handler);
                }, { once: true });
            })
            .catch(error => {
                console.error('Error!', error.message);
                submitBtnMitra.disabled = false;
                submitBtnMitra.innerHTML = "Simpan Data";
                alert("Gagal menyimpan data.");
            });
        });
    }
});
/* ============================================================
   12. KONTROL PANEL ADMIN & STAFF
   ============================================================ */

function onLoginSuccess() {
    document.getElementById('subpage-home').classList.add('hidden-section');
    document.getElementById('admin-control-panel').classList.remove('hidden-section');
    
    const adminButtons = document.querySelectorAll('.admin-only');
    adminButtons.forEach(btn => {
        btn.style.setProperty('display', 'block', 'important');
    });
}

function showEditSection(type) {
    document.getElementById('admin-control-panel').classList.add('hidden-section');
    document.getElementById('subpage-home').classList.remove('hidden-section');
    applyRolePermissions(); 

    if(type === 'news') {
        const newsElement = document.getElementById('news-ticker');
        if(newsElement) newsElement.scrollIntoView({ behavior: 'smooth' });
        alert('MODE EDIT BERITA AKTIF: Silahkan klik langsung pada teks yang ingin diubah.');
    } 
    else if(type === 'career') {
        renderLoker(); 
        
        const careerElement = document.getElementById('loker-container');
        if(careerElement) careerElement.scrollIntoView({ behavior: 'smooth' });
        alert('MODE EDIT LOWONGAN AKTIF: Gunakan tombol "Kelola & Edit" pada kartu lowongan.');
    }
    else if(type === 'alumni') {
        executeSwitchTab('data');
        updatePublicAlumniTable();
        alert('MODE MANAJEMEN DATA ALUMNI AKTIF.');
    }
}

function logoutStaff() {
    location.reload(); 
}

function matikanModeEdit() {
    currentUserRole = "";
    isStaffAuthenticated = false;

    $('[contenteditable]').attr('contenteditable', 'false').css({
        'border': 'none',
        'padding': '0',
        'cursor': 'default'
    });

    $('.admin-only').hide();
    $('#admin-control-panel').addClass('hidden-section');

    alert("Mode Admin dinonaktifkan. Anda sekarang dalam mode pengunjung.");
    location.reload(); 
}

function kembaliKePanelAdmin() {
    $('[id^="subpage-"]').addClass('hidden-section').hide();
    $('#admin-control-panel').removeClass('hidden-section').fadeIn(400);
    $('#main-dashboard').removeClass('hidden-section').show();
    $('[contenteditable]').css('border', 'none');
    
    window.scrollTo(0, 0);
}
