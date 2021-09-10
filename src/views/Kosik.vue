<template>
    <div>
        <div>
            <h1>Košík</h1>
        </div>
        <div>
          <DxDataGrid
            :dataSource="orders"
            :show-borders="true"
            :column-auto-width="true"
            :column-min-width="80"
          >
          <DxSorting mode="none"/>
          <DxScrolling column-rendering-mode="virtual"/>
            <DxColumn
            
            caption="ID"
            data-field="idkolobezka"            
            
            :visible="false"
            />

           <DxColumn
            
              caption="TYP"
              data-field="nazev"
              alignment="center"
              />

            <DxColumn
            
            caption="DATUM ZAPŮJČENÍ"
            data-field="datumzapujceni"
            alignment="center"
            
            />

            <DxColumn
            
            caption="DATUM VRÁCENÍ"
            data-field="datumvraceni"
            alignment="center"
            
            />

            <DxColumn

            caption="CENA"
            data-field="cena"
            
            alignment="right"
            :format="currencyformater"
            />

            <DxSummary>         
              <DxTotalItem
                column="cena"
                summary-type="sum"
                :value-format="currencyformater"
                display-format="Celkem: {0}"
                alignment="left"
                show-in-column="nazev"
              />
            </DxSummary>
            
            
          </DxDataGrid>
        </div>
        <div class="button1">
            <button class="myButton2" @click="pokracovat">Pokračovat v rezervaci</button>
        </div>
        <div class="button1">
            <button class="myButton4" @click="vysypat">Vysypat košík</button>
        </div>
    </div>
</template>
<script>
import { DxDataGrid, DxColumn, DxTotalItem, DxSummary, DxSorting, DxScrolling } from 'devextreme-vue/data-grid';
import notify from 'devextreme/ui/notify';

export default {
  components: {
    DxDataGrid,
    DxTotalItem,
    DxColumn,
    DxSummary,
    DxSorting,
    DxScrolling,
    k: 0
  },

  data(){
      return{
         orders:[]
      }
  },
  mounted()
  {
    if (localStorage.orders) 
    {
      this.orders = JSON.parse(localStorage.orders);
      
    }
  },
  created(){
    if(localStorage.orders){
    this.orders = JSON.parse(localStorage.orders);
    this.k = 1;
    }
    else{notify('Váš košík je prázdný'); this.k = 0;}
  },

  methods: {
    vysypat()
    {
      localStorage.clear();
      window.location.href='/kosik';
    },

    pokracovat()
    {
      if(this.k > 0){
        window.location.href='/rezervace';
      } 
      else {notify('Košík je prázdný')}
    },

    currencyformater(value)
    {
      return value + " Kč";
    }
  }
}
</script>
<style scoped>
h1{
  text-align: center;
  font-size: 50px;
}
.button1{
    float: right;
    padding: 20px;
}
 .myButton4 {
        padding:10px 20px;     
        border-radius:4px;
        border:2px solid #303030;       
        color:rgb(20, 20, 20);
        transition: ease-out 0.4s;
        font-size:20px;
        outline: none;
        text-decoration:none;
        border: 3px solid#e6351d;
        position: relative;
        z-index: 1;
        font-weight: 700;
        background-color: #e6351d;
        
        
       
    }

    .myButton2 {
        padding:10px 20px;     
        border-radius:4px;
        border:2px solid #303030;               
        color:rgb(20, 20, 20);
        transition: ease-out 0.4s;
        font-size:20px;
        outline: none;
        text-decoration:none;
        border: 3px solid#ecbd23;
        position: relative;
        z-index: 1;
        font-weight: 700;
        background-color: #ecbd23;
        
        
       
    }
    .myButton2:hover {
        background-color:aliceblue;
        cursor: pointer;
        
    }

    .myButton4:hover {
        background-color:rgb(255, 112, 112);
        cursor: pointer;
        
    }
    
    @media screen and (max-width: 370px) {
        
        .myButton2{
          font-size: 16px;
          padding: 8px 15px;
        }
        .myButton4{
          font-size: 16px;
          padding: 8px 15px;
        }
      }
</style>