document.addEventListener("DOMContentLoaded", function () {
  const thumbnails = Array.from(document.querySelectorAll(".js-album-thumb"));
  const modalElement = document.getElementById("imagePreviewModal");
  const modalTitle = document.getElementById("modalImageTitle");
  const modalImage = document.getElementById("modalLargeImage");
  const modalCaption = document.getElementById("modalImageCaption");
  const modalCounter = document.getElementById("modalImageCounter");
  const btnPrev = document.getElementById("btnPrevImage");
  const btnNext = document.getElementById("btnNextImage");

  const imageModal = new bootstrap.Modal(modalElement);
  let currentIndex = 0;

  function showImageAt(index) {
    if (index < 0) index = thumbnails.length - 1;
    if (index >= thumbnails.length) index = 0;
    currentIndex = index;

    const target = thumbnails[currentIndex];
    const fullSrc = target.getAttribute("data-full") || target.getAttribute("src");
    const title = target.getAttribute("data-title") || target.getAttribute("alt") || "Hình ảnh";
    const desc = target.getAttribute("data-desc") || "";

    modalTitle.textContent = title;
    modalImage.src = fullSrc;
    modalImage.alt = title;
    modalCaption.textContent = desc;
    modalCounter.textContent = `Ảnh ${currentIndex + 1} / ${thumbnails.length}`;
  }

  // Click vào ảnh nhỏ để mở Modal xem ảnh lớn
  thumbnails.forEach((imgEl, index) => {
    imgEl.addEventListener("click", function () {
      showImageAt(index);
      imageModal.show();
    });
  });

  // Nút chuyển ảnh trước / sau trong Modal
  btnPrev.addEventListener("click", function () {
    showImageAt(currentIndex - 1);
  });

  btnNext.addEventListener("click", function () {
    showImageAt(currentIndex + 1);
  });

  // Hỗ trợ phím mũi tên trái/phải khi Modal đang mở
  document.addEventListener("keydown", function (event) {
    if (!modalElement.classList.contains("show")) return;
    if (event.key === "ArrowLeft") showImageAt(currentIndex - 1);
    if (event.key === "ArrowRight") showImageAt(currentIndex + 1);
  });
});