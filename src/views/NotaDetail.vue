<script setup>
import Sidebar from "../components/admin/Sidebar.vue";
import Navbar from "../components/general/Navbar.vue";
import Footer from "../components/general/Footer.vue";
import Card from "../components/general/Card.vue";
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
          <div class="row">
            <div class="col-4"></div>
            <div class="col-4"></div>
            <div class="col-4">
               <input
                    type="text"
                    class="form-control"
                    placeholder="Tempat, DD MONTH YYYY"
                  />
              <span class="text-center">Kepada Yth.</span><br />
               <input
                    type="text"
                    class="form-control"
                    placeholder="Customer"
                  />
            </div>
          </div>

          <div class="row">
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
                    placeholder="Proses"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-md-4 col-12 col-form-label">Atas Nama:</label>
                <div class="col-md-8 col-12">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Atas Nama"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-md-4 col-12 col-form-label">Kendaraan:</label>
                <div class="col-md-8 col-12">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Kendaraan"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-md-4 col-12 col-form-label">No Polisi:</label>
                <div class="col-md-8 col-12">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="No Polisi"
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
                    placeholder="Keterangan"
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
                    placeholder="Resmi STNK"
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
                    placeholder="Jasa"
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
                    placeholder="Lain-lain"
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
                    placeholder="Total"
                  />
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
export default {
  data() {
    return {
      dataDashboard: [],
      user_id: "",
      ready: false,
      remainingTime: "Loading",
    };
  },
  methods: {},
  created() {},
};
</script>


<style>
#content-wrapper {
  min-height: 780px !important;
}
</style>
