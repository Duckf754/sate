// Harga menu
const menuPrices = {
    ayam: 20000,
    kambing: 30000,
    gulai: 30000,
    soto: 15000,
    lontong: 4000
};

const phoneNumber = "6281995741457";

function getQty(id) {
    return parseInt(document.getElementById(id)?.value, 10) || 0;
}

function getOrderData() {
    const qtyAyam = getQty("qtyAyam");
    const qtyKambing = getQty("qtyKambing");
    const qtyGulai = getQty("qtyGulai");
    const qtySoto = getQty("qtySoto");
    const qtyLontong = getQty("qtyLontong");

    const subtotalAyam = qtyAyam * menuPrices.ayam;
    const subtotalKambing = qtyKambing * menuPrices.kambing;
    const subtotalGulai = qtyGulai * menuPrices.gulai;
    const subtotalSoto = qtySoto * menuPrices.soto;
    const subtotalLontong = qtyLontong * menuPrices.lontong;

    const totalMenuUtama = qtyAyam + qtyKambing + qtyGulai + qtySoto;
    const total = subtotalAyam + subtotalKambing + subtotalGulai + subtotalSoto + subtotalLontong;
    const deliveryOption = document.getElementById("deliveryOption")?.checked || false;
    const dineInOption = document.getElementById("dineInOption")?.checked || false;
    const tableNumber = (document.getElementById("tableNumber")?.value || "").trim();

    return {
        qtyAyam,
        qtyKambing,
        qtyGulai,
        qtySoto,
        qtyLontong,
        subtotalAyam,
        subtotalKambing,
        subtotalGulai,
        subtotalSoto,
        subtotalLontong,
        totalMenuUtama,
        total,
        deliveryOption,
        dineInOption,
        tableNumber
    };
}

function updateQuantity(menu, change) {
    const inputElement = document.getElementById(`qty${menu.charAt(0).toUpperCase() + menu.slice(1)}`);
    let currentValue = parseInt(inputElement.value, 10) || 0;
    let newValue = currentValue + change;
    if (newValue < 0) newValue = 0;
    inputElement.value = newValue;
    updateTotal();
}

function updateTotal() {
    const data = getOrderData();
    document.getElementById("displayTotal").textContent = `Rp ${data.total.toLocaleString("id-ID")}`;
    updateOrderDetails(data);
    updateActionButtonText();
}

function updateOrderDetails(data) {
    const orderDetailsElement = document.getElementById("orderDetails");
    const {
        qtyAyam, qtyKambing, qtyGulai, qtySoto, qtyLontong,
        subtotalAyam, subtotalKambing, subtotalGulai, subtotalSoto, subtotalLontong
    } = data;

    if (qtyAyam === 0 && qtyKambing === 0 && qtyGulai === 0 && qtySoto === 0 && qtyLontong === 0) {
        orderDetailsElement.innerHTML = "<p>Belum ada pesanan. Pilih menu yang ingin dipesan.</p>";
        return;
    }

    let html = "";
    if (qtyAyam > 0) html += `<div class="order-detail-item"><span>Sate Ayam (${qtyAyam} porsi)</span><span>Rp ${subtotalAyam.toLocaleString("id-ID")}</span></div>`;
    if (qtyKambing > 0) html += `<div class="order-detail-item"><span>Sate Kambing (${qtyKambing} porsi)</span><span>Rp ${subtotalKambing.toLocaleString("id-ID")}</span></div>`;
    if (qtyGulai > 0) html += `<div class="order-detail-item"><span>Gulai Kambing (${qtyGulai} porsi)</span><span>Rp ${subtotalGulai.toLocaleString("id-ID")}</span></div>`;
    if (qtySoto > 0) html += `<div class="order-detail-item"><span>Soto Ayam Kampung (${qtySoto} porsi)</span><span>Rp ${subtotalSoto.toLocaleString("id-ID")}</span></div>`;
    if (qtyLontong > 0) html += `<div class="order-detail-item"><span>Lontong (${qtyLontong} potong)</span><span>Rp ${subtotalLontong.toLocaleString("id-ID")}</span></div>`;

    orderDetailsElement.innerHTML = html;
}

function updateActionButtonText() {
    const btn = document.getElementById("orderActionBtn");
    const data = getOrderData();
    if (!btn) return;

    if (data.deliveryOption && data.totalMenuUtama >= 5) {
        btn.innerHTML = '<i class="fas fa-location-dot"></i> Lanjut Isi Alamat';
    } else {
        btn.innerHTML = '<i class="fas fa-receipt"></i> Beli';
    }
}

function toggleDeliveryInfo() {
    const deliveryCheckbox = document.getElementById("deliveryOption");
    const deliveryInfo = document.getElementById("deliveryInfo");
    const deliveryFormWrapper = document.getElementById("deliveryFormWrapper");
    const dineInCheckbox = document.getElementById("dineInOption");
    const dineInInfo = document.getElementById("dineInInfo");

    if (!deliveryCheckbox || !deliveryInfo) return;

    if (deliveryCheckbox.checked) {
        deliveryInfo.style.display = "block";
        if (dineInCheckbox) dineInCheckbox.checked = false;
        if (dineInInfo) dineInInfo.style.display = "none";
    } else {
        deliveryInfo.style.display = "none";
        if (deliveryFormWrapper) deliveryFormWrapper.style.display = "none";
    }

    updateActionButtonText();
}

function toggleDineInInfo() {
    const dineInCheckbox = document.getElementById("dineInOption");
    const dineInInfo = document.getElementById("dineInInfo");
    const deliveryCheckbox = document.getElementById("deliveryOption");
    const deliveryInfo = document.getElementById("deliveryInfo");
    const deliveryFormWrapper = document.getElementById("deliveryFormWrapper");

    if (!dineInCheckbox || !dineInInfo) return;

    if (dineInCheckbox.checked) {
        dineInInfo.style.display = "block";
        if (deliveryCheckbox) deliveryCheckbox.checked = false;
        if (deliveryInfo) deliveryInfo.style.display = "none";
        if (deliveryFormWrapper) deliveryFormWrapper.style.display = "none";
    } else {
        dineInInfo.style.display = "none";
    }

    updateActionButtonText();
}

function validateOrder() {
    const data = getOrderData();
    const totalItem = data.qtyAyam + data.qtyKambing + data.qtyGulai + data.qtySoto + data.qtyLontong;

    if (totalItem === 0) {
        alert("Wah, pesanannya masih kosong. Isi jumlah menu dulu ya.");
        return false;
    }

    if (data.deliveryOption && data.totalMenuUtama < 5) {
        alert(`Wajib 5 pesanan menu utama untuk delivery.\nLontong tidak dihitung untuk syarat antar.\n\nPesanan menu utama Anda saat ini: ${data.totalMenuUtama} porsi.`);
        return false;
    }

    if (data.dineInOption && !data.tableNumber) {
        alert("Kalau makan di warung, isi meja ke berapa dulu.");
        return false;
    }

    return true;
}

function prosesPesanan() {
    if (!validateOrder()) return;

    const data = getOrderData();
    const deliveryFormWrapper = document.getElementById("deliveryFormWrapper");

    if (data.deliveryOption) {
        if (deliveryFormWrapper) {
            deliveryFormWrapper.style.display = "block";
            deliveryFormWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
    }

    kirimWA();
}

function validateDeliveryForm() {
    const name = document.getElementById("customerName")?.value.trim() || "";
    const phone = document.getElementById("customerPhone")?.value.trim() || "";
    const address = document.getElementById("customerAddress")?.value.trim() || "";

    if (!name || !phone || !address) {
        alert("Isi nama, no HP, dan alamat lengkap dulu.");
        return false;
    }
    return true;
}

function buildWaMessage(data, deliveryData) {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    let message = "*PESANAN SATE BAROKAH*\n";
    message += `Tanggal: ${formattedDate}\n\n`;
    message += "*DETAIL PESANAN:*\n";

    if (data.qtyAyam > 0) message += `• Sate Ayam: ${data.qtyAyam} porsi x Rp ${menuPrices.ayam.toLocaleString("id-ID")} = Rp ${data.subtotalAyam.toLocaleString("id-ID")}\n`;
    if (data.qtyKambing > 0) message += `• Sate Kambing: ${data.qtyKambing} porsi x Rp ${menuPrices.kambing.toLocaleString("id-ID")} = Rp ${data.subtotalKambing.toLocaleString("id-ID")}\n`;
    if (data.qtyGulai > 0) message += `• Gulai Kambing: ${data.qtyGulai} porsi x Rp ${menuPrices.gulai.toLocaleString("id-ID")} = Rp ${data.subtotalGulai.toLocaleString("id-ID")}\n`;
    if (data.qtySoto > 0) message += `• Soto Ayam Kampung: ${data.qtySoto} porsi x Rp ${menuPrices.soto.toLocaleString("id-ID")} = Rp ${data.subtotalSoto.toLocaleString("id-ID")}\n`;
    if (data.qtyLontong > 0) message += `• Lontong: ${data.qtyLontong} potong x Rp ${menuPrices.lontong.toLocaleString("id-ID")} = Rp ${data.subtotalLontong.toLocaleString("id-ID")}\n`;

    message += `\n*TOTAL: Rp ${data.total.toLocaleString("id-ID")}*\n\n`;

    if (data.deliveryOption && deliveryData) {
        message += "*Pengiriman:* Antar ke rumah (Delivery)\n";
        message += `Nama Penerima: ${deliveryData.name}\n`;
        message += `No. HP: ${deliveryData.phone}\n`;
        message += `Alamat: ${deliveryData.address}\n`;
        if (deliveryData.note) message += `Catatan: ${deliveryData.note}\n`;
    } else if (data.dineInOption) {
        message += "*Pengiriman:* Makan di tempat (Warung)\n";
        message += `Meja: ${data.tableNumber}\n`;
    } else {
        message += "*Pengiriman:* Ambil di tempat (Take Away)\n";
    }

    message += "\nMohon konfirmasi pesanan. Terima kasih.";
    return message;
}

function kirimWA(deliveryData = null) {
    if (!validateOrder()) return;

    const data = getOrderData();
    const message = buildWaMessage(data, deliveryData);
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
}

function submitDeliveryOrder(event) {
    event.preventDefault();

    if (!validateOrder()) return;

    const data = getOrderData();
    if (!data.deliveryOption) {
        alert("Mode delivery belum dipilih.");
        return;
    }

    if (!validateDeliveryForm()) return;

    const deliveryData = {
        name: document.getElementById("customerName").value.trim(),
        phone: document.getElementById("customerPhone").value.trim(),
        address: document.getElementById("customerAddress").value.trim(),
        note: document.getElementById("customerNote")?.value.trim() || ""
    };

    kirimWA(deliveryData);
}

document.addEventListener("DOMContentLoaded", function() {
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", function() {
            navLinks.classList.toggle("active");
            const icon = this.querySelector("i");
            if (icon.classList.contains("fa-bars")) {
                icon.classList.replace("fa-bars", "fa-times");
            } else {
                icon.classList.replace("fa-times", "fa-bars");
            }
        });
    }

    const navItems = document.querySelectorAll(".nav-links a");
    navItems.forEach(item => {
        item.addEventListener("click", function() {
            if (navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                const icon = mobileMenuBtn.querySelector("i");
                if (icon.classList.contains("fa-times")) {
                    icon.classList.replace("fa-times", "fa-bars");
                }
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });

    const deliveryInfo = document.getElementById("deliveryInfo");
    if (deliveryInfo) deliveryInfo.style.display = "none";

    const deliveryFormWrapper = document.getElementById("deliveryFormWrapper");
    if (deliveryFormWrapper) deliveryFormWrapper.style.display = "none";

    const dineInInfo = document.getElementById("dineInInfo");
    if (dineInInfo) dineInInfo.style.display = "none";

    const deliveryForm = document.getElementById("deliveryForm");
    if (deliveryForm) deliveryForm.addEventListener("submit", submitDeliveryOrder);

    const qtyInputs = document.querySelectorAll(".qty-input");
    qtyInputs.forEach(input => {
        input.addEventListener("change", updateTotal);
        input.addEventListener("input", updateTotal);
    });

    const tableNumber = document.getElementById("tableNumber");
    if (tableNumber) tableNumber.addEventListener("input", updateActionButtonText);

    updateTotal();
});
