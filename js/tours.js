// Mengubah format harga menjadi rupiah
const formatRupiah = (price) => {
  // Menggunakan Intl.NumberFormat untuk mengonversi harga ke format rupiah
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);

  return formattedPrice;
};

// Menduplikasi array products ke filteredProducts
let filteredProducts = [...products];

// Mengambil elemen DOM untuk menampilkan produk
const productsContainer = document.querySelector(".products-container");

// Fungsi untuk menampilkan produk di dalam DOM
const displayProducts = () => {
  // Menampilkan pesan jika tidak ada produk yang sesuai dengan pencarian
  if (filteredProducts.length < 1) {
    productsContainer.innerHTML = `<h6>Sorry, no products matched your search</h6>`;
    return;
  }

  // Mengisi kontainer produk dengan HTML hasil mapping dari filteredProducts
  productsContainer.innerHTML = filteredProducts
    .map((product) => {
      const { id, title, image, price } = product;
      return `<a href="detail.html?id=${id}">
      <article class="product" data-id="${id}">
          <img
            src="${image}"
            class="product-img img"
            alt=""
          />
          <footer>
            <h5 class="product-name">${title}</h5>
            <!-- Menampilkan harga dalam format rupiah -->
            <span class="product-price">${formatRupiah(price)}</span>
          </footer>
        </article></a>`;
    })
    .join("");
};

// Memanggil fungsi displayProducts untuk menampilkan produk awal
displayProducts();

// Event listener untuk input pencarian
const form = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");

form.addEventListener("keyup", () => {
  // Mendapatkan nilai input pencarian
  const inputValue = searchInput.value;
  // Memfilter produk berdasarkan judul sesuai dengan input pencarian
  filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(inputValue);
  });
  // Menampilkan produk yang sesuai dengan filter
  displayProducts();
});

// Mengambil elemen DOM untuk menampilkan tombol perusahaan
const companiesDOM = document.querySelector(".companies");

// Fungsi untuk menampilkan tombol perusahaan di dalam DOM
const displayButtons = () => {
  // Mengambil daftar unik perusahaan dari produk
  const buttons = [
    "all",
    ...new Set(products.map((product) => product.company)),
  ];
  // Menampilkan tombol perusahaan berdasarkan daftar unik
  companiesDOM.innerHTML = buttons
    .map((company) => {
      return `<button class='company-btn' data-id="${company}">${company}</button>`;
    })
    .join("");
};

// Memanggil fungsi displayButtons untuk menampilkan tombol perusahaan awal
displayButtons();

// Event listener untuk klik tombol perusahaan
companiesDOM.addEventListener("click", (e) => {
  const el = e.target;
  // Memfilter produk berdasarkan perusahaan sesuai dengan tombol yang diklik
  if (el.classList.contains("company-btn")) {
    if (el.dataset.id === "all") {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter((product) => {
        return product.company === el.dataset.id;
      });
    }
    // Mengosongkan nilai input pencarian
    searchInput.value = "";
    // Menampilkan produk yang sesuai dengan filter
    displayProducts();
  }
});