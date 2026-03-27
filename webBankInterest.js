function formatInputRupiah(input) {
    let value = input.value.replace(/[^0-9]/g, "");

    if(value) {
        input.value = new Intl.NumberFormat('id-ID').format(value);
    } else {
            input.value = "";
        };
}

function bersihAngka(string) {
    return parseFloat(string.replace(/\./g, "")) || 0;
}

function hitungCicilan() {
    const P = bersihAngka(document.getElementById('pokok').value)
    const rateAnnually = parseFloat(document.getElementById('bunga').value / 100)
    const n = parseInt(document.getElementById('bulan').value);

    if (isNaN(P) || isNaN(rateAnnually) || isNaN(n)) {
        alert("Mohon masukan angka yang valid");
        return;
    }

    const t = n / 12;

    const totalBunga = P * rateAnnually * t;
    const totalBayar = P + totalBunga;
    const cicilanPerBulan = totalBayar/n;

    document.getElementById('resPinjaman').innerText = formatRupiah(P);
    document.getElementById('resBunga').innerText = formatRupiah(totalBunga);
    document.getElementById('resTotal').innerText = formatRupiah(totalBayar);
    document.getElementById('resBulanan').innerText = formatRupiah(cicilanPerBulan);

    document.getElementById('hasil').style.display = 'block';
}

function dapatkanRate(nominal) {
    if (nominal < 50000000) {
        return 5.0;
    } else if (nominal < 200000000) {
        return 4.0;
    } else if (nominal < 500000000) {
        return 3.5;
    } else {
        return 3.0
    }
}

function updateBungaOtomatis(element) {
    formatInputRupiah(element)
    let cursorPosition = element.selectionStart;
    let angkaMurniString = element.value.replace(/[^0-9]/g, "");
    let nominal = parseInt(angkaMurniString) || "";

    element.value = nominal.toLocaleString('id-ID');

    const rate = dapatkanRate(nominal);

    const bungaTeks = document.getElementById('bungaTerdeteksi');
    if (nominal > 0) {
        bungaTeks.innerText = rate.toFixed(1) + "%";
    } else {
        bungaTeks.innerText = "0%";
    }
}

function hitungCicilanBank() {
    const P = bersihAngka(document.getElementById('pokokBank').value);
    const n = parseInt(document.getElementById('bulanBank').value);

    const rateAnnually = dapatkanRate(P) / 100;

    if (P <= 0 || isNaN(n)) {
        alert("Masukan nominal dan tenor dengan benar");
        return;
    };

    const t = n / 12;
    const totalBunga = P * rateAnnually * t;
    const totalBayar = P + totalBunga;
    const cicilan = (P + totalBunga) / n;

    document.getElementById('resPinjamBank').innerText = formatRupiah(P);
    document.getElementById('resBungaBank').innerText = formatRupiah(totalBunga);
    document.getElementById('resTotalBank').innerText = formatRupiah(totalBayar);
    document.getElementById('resBulananBank').innerText = formatRupiah(cicilan);
    document.getElementById('hasilBank').style.display = 'block';
}

function formatRupiah(angka) {
    return new Intl.NumberFormat('id-Id', {
        style: 'currency',
        currency: 'IDR',
    }).format(angka);
}
