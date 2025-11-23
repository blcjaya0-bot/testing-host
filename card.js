// Data target posisi setiap kartu (dalam persentase viewport)
const cardTargets = {
    // Posisi disesuaikan agar tidak terlalu ke tepi
    'card-lt': { x: -35, y: -28 }, 
    'card-rt': { x: 35, y: -28 },  
    'card-lb': { x: -35, y: 28 },  
    'card-rb': { x: 35, y: 28 }    
};

document.addEventListener("DOMContentLoaded", function () {
    const cardElements = Array.from(document.querySelectorAll('.draggable-card'));
    const audio = document.getElementById('background-music');

    // FUNGSI UNTUK MEMUTAR AUDIO (dipanggil saat ada interaksi pertama)
    function playAudio() {
        if (audio && audio.paused) {
            audio.play().catch(error => {
                console.log("Audio play blocked by browser:", error);
            });
            // Hapus listener setelah diputar agar tidak berulang
            document.removeEventListener('click', playAudio);
            document.removeEventListener('touchstart', playAudio);
        }
    }

    // Tambahkan event listener global yang akan memicu musik
    document.addEventListener('click', playAudio);
    document.addEventListener('touchstart', playAudio);
    
    // 1. FUNGSI GERAK OTOMATIS KE SUDUT
    function moveCardsToCorners() {
        // Jeda 1 detik agar kartu terlihat menumpuk di tengah sebelum bergerak
        setTimeout(() => {
            cardElements.forEach(element => {
                const id = element.id;
                const target = cardTargets[id];
                
                if (target) {
                    // Terapkan Transformasi ke posisi target dan HILANGKAN ROTASI
                    element.style.transform = 
                        `translate(-50%, -50%) 
                         translateX(${target.x}vw) 
                         translateY(${target.y}vh) 
                         rotateZ(0deg)`;
                }
            });
        }, 1000); 
    }
    
    // Set z-index awal dan panggil fungsi gerak
    cardElements.forEach((element, index) => {
        element.style.setProperty('--order', cardElements.length - index); 
    });
    
    moveCardsToCorners();


    // ------------------- LOGIKA UCAPAN/PESAN -------------------
    
      const messages = [
        "Hai mantann,", 
        "Selamat ulang tahun yaa.", 
        "Maaf cuma ngucapin lewat kaya gini.",
        "Kamu bahagia terus yaa.",
        "Aku tau kamu lagi ada masalah sama pacar kamu sekarang,", 
        "Dan semoga hubungan kamu cepet membaik yaa,",
        "Aku ngga mau kamu nangis terus.",
        "Aku selalu khawatir sama kamuu",
        "Aku sebenernya pengen kamu kalo ada apa' selalu cerita sama aku",
        "Tapi aku takut ngebuat kamu jadi ngerasa keganggu",
        "Dan aku ntah kenapa selalu takut soal itu",
        "Makanya aku jarang ngechat duluan hehehe",
        "Sama aku juga takut hubungan kamu sama dia malah makin jauh gara' aku",
        "Udah yaa",
        "Pokonya kamu tetap semangatt yaa",
        "Tambah rajin belajarnya, sekarang udah kelas 9",
        "Sebentar lagi kamu lulus dari SMP",
        "Semoga nilai kamu bagus dan masuk sekolah impian kamu yaa",
        "Oh iya sholatnya juga harus rajin",
        "OKEII???? ",
        "I LOVE YOU!",
        "DADAHHHHHH"
    ];
  
    const charDelay = 30; // Kecepatan per karakter
    const lineDelay = 1500; // Jeda antar baris

    const lyricsElement = document.getElementById("lyrics-container");
    
    if (lyricsElement) {
        async function displayMessages() {
            lyricsElement.textContent = "";

            for (const line of messages) {
                // Tampilkan per karakter
                for (const char of line) {
                    const charElement = document.createElement("span"); 
                    charElement.textContent = char;
                    charElement.style.animation = "glow 2s ease-in-out"; 
                    charElement.style.fontSize = "30px";
                    lyricsElement.appendChild(charElement); 
      
                    await new Promise((resolve) => setTimeout(resolve, charDelay));
                    charElement.style.animation = "";
                }
                
                // Jeda antar baris
                await new Promise((resolve) => setTimeout(resolve, lineDelay));
                
                lyricsElement.appendChild(document.createElement("br")); 
                await new Promise((resolve) => setTimeout(resolve, 500)); 

                // Bersihkan tampilan untuk kalimat berikutnya
                lyricsElement.textContent = "";
            }
      
            setTimeout(function () {
                window.location.href = "yournexthtmlfile.html"; 
            }, 700);
        }
        displayMessages();
    }
    
    // ------------------- LOGIKA MEMBUAT FLOATING HEARTS -------------------

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Posisi X acak (dari kiri ke kanan layar)
        heart.style.left = Math.random() * 100 + 'vw';
        
        // Durasi animasi acak agar tidak seragam
        heart.style.animationDuration = Math.random() * 4 + 6 + 's'; 
        
        // Ukuran hati acak
        heart.style.width = heart.style.height = Math.random() * 10 + 5 + 'px';
        
        document.body.appendChild(heart);

        // Hapus hati setelah selesai animasi
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    // Panggil fungsi createHeart setiap 300 milidetik
    setInterval(createHeart, 300);
});
