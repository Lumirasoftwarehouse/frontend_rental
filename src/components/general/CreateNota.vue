<script setup>
import BiayaLain from "./BiayaLain.vue";
</script>

<template>
  <div
    class="modal fade"
    id="modalAdd"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalAddLabel"
    aria-hidden="true"
    ref="modalAddRef"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalAddLabel">Modal Tambah Nota</h5>
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
          <!-- Header Section -->
          <div class="row">
            <div class="col-sm-4">
              <!-- <input
                v-model="header.alamat"
                type="text"
                class="form-control"
                placeholder="masukkan alamat"
              /> -->
            </div>
            <div class="col-sm-4">
              <input
                v-model="header.tanggal"
                type="date"
                class="form-control"
              />
            </div>
            <div class="col-sm-4">
              <input
                v-model="header.pelanggan"
                type="text"
                class="form-control"
                placeholder="masukkan nama pelanggan"
              />
            </div>
          </div>

          <!-- Button to Add Notes -->
          <div class="row mt-3 mb-2">
            <div class="col-12">
              <button
                type="button"
                class="btn btn-primary mb-2 float-end"
                @click="addNote"
              >
                Tambah Nota
              </button>
            </div>
          </div>

          <form @submit.prevent="submitNotes">
            <!-- Looping for Notes -->
            <div v-for="(note, index) in notes" :key="index" class="mb-4">
              <div class="row border border-dark p-2">
                <div class="row mt-2 mb-2">
                  <div class="col-8">
                    <span class="text-center h4 fw-bold text-dark float-end">
                      RECEIPT {{ index + 1 }}
                    </span>
                  </div>
                  <div class="col-4">
                    <button
                      type="button"
                      class="btn btn-danger fload-end"
                      @click="removeNote(index)"
                    >
                      <i class="bi bi-trash3-fill"></i>
                    </button>
                  </div>
                </div>

                <!-- Note Content Section -->
                <div class="row">
                  <div class="col-md-6 col-12 mb-3 border border-dark p-3">
                    <div class="form-group row">
                      <label class="col-md-4 col-12 col-form-label"
                        >Proses:</label
                      >
                      <div class="col-md-8 col-12">
                        <input
                          v-model="note.proses"
                          type="text"
                          class="form-control"
                          placeholder="masukkan jenis proses"
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-4 col-12 col-form-label"
                        >Atas Nama:</label
                      >
                      <div class="col-md-8 col-12">
                        <input
                          v-model="note.atas_nama"
                          type="text"
                          class="form-control"
                          placeholder="masukkan atas nama"
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-4 col-12 col-form-label"
                        >Kendaraan:</label
                      >
                      <div class="col-md-8 col-12">
                        <input
                          v-model="note.kendaraan"
                          type="text"
                          class="form-control"
                          placeholder="masukkan jenis kendaraan"
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-4 col-12 col-form-label"
                        >No Polisi:</label
                      >
                      <div class="col-md-8 col-12">
                        <input
                          v-model="note.no_polisi"
                          type="text"
                          class="form-control"
                          placeholder="masukkan nomor polisi"
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-4 col-12 col-form-label"
                        >Keterangan:</label
                      >
                      <div class="col-md-8 col-12">
                        <textarea
                          v-model="note.keterangan"
                          class="form-control"
                          placeholder="masukkan keterangan"
                          rows="5"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6 col-12 mb-3 border border-dark p-3">
                    <div class="form-group row">
                      <label class="col-md-4 col-12 col-form-label"
                        >Resmi STNK</label
                      >
                      <div class="col-md-8 col-12">
                        <input
                          v-model="note.formattedStnkResmi"
                          @input="updateCurrency(note, 'stnk_resmi', $event)"
                          type="text"
                          class="form-control"
                          placeholder="Harga Resmi STNK"
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-4 col-12 col-form-label">Jasa</label>
                      <div class="col-md-8 col-12">
                        <input
                          v-model="note.formattedJasa"
                          @input="updateCurrency(note, 'jasa', $event)"
                          type="text"
                          class="form-control"
                          placeholder="Harga Jasa"
                        />
                      </div>
                    </div>

                    <!-- Komponen TambahBiayaLain -->
                     <BiayaLain :index="index" @update-biaya="updateBiaya" />
                    <!-- <BiayaLain @update-biaya="updateBiaya" /> -->

                    <div class="form-group row">
                      <label class="col-md-4 col-12 col-form-label"
                        >Total (Rp.):</label
                      >
                      <div class="col-md-8 col-12">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Total"
                          :value="formatCurrency(note.stnk_resmi + note.jasa + note.biayaLain.reduce((sum, biaya) => sum + biaya.nominal, 0))"
                          readonly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Grand Total Section -->
            <div class="row mt-3">
              <div class="col-12 text-end">
                <h5>Jumlah Keseluruhan: {{ formatCurrency(grandTotal) }}</h5>
              </div>
            </div>

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
</template>

<script>
export default {
  data() {
    return {
      header: {
        // alamat: "",
        tanggal: "",
        pelanggan: "",
      },
      notes: [
        {
          proses: "",
          atas_nama: "",
          kendaraan: "",
          no_polisi: "",
          keterangan: "",
          stnk_resmi: 0,
          formattedStnkResmi: "Rp. 0",
          jasa: 0,
          biayaLain: [],
          formattedJasa: "Rp. 0",
          total: 0,
        },
      ],
      biayaLain: [],
    };
  },

  computed: {
    grandTotal() {
      return this.notes.reduce((sum, note) => {
        return (
          sum +
          (parseFloat(note.stnk_resmi) || 0) +
          (parseFloat(note.jasa) || 0) +
          note.biayaLain.reduce((biayaSum, biaya) => biayaSum + biaya.nominal, 0)
        );
      }, 0);
    },
  },
  methods: {
    updateBiaya({ index, biayaList }) {
      // Perbarui 'biayaLain' untuk note yang relevan
this.notes[index].biayaLain = biayaList;
      console.log(`Updated Biaya for note ${index}:`, biayaList);
    },
    addNote() {
      this.notes.push({
        proses: "",
        atas_nama: "",
        kendaraan: "",
        no_polisi: "",
        keterangan: "",
        stnk_resmi: 0,
        formattedStnkResmi: "Rp. 0",
        jasa: 0,
        formattedJasa: "Rp. 0",
        biayaLain: [],
        total: 0,
      });
    },
    removeNote(index) {
      this.notes.splice(index, 1);
    },
    submitNotes() {
      // Emit the data to parent
      this.$emit("save-notes", { header: this.header, notes: this.notes });
    },
    updateCurrency(note, field, event) {
      let value = event.target.value.replace(/\D/g, "");
      note[field] = parseInt(value) || 0;

      if (field === "stnk_resmi") {
        note.formattedStnkResmi = this.formatCurrency(note.stnk_resmi);
      } else if (field === "jasa") {
        note.formattedJasa = this.formatCurrency(note.jasa);
      }
    },

    formatCurrency(value) {
      let val = (value / 1).toFixed(0).replace(",", ".");
      return "Rp. " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>
