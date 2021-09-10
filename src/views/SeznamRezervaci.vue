<template>
    <div>
        <h1>Seznam Rezervací</h1>
        <div class="odhlasit">
            
            <button class="myButton_odhlasit" @click="logout">Odhlásit</button>
        </div>
        <div>
          <DxDataGrid
            :dataSource="dataSource"
            :show-borders="true"
            :column-auto-width="true"
            :column-hiding-enabled="true"
            :column-min-width="80"
          >
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            mode="popup"
          />

          <DxGrouping :auto-expand-all="true"/>
          <DxGroupPanel :visible="true"/>
          <DxColumnChooser 
            mode="select"
            :enabled="true"/>
            <DxHeaderFilter
            :visible="true"
            :allow-search="true"
            />
            <DxColumn
              data-field="id"
              caption="ID"
              :width=50
              :hiding-priority="0"
            />

            <DxColumn
              data-field="idkolobezka"
              caption="KOLOBĚŽKA ID"
              :hiding-priority="1"
              
            />
            
            <DxColumn
              data-field="nazev"
              caption="NÁZEV"
              :hiding-priority="5"
            />

            

            <DxColumn
              data-field="datumzapujceni"
              data-type="date"
              caption="DATUM ZAPŮJČENÍ"
              
            />
              
            

            <DxColumn
              data-field="datumvraceni"
              data-type="date"
              caption="DATUM VRÁCENÍ"
              :hiding-priority="6"
            />
         
            <DxColumn
              data-field="cena"
              caption="CENA"
              :format="currencyformater"
              :hiding-priority="4"
            />

            <DxColumn
              data-field="jmenoZakaznik"
              caption="JMÉNO"
              
            />


            <DxColumn
              data-field="emailZakaznik"
              caption="EMAIL"
              :hiding-priority="3"
            />

            <DxColumn
              data-field="telZakaznik"
              caption="TEL."
              :hiding-priority="2"
            />

            <DxColumn
              data-field="idobjednavka"
              caption="číslo objednávky"
              :hiding-priority="2"
              :group-index="0"
            />
         

              
          </DxDataGrid>
        </div>
    </div>
</template>
<script>
import { DxDataGrid, DxColumn,DxGrouping, DxHeaderFilter, DxColumnChooser, DxGroupPanel, DxEditing, DxPopup } from 'devextreme-vue/data-grid';
import RezervaceService from '@/services/RezervaceService.js';
import {Component, Ref, Watch} from "vue-property-decorator";
import CustomStore from "devextreme/data/custom_store"
import dxDataGrid from "devextreme/ui/data_grid";


const store = new CustomStore({
  key: 'id',
  load: function() {
    
    
    return RezervaceService.getRezervaceFull()
      .then(response => response)
      .then((data) => {
        return {
          data: data.data
        };
      })
      .catch(() => { throw 'Data Loading Error'; });
  },

  update: (key, values) => {
    RezervaceService.update(key, values)
  },

  remove: (key) => {
    RezervaceService.deleteRezervace(key);
  }
});






export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxGrouping,
    DxGroupPanel,
    DxHeaderFilter,
    DxColumnChooser,
    DxEditing,
    DxPopup,
   
  },

  


  


  data(){
      return{
         dataSource: store
        
      }
  },
  

  methods: {
    currencyformater(value)
    {
      return value + " Kč";
    },

    logout(){
      localStorage.removeItem('user');
      this.$router.push('/');
    }
  }
}
</script>





<style scoped>
h1{
  text-align: center;
}
.odhlasit{
  text-align: right;
  padding: 25px;
}
  .myButton_odhlasit {
        padding:10px 20px;        
        border-radius:4px;
        border:2px solid #303030;               
        color:rgb(238, 238, 238);
        transition: ease-out 0.3s;
        font-size:20px;
        outline: none;
        text-decoration:none;
        
        position: relative;
        z-index: 1;
        font-weight: 700;
        background-color: #525252;
        
        
       
    }
    .myButton_odhlasit:hover {
        color: #424242;
        cursor: pointer;
        
    }
    .myButton_odhlasit:before{
        transition: 0.5s all ease;
        position: absolute;        
        top: 0;
        left: 50%;
        right: 50%;
        bottom: 0;
        opacity: 0;
        content: "";
        background-color: #ececec;
    }
    .myButton_odhlasit:hover:before{
        transition: 0.5s all ease;
        left: 0;
        right: 0;
        opacity: 1;
        z-index: -1;
    }

</style>