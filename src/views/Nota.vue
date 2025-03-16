<script setup>
import Sidebar from "../components/admin/Sidebar.vue";
import Navbar from "../components/general/Navbar.vue";
import Footer from "../components/general/Footer.vue";
import Card from "../components/general/Card.vue";
import CreateNota from "../components/general/CreateNota.vue";
import { ref } from "vue";

const sidebarToggled = ref(false);
const sidebarClass = ref("");

const toggleSidebar = () => {
  sidebarToggled.value = !sidebarToggled.value;
  sidebarClass.value = sidebarToggled.value ? "toggle-sidebar" : "";
};
</script>
<template>
  <div id="wrapper">
    <Sidebar :class="sidebarClass" />

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <Navbar @toggle-sidebar="toggleSidebar" />

        <!-- Begin Page Content -->
        <div class="container-fluid mt-4">
          <h1 class="h3 mb-0 text-gray-800 text-center">List Nota</h1>

          <button
            type="button"
            class="btn btn-primary float-end"
            data-toggle="modal"
            data-target="#modalAdd"
          >
            Tambah Nota<i class="bi bi-info"></i>
          </button>
          <div class="table-responsive">
            <div v-if="!ready" class="preloader text-center">Loading...</div>
            <DataTable class="display table table-striped" v-if="ready">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Aksi</th>
                  <th scope="col">Pelanggan</th>
                  <th scope="col">Alamat</th>
                  <th scope="col">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in notes" :key="item.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic mixed styles example"
                    >
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#modalDetail"
                        @click="setData(item)"
                      >
                        <i class="bi bi-info"></i>
                      </button>
                      <button class="btn btn-secondary" @click="goToPrint(item.id)">
                      <!-- <router-link
                        v-if="detailNota && detailNota.id"
                        :to="{
                          path: '/print',
                          query: { id: parseInt(detailNota.id), index: 1 },
                        }"
                        
                      >
                        <div >
                        </div>
                      </router-link> -->
                          <i class="bi bi-printer-fill"></i>

                      </button>

                      <button
                        type="button"
                        class="btn btn-danger"
                        @click="confirmDelete(item)"
                      >
                        <i class="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </td>
                  <td>{{ item.nama_pelanggan }}</td>
                  <td>{{ item.alamat }}</td>
                  <td>{{ item.tanggal }}</td>
                </tr>
              </tbody>
            </DataTable>
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

  <CreateNota @save-notes="handleSaveNotes" />

  <!-- modal detail -->
  <div
    class="modal fade"
    id="modalDetail"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalDetailLabel"
    aria-hidden="true"
    ref="modalDetailRef"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalDetailLabel">Modal Detail Nota</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">
              <div class="col-sm-3"></div>
              <div class="col-sm-4">
                <input
                  type="text"
                  class="form-control"
                  :value="`${detailNota.alamat}, ${detailNota.tanggal}`"
                  disabled
                />
              </div>
              <div class="col-sm-4">
                <input
                  type="text"
                  class="form-control"
                  v-model="detailNota.nama_pelanggan"
                  disabled
                />
              </div>
              <!-- <div class="col-sm-1">
                <router-link
                  v-if="detailNota && detailNota.id"
                  :to="{
                    path: '/print',
                    query: { id: parseInt(detailNota.id), index: 1 },
                  }"
                >
                  <div class="btn btn-secondary">
                    <i class="bi bi-printer-fill"></i>
                  </div>
                </router-link>
              </div> -->
            </div>

            <div class="row mt-2"></div>

            <div
              class="row"
              v-for="(item, index) in detailNota.notes"
              :key="item.id"
            >
              <span class="text-center h4 fw-bold text-dark mt-4"
                >RECEIPT {{ index + 1 }}</span
              >
              <!-- Kolom Kiri: Proses, Atas Nama, Kendaraan, No Polisi, Keterangan -->
              <div class="col-md-6 col-12 mb-3 border border-dark p-3">
                <div class="form-group row">
                  <label class="col-md-4 col-12 col-form-label">Proses:</label>
                  <div class="col-md-8 col-12">
                    <input
                      type="text"
                      class="form-control"
                      v-model="item.proses"
                      disabled
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-4 col-12 col-form-label"
                    >Atas Nama:</label
                  >
                  <div class="col-md-8 col-12">
                    <input
                      type="text"
                      class="form-control"
                      v-model="item.atas_nama"
                      disabled
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-4 col-12 col-form-label"
                    >Kendaraan:</label
                  >
                  <div class="col-md-8 col-12">
                    <input
                      type="text"
                      class="form-control"
                      v-model="item.kendaraan"
                      disabled
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-4 col-12 col-form-label"
                    >No Polisi:</label
                  >
                  <div class="col-md-8 col-12">
                    <input
                      type="text"
                      class="form-control"
                      v-model="item.no_polisi"
                      disabled
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-4 col-12 col-form-label"
                    >Keterangan:</label
                  >
                  <div class="col-md-8 col-12">
                    <textarea
                      class="form-control"
                      v-model="item.keterangan"
                      rows="5"
                      disabled
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Kolom Kanan: Resmi STNK, Jasa, Lain-lain, Total -->
              <div class="col-md-6 col-12 mb-3 border border-dark p-3">
                <div class="form-group row">
                  <label class="col-md-4 col-12 col-form-label"
                    >Resmi STNK</label
                  >
                  <div class="col-md-8 col-12">
                    <input
                      type="text"
                      class="form-control"
                      :value="formatCurrency(item.stnk_resmi)"
                      disabled
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-4 col-12 col-form-label">Jasa</label>
                  <div class="col-md-8 col-12">
                    <input
                      type="text"
                      class="form-control"
                      :value="formatCurrency(item.jasa)"
                      disabled
                    />
                  </div>
                </div>

                <div class="form-group row" v-if="item.lain_1">
                  <label class="col-md-4 col-12 col-form-label"
                    >Lain-lain</label
                  >
                  <div class="col-md-8 col-12">
                    <input
                      type="text"
                      class="form-control"
                      :value="formatCurrency(item.lain_1)"
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group row" v-if="item.lain_2 != '0'">
                  <label class="col-md-4 col-12 col-form-label"></label>
                  <div class="col-md-8 col-12">
                    <input
                      type="text"
                      class="form-control"
                      :value="formatCurrency(item.lain_2)"
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group row" v-if="item.lain_3 != '0'">
                  <label class="col-md-4 col-12 col-form-label"></label>
                  <div class="col-md-8 col-12">
                    <input
                      type="text"
                      class="form-control"
                      :value="formatCurrency(item.lain_3)"
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-md-4 col-12 col-form-label"></label>
                  <div class="col-md-8 col-12" v-if="item.lain_4 != '0'">
                    <input
                      type="text"
                      class="form-control"
                      :value="formatCurrency(item.lain_4)"
                      disabled
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-4 col-12 col-form-label">Total</label>
                  <div class="col-md-8 col-12">
                    <input
                      type="text"
                      class="form-control"
                      :value="formatCurrency(item.total)"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- test -->

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal detail -->

  <!-- modal update -->
  <div
    class="modal fade"
    id="modalUpdate"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalUpdateLabel"
    aria-hidden="true"
    ref="modalUpdateRef"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalUpdateLabel">Modal Update Nota</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createNote">
            <div class="row">
              <div class="col-sm-4"></div>
              <div class="col-sm-4">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Tempat, DD MONTH YYYY"
                  disabled
                />
              </div>
              <div class="col-sm-4">
                <input
                  type="text"
                  class="form-control"
                  placeholder="nama customer"
                  disabled
                />
              </div>
            </div>

            <div class="row mt-2">
              <span class="text-center h4 fw-bold text-dark">RECEIPT</span>
            </div>

            <div class="row">
              <!-- Kolom Kiri: Proses, Atas Nama, Kendaraan, No Polisi, Keterangan -->
              <div class="col-md-6 col-12 mb-3 border border-dark p-3">
                <div class="form-group row">
                  <label class="col-md-4 col-12 col-form-label">Proses:</label>
                  <div class="col-md-8 col-12">
                    <input
                      type="text"
                      class="form-control"
                      v-model="detailNota.proses"
                      disabled
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-4 col-12 col-form-label"
                    >Atas Nama:</label
                  >
                  <div class="col-md-8 col-12">
                    <input
                      type="text"
                      class="form-control"
                      v-model="detailNota.atas_nama"
                      disabled
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-4 col-12 col-form-label"
                    >Kendaraan:</label
                  >
                  <div class="col-md-8 col-12">
                    <input
                      type="text"
                      class="form-control"
                      v-model="detailNota.kendaraan"
                      disabled
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-4 col-12 col-form-label"
                    >No Polisi:</label
                  >
                  <div class="col-md-8 col-12">
                    <input
                      type="text"
                      class="form-control"
                      v-model="detailNota.no_polisi"
                      disabled
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-4 col-12 col-form-label"
                    >Keterangan:</label
                  >
                  <div class="col-md-8 col-12">
                    <textarea
                      class="form-control"
                      v-model="detailNota.keterangan"
                      disabled
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Kolom Kanan: Resmi STNK, Jasa, Lain-lain, Total -->
              <div class="col-md-6 col-12 mb-3 border border-dark p-3">
                <div class="form-group row">
                  <label class="col-md-4 col-12 col-form-label"
                    >Resmi STNK (Rp.):</label
                  >
                  <div class="col-md-8 col-12">
                    <input
                      type="number"
                      class="form-control"
                      v-model="detailNota.stnk_resmi"
                      disabled
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-4 col-12 col-form-label"
                    >Jasa (Rp.):</label
                  >
                  <div class="col-md-8 col-12">
                    <input
                      type="number"
                      class="form-control"
                      v-model="detailNota.jasa"
                      disabled
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-4 col-12 col-form-label"
                    >Lain-lain (Rp.):</label
                  >
                  <div class="col-md-8 col-12">
                    <input
                      type="number"
                      class="form-control"
                      v-model="detailNota.lain_lain"
                      disabled
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-4 col-12 col-form-label"
                    >Total (Rp.):</label
                  >
                  <div class="col-md-8 col-12">
                    <input
                      type="number"
                      class="form-control"
                      :value="
                        Number(detailNota.jasa) +
                        Number(detailNota.lain_lain) +
                        Number(detailNota.stnk_resmi)
                      "
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- test -->

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal update -->
</template>
<script>
import axios from "axios";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
DataTable.use(DataTablesCore);
import Swal from "sweetalert2";

export default {
  data() {
    return {
      notes: [],
      newNota: {
        proses: "",
        atas_nama: "",
        kendaraan: "",
        no_polisi: "",
        keterangan: "",
        stnk_resmi: "",
        jasa: "",
        lain_lain: "",
      },
      detailNota: [],
      user_id: "",
      ready: false,
      remainingTime: "Loading",
    };
  },
  methods: {
    setData(nota) {
      this.detailNota = nota;

      // console.log('test detail :', nota);
      console.log("test update :", this.detailNota.notes);
    },
    async handleSaveNotes(data) {
      const { header, notes } = data;
      console.log("Notes received:", notes);
      console.log("Header received:", header);

      // Pastikan setiap note memiliki field yang dibutuhkan dan valid
      const formattedNotes = notes.map((note) => ({
        // alamat: note.alamat || "Alamat tidak diisi", // Mengisi dengan nilai default jika kosong
        tanggal: note.tanggal || new Date().toISOString().slice(0, 10), // Menggunakan tanggal saat ini jika kosong
        pelanggan: note.pelanggan || "Pelanggan tidak diisi", // Mengisi dengan nilai default jika kosong
        proses: note.proses || "Proses tidak diisi", // Mengisi dengan nilai default jika kosong
        atas_nama: note.atas_nama || "Atas nama tidak diisi", // Mengisi dengan nilai default jika kosong
        kendaraan: note.kendaraan || "Kendaraan tidak diisi", // Mengisi dengan nilai default jika kosong
        no_polisi: note.no_polisi || "Nomor polisi tidak diisi", // Mengisi dengan nilai default jika kosong
        keterangan: note.keterangan || "Keterangan tidak diisi", // Mengisi dengan nilai default jika kosong
        stnk_resmi: note.stnk_resmi || 0, // Mengisi dengan 0 jika kosong
        jasa: note.jasa || 0, // Mengisi dengan 0 jika kosong
        biaya_lain: note.biayaLain || 0, // Mengisi dengan 0 jika kosong
        total:
          note.stnk_resmi +
          note.jasa +
          note.biayaLain.reduce((sum, biaya) => sum + biaya.nominal, 0),
      }));

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT}/create-new`,
          // `${import.meta.env.VITE_API_ENDPOINT}/nota/create`,
          { notes: formattedNotes, header: header }, // Kirimkan array notes dengan format yang benar
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );

        this.fetchDataNotes();

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: `Data berhasil diupdate`,
        });

        $("#modalAdd").modal("hide");
      } catch (error) {
        console.error("Error creating note:", error);

        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const apiErrors = error.response.data.errors;
          for (const [field, messages] of Object.entries(apiErrors)) {
            console.error(`${field}: ${messages.join(", ")}`);
          }
        }
      }
    },
    async createNote() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT}/nota/create`,
          this.newNota,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.fetchDataNotes();
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: `Data berhasil diupdate`,
        });
        $("#modalAdd").modal("hide");
        this.resetForm(); // Reset form
      } catch (error) {
        console.error("Error creating note:", error);
      }
    },
    resetForm() {
      this.newNota = {
        proses: "",
        atas_nama: "",
        kendaraan: "",
        no_polisi: "",
        keterangan: "",
        stnk_resmi: "",
        jasa: 0,
        lain_lain: "",
      };
    },
    async fetchDataNotes() {
      try {
        this.ready = false;
        const response = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/nota/list`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.notes = response.data.data;
        this.ready = true;
      } catch (error) {
        this.ready = true;
        console.error(error);
      }
    },
    async downloadPdf(pelangganId) {
      window.location.href = `${
        import.meta.env.VITE_API_ENDPOINT
      }/nota/export/${pelangganId}`;
    },
    confirmDelete(data) {
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: `Data ${data.proses} akan dihapus!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteDataNota(data.id);
        }
      });
    },
    async deleteDataNota(id) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_ENDPOINT}/nota/delete-pelanggan/${id}`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.fetchDataNotes();
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: `Data ${this.currentTab} berhasil dihapus`,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Request Failed",
          text: `Data ${this.currentTab} gagal dihapus`,
        });
        console.error(error);
      }
    },

    formatCurrency(value) {
      let numericValue = parseFloat(value);
      if (isNaN(numericValue)) {
        return "0";
      }
      // Pemformatan angka dengan pemisah ribuan
      return numericValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    goToPrint(idNota) {
      this.$router.push({ name: "print", query: { id: parseInt(idNota), index: 1 } });
    },
  },
  created() {
    this.fetchDataNotes();
  },
};
</script>


<style>
#content-wrapper {
  min-height: 780px !important;
}
</style>
