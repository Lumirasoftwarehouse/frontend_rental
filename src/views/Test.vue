<template>
  <div id="app">
    <h1>Input Harga dengan Format Rupiah</h1>
    <input
      type="text"
      :value="formatRupiah(hargaInput)" 
      @input="updateHarga($event.target.value)"
      placeholder="Masukkan harga"
    />
    <p>Harga yang disimpan: {{ hargaInput }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hargaInput: "" // Ini akan menyimpan angka saja, tanpa format
    };
  },
  methods: {
    // Fungsi untuk memformat tampilan Rupiah
    formatRupiah(angka) {
      if (!angka) return "";
      
      let numberString = angka.toString().replace(/[^\d]/g, "");
      let sisa = numberString.length % 3;
      let rupiah = numberString.substr(0, sisa);
      let ribuan = numberString.substr(sisa).match(/\d{3}/g);
      
      if (ribuan) {
        let separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
      }

      return "Rp. " + rupiah;
    },
    
    // Fungsi untuk mengupdate data harga dan memastikan hanya angka yang disimpan
    updateHarga(value) {
      // Menghapus semua karakter selain angka
      let angka = value.replace(/[^\d]/g, "");
      this.hargaInput = angka;
    }
  }
};
</script>

<style scoped>
input {
  font-size: 16px;
  padding: 10px;
  width: 300px;
}
</style>
