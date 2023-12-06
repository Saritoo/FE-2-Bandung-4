// Ketika di-scroll, navbar muncul
const navbar = document.querySelector(".Navbar");

if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > navbar.offsetHeight) {
      navbar.classList.add("fixed");
    } else {
      navbar.classList.remove("fixed");
    }
  });
}

// Mengeluarkan menu ketika diklik
const navbarNav = document.querySelector(".navbar-nav");
const menuButton = document.querySelector("#menu");

if (navbarNav && menuButton) {
  menuButton.onclick = () => {
    navbarNav.classList.toggle("aktif");
  };

  // Jika klik diluar navbar dan menubar, maka akan kembali semula
  document.addEventListener("click", (e) => {
    const target = e.target;

    // Jika target bukan menu atau navbar menu
    if (!menuButton.contains(target) && !navbarNav.contains(target)) {
      // Hapus class aktif dari navbar menu
      navbarNav.classList.remove("aktif");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  try {
    // ...

    // Filter products based on URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const lokasiParam = urlParams.get("lokasi");
    const tipeTripParam = urlParams.get("tipeTrip");
    const bulanParam = urlParams.get("bulan");

    filteredProducts = tampilProducts.filter(({ location, category, date }) => {
      const lokasiMatches = lokasiParam
        ? location.toLowerCase().includes(lokasiParam)
        : true;
      const tipeTripMatches = tipeTripParam
        ? category.toLowerCase().includes(tipeTripParam)
        : true;
      const bulanMatches = bulanParam
        ? new Date(date).getMonth() + 1 === parseInt(bulanParam)
        : true;

      return (lokasiMatches && tipeTripMatches) || bulanMatches;
    });

    const about = document.querySelector(".about");
    const btns = document.querySelectorAll(".tab-btn");
    const articles = document.querySelectorAll(".content");

    // Cek apakah about, btns, dan articles ditemukan sebelum melanjutkan
    if (about && btns.length > 0 && articles.length > 0) {
      about.addEventListener("click", function (e) {
        const id = e.target.dataset.id;
        if (id) {
          // remove selected from other buttons
          btns.forEach(function (btn) {
            btn.classList.remove("active");
          });
          e.target.classList.add("active");
          // hide other articles
          articles.forEach(function (article) {
            article.classList.remove("active");
          });
          const element = document.getElementById(id);
          if (element) {
            element.classList.add("active");
          }
        }
      });
    }

    // Tambahkan event listener ke elemen "X" pada formulir untuk menyembunyikan formulir saat diklik
    const popupClose = document.querySelector(".popup-close");
    if (popupClose) {
      popupClose.addEventListener("click", hideOrderForm);
    }

    // Tambahkan event listener ke overlay untuk menyembunyikan formulir saat overlay diklik
    const overlay = document.querySelector(".overlay");
    if (overlay) {
      overlay.addEventListener("click", function (event) {
        if (event.target === this) {
          hideOrderForm();
        }
      });
    }

    // Fungsi untuk menambah jumlah orang
    function tambahJumlah() {
      const jumlahOrangInput = document.getElementById("jumlahOrang");
      if (jumlahOrangInput) {
        jumlahOrangInput.value = parseInt(jumlahOrangInput.value) + 1;
      }
    }

    // Fungsi untuk mengurangi jumlah orang
    function kurangiJumlah() {
      const jumlahOrangInput = document.getElementById("jumlahOrang");
      if (jumlahOrangInput) {
        const currentValue = parseInt(jumlahOrangInput.value);
        if (currentValue > 1) {
          jumlahOrangInput.value = currentValue - 1;
        }
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
