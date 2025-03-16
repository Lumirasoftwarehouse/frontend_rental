<template>
  <div>
    <div v-for="(biaya, index) in biayaList" :key="index" class="row mb-2">
      <div class="col-5">
        <input 
          v-model="biaya.label" 
          type="text" 
          class="form-control" 
          placeholder="Label" 
          @input="handleInputChange"
        />
      </div>
      <div class="col-5">
        <input 
          :value="formatRupiah(biaya.nominal)" 
          type="text" 
          class="form-control" 
          placeholder="Nominal" 
          @input="handleNominalInput($event, index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: { type: Number, required: true }, // Indeks dari parent
  },
  data() {
    return {
      biayaList: [{ label: "", nominal: 0 }], // Mulai dengan satu input default
    };
  },
  methods: {
    // Fungsi untuk memformat angka ke format rupiah
    formatRupiah(value) {
      const number = Number(value) || 0; // Pastikan nilai berupa angka
      return `Rp ${number.toLocaleString("id-ID")}`; // Format ke mata uang Indonesia
    },

    // Fungsi untuk menghapus format rupiah dan mengambil nilai asli
    parseRupiah(value) {
      return Number(value.replace(/[^0-9]/g, "")); // Hapus semua karakter kecuali angka
    },

    handleNominalInput(event, index) {
      const rawValue = event.target.value; // Ambil nilai input dari event
      const parsedValue = this.parseRupiah(rawValue); // Konversi kembali ke angka asli
      this.biayaList[index].nominal = parsedValue; // Simpan angka asli ke data

      // Perbarui tampilan input dengan format rupiah
      event.target.value = this.formatRupiah(parsedValue);

      // Panggil metode untuk mengirim data ke parent
      this.handleInputChange();
    },

    handleInputChange() {
      const lastItem = this.biayaList[this.biayaList.length - 1];
      // Tambahkan input baru jika input terakhir sudah diisi
      if (lastItem.label.trim() !== "" || lastItem.nominal > 0) {
        this.biayaList.push({ label: "", nominal: 0 });
      }
      // Kirim data ke parent secara realtime dengan indeks
      this.$emit("update-biaya", { index: this.index, biayaList: this.biayaList });
    },
  },
};
</script>
