<template>
 <v-table
  style="margin:6vh;"
 >
  <template v-slot:top>
      <v-toolbar
        flat
        style="background-color:white"
      >
        <v-toolbar-title>
          <b>Customer </b>
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              @click="dialog=true"
              prepend-icon="mdi-plus"
            >
             Add Customer
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5"><b>{{ formTitle }}</b></span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.nama"
                      label="Nama"
                      variant="outlined"
                 
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-select
                      v-model="editedItem.jabatan"
                      label="Jabatan"
                      :items="['Manager', 'Purchasing Staff', 'Supervisor', 'HRD', 'Project Manager', 'Technical Leader']"
                      variant="outlined"
                    ></v-select>
                  </v-col>
                
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-select
                      v-model="editedItem.gender"
                      label="Gender"
                      :items="[{value:'M', title:'Male'},{value:'F', title:'Female'}]"
                      variant="outlined"
                    ></v-select>
                  </v-col>
                 
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="deep-purple"
                variant="outlined"
                text
                width="15vh"
                @click="close"
              >
                Close
              </v-btn>
              <v-btn
                style="background-color:#673AB7;color:white;"
                text
                class="ml-8"
                width="15vh"
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="dialogDelete"
          max-width="90vh"
          >
          <v-card>
            <v-card-title>
              <span class="text-h5"><b> Delete Customer</b></span>
            </v-card-title>
            <v-card-text class="text-h6 text-left">Customer {{ namaTemp }} will be deleted. Proceed ?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-btn
                color="deep-purple"
                variant="outlined"
                text
                @click="closeDelete"
                >Close
              </v-btn>
              <v-btn
                style="background-color:red;color:white;"
                text
                class="ml-5"
                @click="deleteItemConfirm"
              >Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
 
    <thead>
      <tr style="border:1px solid black">
        <th class="text-left">
          Nama
        </th>
        <th class="text-left">
          Jabatan
        </th>
        <th class="text-left">
          Gender
        </th>
        <th class="text-left">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
      v-for='(ctr,index) in customer' :key="index" v-bind="ctr"
      >
        <td>{{ ctr.nama}}</td>
        <td>{{ ctr.jabatan}}</td>
        <td>{{ ctr.gender}}</td>
        <td >
          <v-btn 
            class="mr-4"
            width="15vh"
            prepend-icon="mdi-pencil"
            @click.stop="editItem(ctr)"
            color="blue"
          > Edit 
          </v-btn>
          <v-btn
            @click.stop="deleteItem(ctr)"
            color="red" 
            width="16vh"
            prepend-icon="mdi-delete"
          >
           Delete
          </v-btn>
        </td>
      </tr>
    </tbody>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-table>
    
</template>

<script>
export default {
  data() {
    return {
      namaTemp:'',
      dialog: false,
      dialogDelete: false,
      customer: [],
      editedIndex: -1,
      editedItem: {
        nama: '',
        jabatan: '',
        gender: '',
       
      },
      defaultItem: {
        nama: '',
        jabatan: '',
        gender: '',
      },
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Add Customer' : 'Edit Customer'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
      this.initialize()
  },

  methods: {
      // fetching data customer.json dari lokal
      initialize () {
        fetch("/customer.json")
          .then(r => r.json())
          .then(data => {
            this.customer=data;
          },
            response => {
            console.log('Error loading json:', response)
        });
      },

      // edit customer berdasarkan row yang dipilih, memunculkan dialog edit customer
      editItem (item) {
        this.editedIndex = this.customer.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        
      },

      // delete customer berdasarkan row yang dipilih, memunculkan dialog konfirmasi delete
      deleteItem (item) {
        this.editedIndex = this.customer.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.namaTemp = item.nama
        this.dialogDelete = true
      },

      // proses delete customer
      deleteItemConfirm () {
        this.customer.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      // proses cancel untuk add atau edit customer, menutup dialog add atau edit customer 
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      // proses cancel untuk delete customer, menutup dialog konfirmasi delete
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      // proses save untuk add atau edit customer, memanggil method close dialog
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.customer[this.editedIndex], this.editedItem)
        } else {
          this.customer.push(this.editedItem)
        }
        this.close()
      },
    },

}
</script>

<style>
    .hello{
        color:red;
        border:5px solid black;
        width:200px;
        
    }

    
    
</style>

