<template>
  <div id="wrapper">
    <Sidebar :class="sidebarClass" />

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <Navbar @toggle-sidebar="toggleSidebar" />

        <!-- Begin Page Content -->
        <div id="app" ref="document">
          <div class="row mt-4">
            <div class="col-1"></div>
            <div class="col-10">
              <div class="row">
                <div class="col-6">
                  <router-link to="/nota" class="btn btn-danger mb-5"
                    >Kembali</router-link
                  >
                </div>
                <div class="col-6">
                  <button
                    @click="exportToPDF()"
                    class="btn btn-success float-end"
                  >
                    Export to PDF
                  </button>
                </div>
              </div>
            </div>
            <div class="col-1"></div>
          </div>
          <div id="element-to-convert">
            <div class="container text-black bg-white">
              <!-- Detail Nota -->
              <div v-if="note.length > 0">
                <div v-for="(item, index) in note" :key="index">
                  <div class="row mb-3">
                    <div class="col-5">
                      <div class="row">
                        <div class="col-4">
                          <img src="/img/amitie.jpg" alt="logo" width="80" />
                        </div>
                        <div class="col-8 text-center">
                          <h5 class="fw-bold" style="font-family: serif">
                            Biro Jasa
                          </h5>
                          <h4 class="fw-bold" style="font-family: serif">
                            ''AMITIE''
                          </h4>

                          <div style="font-size: 10px">
                            Jln Bidara Raya No.9 RT02 RW04
                          </div>
                          <div style="font-size: 10px">
                            Jembatan Dua, Penjaringan
                          </div>
                          <div style="font-size: 10px">Jakarta Utara</div>
                          <div style="font-size: 10px">
                            Telp. 021-6620191, 021-6625312
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-7">
                      <div class="row">
                        <div class="col-5"></div>
                        <div class="col-7">
                          <p class="" style="font-size: 12px">
                            {{ "Jakarta, " + formatTanggal(tanggal) }}
                          </p>
                        </div>
                      </div>
                      <div class="row mt-3">
                        <div class="col-5"></div>
                        <div class="col-7">
                          <span style="font-size: 12px">Kepada Yth.</span><br />
                          <span style="font-size: 12px">{{ pelanggan }}</span>
                        </div>
                      </div>
                    </div>
                    <span
                      class="text-center mt-3 fw-bold"
                      style="font-size: 20px"
                      >RECEIPT</span
                    >
                    <div class="row">
                      <!-- <div class="col-1"></div> -->
                      <div class="col-6 border border-dark">
                        <div class="row">
                          <div class="col-4" style="font-size: 12px">
                            Proses
                          </div>
                          <div class="col-8" style="font-size: 12px">
                            : {{ item.proses }}
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-4" style="font-size: 12px">
                            Atas Nama
                          </div>
                          <div class="col-8" style="font-size: 12px">
                            : {{ item.atas_nama }}
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-4" style="font-size: 12px">
                            Kendaraan
                          </div>
                          <div class="col-8" style="font-size: 12px">
                            : {{ item.kendaraan }}
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-4" style="font-size: 12px">
                            No Polisi
                          </div>
                          <div class="col-8" style="font-size: 12px">
                            : {{ item.no_polisi }}
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-4" style="font-size: 12px">
                            Keterangan
                          </div>
                          <div class="col-8" style="font-size: 12px">
                            :<span
                              v-html="formatKeterangan(item.keterangan)"
                            ></span>
                          </div>
                        </div>
                      </div>
                      <div class="col-6 border border-dark">
                        <div class="row">
                          <div class="col-5" style="font-size: 12px">
                            Resmi STNK (Rp)
                          </div>
                          <div class="col-7" style="font-size: 12px">
                            :
                            <div class="float-end">
                              {{ formatCurrency(item.stnk_resmi) }}
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-5" style="font-size: 12px">
                            Jasa (Rp)
                          </div>
                          <div class="col-7" style="font-size: 12px">
                            :
                            <div class="float-end">
                              {{ formatCurrency(item.jasa) }}
                            </div>
                          </div>
                        </div>
                        <div style="font-size: 12px">Lain-lain (Rp.)</div>
                        <div v-for="lain in item.biaya_lain" :key="lain.id">
                          <div class="row">
                            <div class="col-5" style="font-size: 12px">
                              {{ lain.label }}
                            </div>
                            <div class="col-7" style="font-size: 12px">
                              :
                              <div class="float-end">
                                {{ formatCurrency(lain.nominal) }}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="row border border-dark">
                          <div class="col-5" style="font-size: 12px">
                            <strong>Total (Rp.)</strong>
                          </div>
                          <div class="col-7" style="font-size: 12px">
                            :
                            <div class="float-end">
                              {{ formatCurrency(item.total) }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="col-1"></div> -->
                    </div>
                    <div class="row mt-2">
                      <div class="col-5 border border-dark">
                        <span style="font-size: 10px"
                          >Pembayaran Cheque/Giro/Transfer</span
                        ><br />

                        <span style="font-size: 10px"
                          ><span class="text-danger">BCA 311.113.1331</span> a/n
                          MARTINEZ</span
                        ><br />
                        <span class="text-danger" style="font-size: 10px"
                          >Cabang Latumenten</span
                        >
                      </div>
                      <div class="col-7 text-center">
                        <!-- <h5
                          class="text-end"
                          v-if="note.length - 1 == index"
                          style="font-size: 12px"
                        >
                          Jumlah Keseluruhan: {{ formatCurrency(grandTotal) }}
                        </h5> -->
                        <span style="font-size: 12px">Hormat Kami</span>
                      </div>
                    </div>
                  </div>

                  <br /><br /><br /><br /><br />
                  <!-- Keterangan Cetak -->
                  <div
                    class="row mt-2"
                    v-if="note.length - 1 == index"
                    style="font-size: 12px"
                  >
                    <small
                      >Dokument ini dicetak pada: {{ now.date }}
                      {{ now.time }}</small
                    >
                  </div>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->
      <!-- Footer -->
      <Footer />
      <!-- End of Footer -->
    </div>
    <!-- End of Content Wrapper -->
  </div>
</template>

<script>
import axios from "axios";
import html2pdf from "html2pdf.js";
import Navbar from "../components/general/Navbar.vue";
import Footer from "../components/general/Footer.vue";
import Sidebar from "../components/admin/Sidebar.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Navbar,
    Footer,
    Sidebar,
  },
  props: {
    id: {
      type: Number, // Karena sudah di-convert ke integer
      required: true,
    },
    index: {
      type: Number, // Karena sudah di-convert ke integer
      required: true,
    },
  },
  data() {
    return {
      note: [],
      alamat: "",
      tanggal: "",
      pelanggan: "",
      now: {},
      load: true,
    };
  },
  computed: {
    grandTotal() {
      return this.note.reduce((sum, item) => sum + parseFloat(item.total), 0);
    },
  },
  methods: {
    formatTanggal(dateString) {
      const bulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      const [year, month, day] = dateString.split("-");
      return `${parseInt(day)} ${bulan[parseInt(month) - 1]} ${year}`;
    },
    formatKeterangan(keterangan) {
      // Ganti semua newline (\n) dengan <br> untuk membuat baris baru
      return keterangan ? keterangan.replace(/\n/g, "<br> ") : "";
    },
    getCurrentDateTime() {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      this.now = {
        date: `${day}-${month}-${year}`,
        time: `${hours}:${minutes}:${seconds}`,
      };
    },
    async fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/nota/detail/${this.id}`
        );
        this.note = response.data.data.notes;
        this.alamat = response.data.data.alamat;
        this.tanggal = response.data.data.tanggal;
        this.pelanggan = response.data.data.nama_pelanggan;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    exportToPDF() {
      const element = document.getElementById("element-to-convert");
      const opt = {
        margin: 0.5,
        filename: `nota_${this.pelanggan}_${this.tanggal}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: [8.27, 6.53], orientation: "landscape" },
      };

      html2pdf()
        .from(element)
        .set(opt)
        .outputPdf("bloburl") // Menghasilkan URL Blob
        .then((pdfUrl) => {
          const iframe = document.createElement("iframe");
          iframe.style.display = "none";
          iframe.src = pdfUrl;
          document.body.appendChild(iframe);
          iframe.contentWindow.print(); // Memulai dialog cetak
        });
    },

    // formatCurrency(value) {
    //   return new Intl.NumberFormat("id-ID", {
    //     style: "currency",
    //     currency: "IDR",
    //   }).format(value);
    // },

    formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        currencyDisplay: "code", // Menampilkan format dengan "IDR" yang akan kita hapus
        minimumFractionDigits: 0, // Menghapus desimal jika tidak diperlukan
      })
        .format(value)
        .replace("IDR", "")
        .trim(); // Menghapus "IDR" dan spasi ekstra
    },
  },
  created() {
    if (this.index == 1) {
      //window.location.href = `http://localhost:5173/print?id=${this.id}`;
      window.location.href = `https://amitie.lumirainternational.com/print?id=${this.id}`;
    }
    // this.idNota = this.$route.query.id;
    this.getCurrentDateTime();
    this.fetchData();
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .imageCustom {
    width: 100% !important;
  }
}
#app {
  margin-top: 60px;
}
</style>