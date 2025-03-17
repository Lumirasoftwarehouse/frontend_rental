<template>
  <div id="wrapper">
    <Sidebar :class="sidebarClass" />

    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <Navbar @toggle-sidebar="toggleSidebar" />

        <div class="container-fluid mt-4">
          <h1 class="h3 mb-0 text-gray-800 text-center mb-3">
            Manajemen Pemesanan
          </h1>

          <!-- <button class="btn btn-primary mb-3" @click="openModal('create')">
            <i class="bi bi-plus-lg"></i> Pemesanan
          </button> -->

          <table class="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Tanggal Sewa</th>
                <th>Durasi</th>
                <th>Menu</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(pemesanan, index) in pemesananList"
                :key="pemesanan.id"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ pemesanan.tanggal_sewa }}</td>
                <td>{{ pemesanan.durasi }}</td>
                <td>{{ pemesanan.menu.name }}</td>
                <td>{{ pemesanan.payment.status }}</td>
                <td>
                  <button
                    class="btn btn-warning btn-sm me-2"
                    @click="openModal('update', pemesanan)"
                  >
                    <i class="bi bi-pencil-square"></i> Edit
                  </button>
                  <button
                    class="btn btn-danger btn-sm"
                    @click="deletePemesanan(pemesanan.id)"
                  >
                    <i class="bi bi-trash3-fill"></i> Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Footer />
      </div>
    </div>

    <div
      class="modal fade"
      id="pemesananModal"
      tabindex="-1"
      aria-labelledby="pemesananModalLabel"
      aria-hidden="true"
      ref="pemesananModalRef"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ isEdit ? "Update Pemesanan" : "Tambah Pemesanan" }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="hideModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label for="tanggal_sewa">Tanggal Sewa</label>
            <input
              v-model="form.tanggal_sewa"
              type="date"
              class="form-control mb-3"
              @change="fetchAvailableMenu"
            />
            <label for="durasi">Durasi (hari)</label>
            <input
              v-model.number="form.durasi"
              type="number"
              class="form-control mb-3"
              placeholder="Durasi"
            />
            <label for="menu_id">Menu Sewa</label>
            <select v-model="form.menu_id" class="form-control mb-3">
              <option value="">Pilih Menu</option>
              <option
                v-for="menu in availableMenu"
                :key="menu.id"
                :value="menu.id"
              >
                {{ menu.name }} - {{ menu.jenis }}
              </option>
            </select>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="hideModal">
              Batal
            </button>
            <button type="button" class="btn btn-primary" @click="submitForm">
              {{ isEdit ? "Update" : "Tambah" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../components/admin/Sidebar.vue";
import Navbar from "../components/general/Navbar.vue";
import Footer from "../components/general/Footer.vue";

export default {
  name: "PemesananManagement",

  components: {
    Sidebar,
    Navbar,
    Footer,
  },

  data() {
    return {
      pemesananList: [],
      availableMenu: [],
      form: {
        id: "",
        tanggal_sewa: "",
        durasi: 1,
        menu_id: "",
      },
      isEdit: false,
      modalInstance: null,
    };
  },

  methods: {
    async fetchPemesanan() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/pemesanan/list`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        this.pemesananList = response.data.data;
      } catch (error) {
        console.error("Error fetching pemesanan:", error);
      }
    },

    async fetchAvailableMenu() {
      if (!this.form.tanggal_sewa) return;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT}/menu/available`,
          {
            tanggal: this.form.tanggal_sewa,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        this.availableMenu = response.data;
      } catch (error) {
        console.error("Error fetching available menu:", error);
      }
    },

    async submitForm() {
      const endpoint = this.isEdit ? `/pemesanan/update` : `/pemesanan/create`;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT}${endpoint}`,
          this.form,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        if (
          response.data &&
          response.data.data &&
          response.data.data.redirect_url
        ) {
          // Redirect to Midtrans payment page
          window.location.href = response.data.data.redirect_url;
        } else {
          Swal.fire(
            "Success!",
            this.isEdit ? "Pemesanan diperbarui!" : "Pemesanan ditambahkan!",
            "success"
          );
          this.hideModal();
          this.fetchPemesanan();
        }
      } catch (error) {
        Swal.fire("Error!", "Terjadi kesalahan dalam proses.", "error");
      }
    },

    async deletePemesanan(id) {
      const confirmation = await Swal.fire({
        title: "Yakin ingin menghapus?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      });

      if (confirmation.isConfirmed) {
        try {
          await axios.delete(
            `${import.meta.env.VITE_API_ENDPOINT}/pemesanan/delete/${id}`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );
          Swal.fire("Berhasil!", "Pemesanan berhasil dihapus.", "success");
          this.fetchPemesanan();
        } catch (error) {
          Swal.fire("Error!", "Gagal menghapus pemesanan.", "error");
        }
      }
    },

    openModal(mode, pemesanan = null) {
      this.isEdit = mode === "update";
      this.form = pemesanan
        ? { ...pemesanan }
        : { id: "", tanggal_sewa: "", durasi: 1, menu_id: "", user_id: "" };
      this.modalInstance = new bootstrap.Modal(this.$refs.pemesananModalRef);
      this.modalInstance.show();
    },

    hideModal() {
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
    },
  },

  created() {
    const currentTimeUTC = new Date().toUTCString();
    console.log("Waktu Sekarang (UTC):", currentTimeUTC);
    const token = sessionStorage.getItem("token"); // Ambil token dari local storage

    if (token) {
      try {
        const [headerBase64, signatureBase64] = token.split(".");
        const header = JSON.parse(atob(headerBase64));
        const signature = atob(signatureBase64);

        const tokenPayload = JSON.parse(atob(token.split(".")[1])); // Mendekode bagian payload dari token JWT
        const expTimestamp = tokenPayload.exp;

        const expDate = new Date(expTimestamp * 1000); // Konversi Unix Timestamp ke JavaScript Date

        console.log("Waktu Kedaluwarsa (UTC):", expDate.toUTCString()); // Tampilkan waktu kedaluwarsa dalam format UTC

        if (new Date() > expDate) {
          console.log("Keluar");
          sessionStorage.removeItem("token");
          this.$router.push("/");
        } else {
          console.log("Aman");
        }
        const level = tokenPayload.level; // Ambil level pengguna dari payload
        this.user_id = tokenPayload.id;
        if (level !== "0") {
          this.$router.push("/unauthorized");
        } else if (!header || !signature) {
          this.$router.push("/");
          sessionStorage.removeItem("token");
        }
        // success
        this.fetchPemesanan();
        // akhir
      } catch (error) {
        console.error("Error decoding token:", error);
        this.$router.push("/"); // Tindakan jika terjadi kesalahan dekode
      }
    } else {
      this.$router.push("/"); // Tindakan jika token tidak ada (pengguna belum terautentikasi)
    }
  },
};
</script>

<style scoped>
#content-wrapper {
  min-height: 780px !important;
}
</style>
