<template>
  <div id="wrapper">
    <Sidebar :class="sidebarClass" />

    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <Navbar @toggle-sidebar="toggleSidebar" />

        <div class="container-fluid mt-4">
          <h1 class="h3 mb-0 text-gray-800 text-center">Stok PS</h1>

          <button class="btn btn-primary mb-3" @click="openModal('create')">
            Add Menu
          </button>

          <table class="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Jenis</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(menu, index) in menus" :key="menu.id">
                <td>{{ index + 1 }}</td>
                <td>
                  <img :src="`https://apirental.keuanganfpti.com/storage/${menu.image}`" alt="Menu Image" style="max-width: 100px; max-height: 100px" />
                </td>
                <td>{{ menu.name }}</td>
                <td>{{ menu.jenis }}</td>
                <td>
                  <button class="btn btn-warning btn-sm me-2" @click="openModal('update', menu)">
                    Edit
                  </button>
                  <button class="btn btn-danger btn-sm" @click="deleteMenu(menu.id)">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Footer />
      </div>
    </div>

    <!-- Modal Create & Update -->
    <div class="modal fade" id="menuModal" tabindex="-1" aria-labelledby="menuModalLabel" aria-hidden="true" ref="menuModalRef">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="menuModalLabel">{{ isEdit ? 'Update Menu' : 'Create Menu' }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input v-model="form.name" class="form-control mb-3" placeholder="Menu Name" />
            <select v-model="form.jenis" class="form-control mb-3">
              <option value="">Pilih Jenis PS</option>
              <option value="PS 4">PS 4</option>
              <option value="PS 5">PS 5</option>
            </select>
            <input type="file" class="form-control mb-3" @change="handleFileUpload" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="hideModal">Batal</button>
            <button type="button" class="btn btn-primary" @click="submitForm">{{ isEdit ? 'Update' : 'Create' }}</button>
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
  name: "MenuManagement",

  components: {
    Sidebar,
    Navbar,
    Footer,
  },

  data() {
    return {
      sidebarToggled: false,
      sidebarClass: "",
      menus: [],
      form: {
        id: "",
        name: "",
        jenis: "",
        image: null,
      },
      isEdit: false,
      modalInstance: null,
    };
  },

  methods: {
    toggleSidebar() {
      this.sidebarToggled = !this.sidebarToggled;
      this.sidebarClass = this.sidebarToggled ? "toggle-sidebar" : "";
    },

    async fetchMenus() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/menu/list`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        this.menus = response.data.data;
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    },

    handleFileUpload(event) {
      this.form.image = event.target.files[0];
    },

    async submitForm() {
      const formData = new FormData();
      this.isEdit ? formData.append("id", this.form.id) : "";
      formData.append("name", this.form.name);
      formData.append("jenis", this.form.jenis);
      if (this.form.image) {
        formData.append("image", this.form.image);
      }

      const endpoint = this.isEdit ? `/menu/update` : "/menu/create";

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}${endpoint}`, formData, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        Swal.fire("Success!", this.isEdit ? "Menu updated successfully" : "Menu created successfully", "success");
        this.hideModal();
        this.resetForm();
        this.fetchMenus();
      } catch (error) {
        Swal.fire("Error!", "An error occurred while processing the request.", "error");
      }
    },

    openModal(mode, menu = null) {
      this.isEdit = mode === "update";
      if (this.isEdit && menu) {
        this.form = { ...menu, image: null };
      } else {
        this.resetForm();
      }
      this.modalInstance = new bootstrap.Modal(this.$refs.menuModalRef);
      this.modalInstance.show();
    },

    hideModal() {
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
    },

    resetForm() {
      this.form = { id: "", name: "", jenis: "", image: null };
      this.isEdit = false;
    },

    async deleteMenu(menuId) {
  try {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirmation.isConfirmed) {
      await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/menu/delete/${menuId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      Swal.fire("Deleted!", "Menu has been deleted.", "success");
      this.fetchMenus(); // Refresh data setelah delete
    }
  } catch (error) {
    Swal.fire("Error!", "An error occurred while deleting the menu.", "error");
  }
}

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
        this.fetchMenus();
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
