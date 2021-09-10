<template>
    <div>
        
        <div data-aos="fade-up" class="new">
        <h1>Koloběžka pro dospělé</h1>
        <div class="container1">
            <DxGallery
            id="gallery"
            :data-source="dataSource"
            :show-nav-buttons="showNavButtons"
            :show-indicator="showIndicator"
            :loop="loop"
            :height="450"
            />
            <div >
                <h2>Cena: {{cena2}} Kč / den</h2>
                <p>Koloběžky pro dospělé s nosností 150 kg byly vyvinuty
                     ve spolupráci s techniky a specialisty společnosti Koloběžky.
                      Mají zvýšenou ODOLNOST a SPOLEHLIVOST, VYLEPŠENÉ BRZDY a PEVNĚJŠÍ KOLA.<br>
                       Při sjezdu z kopce jsou zcela BEZPEČNÉ.</p>


                       <div>             
              <label>Datum zapůjčení: *</label>
              <DxDateBox
              v-model:value="datefrom"
              :min="min"
              :width="150"
              placeholder="Vyberte datum"
              display-format="dd/MM/yyyy"
              @valueChanged="GetNumberOfAvailable"
              @initialized="GetNumberOfAvailable"
              />
              
              <label>Datum vrácení: *</label>
              <DxDateBox
              v-model:value="dateto"
              :min="datefrom"
              :width="150"
              placeholder="Vyberte datum"
              display-format="dd/MM/yyyy"
              @valueChanged="GetNumberOfAvailable"
              
              />
              <br>
              <div class="skladem">
                <p>Skladem:  {{totalRows}}</p>
              </div>
              <br>       
              <label >Množství: </label><input type="number" v-model:value="mnozstvi" min="1" :max="totalRows">
              </div>
              <div class="center">
                <button class="myButton" :disabled="!totalRows >0" @click="Pridatdokosiku">Přidat do košíku</button>
              </div>
            </div>
                       
        </div>
        </div>
        <hr>
        <div class="new">
        <h1>Související produkty</h1>
    </div>
    <div data-aos="fade-down" class="container2">
      <div class="box">
        <router-link class="a_popisky" to="/k_dospely" ><img class="obrazek" src="../assets/horska_kolobezka.jpg" >
        <ul class="popisky">
          <li><h4>Koloběžka pro dospělé</h4></li>
          <li >Cena: {{cena2}} Kč/den</li>          
        </ul>
        </router-link>
      </div>
      <div class="box">
        <router-link class="a_popisky" to="/k_detska" ><img class="obrazek" src="../assets/detska_kolobezka.jpg" >
        <ul class="popisky">
          <li><h4>Koloběžka pro děti</h4></li>
          <li >Cena: {{cena1}} Kč/den</li>          
        </ul>
        </router-link>
      </div>
      <div class="box">
        <router-link class="a_popisky" to="/k_elektricka"><img class="obrazek" src="../assets/elektricka_kolobezka.jpg" >
        <ul class="popisky">
          <li><h4>Elektrická koloběžka</h4></li>
          <li >Cena: 290 Kč/den</li>          
        </ul>
        </router-link>
      </div>
    </div>
        
    </div>
</template>
<script>

import DxDateBox from 'devextreme-vue/date-box';
import DxGallery from 'devextreme-vue/gallery';
import RezervaceService from '@/services/RezervaceService.js';
import notify from 'devextreme/ui/notify';

export default {
  
  components: {
    DxGallery,
    DxDateBox
  },
  
  

  data() {
    return {
      
      showNavButtons: true,
      showIndicator: true,
      loop: true,
      dataSource: [
        "https://d25-a.sdn.cz/d_25/c_img_H_El/eqrNdf.jpeg",
        "https://cdn.myshoptet.com/usr/www.fitness-zone.cz/user/shop/big/58211-4_cobra-4-1-one.jpg?5fdb7e80",
        "https://cdn.myshoptet.com/usr/www.fitness-zone.cz/user/shop/big/58241-4_cobra-4-5.jpg?5fdb7e5b"
      ],
      min: new Date(),
      listofavailable: [],
      numberofavailable: 0,
      datefrom: new Date(),
      dateto: new Date(),
      mnozstvi: 1,
      cena1: '',
      cena2: '',
      cena3: '',
      jmenokolobezky: 'dospělá'
      
      
    };
  },

created() {
    RezervaceService.getPriceByType(1)
      .then(response => {this.cena1 = response.data;})
      .catch(error => {console.log(error.response);});

    RezervaceService.getPriceByType(2)
    .then(response => {this.cena2 = response.data;})
    .catch(error => {console.log(error.response);});

    RezervaceService.getPriceByType(3)
    .then(response => {this.cena3 = response.data;})
    .catch(error => {console.log(error.response);});

    RezervaceService.getNameByType(2)
      .then(response => {this.jmenokolobezky = response.data;})
      .catch(error => {console.log(error.response);});
  },

  computed: {
        totalRows: function() {
             return this.listofavailable.length
        }},

 methods: {

   async GetNumberOfAvailable() 
        {
         await RezervaceService.getAvailable(this.datefrom.getDate(),this.datefrom.getMonth()+1,this.datefrom.getFullYear(),this.dateto.getDate(),this.dateto.getMonth()+1,this.dateto.getFullYear(),2)
            .then(response => {this.listofavailable = response.data})
            .catch(error => {console.log(error.response)})

          var orders = [];
          if (localStorage.orders)
          {
            orders = JSON.parse(localStorage.orders);
          }
          
        for (var i = 0; i < this.totalRows; i++)
        {
          
          for (var y = 0; y < orders.length; y++)
          {
          

          if (this.listofavailable[i] == orders[y].idkolobezka)
          {
            console.log('removed product ' + this.listofavailable[i] + ' from available');
            await this.listofavailable.splice(i,1)
          }
          
          }
        }

        if (this.datefrom > this.dateto)
        {
          this.dateto = this.datefrom;
        }
        
        },

        Pridatdokosiku() 
        {
          notify(`Váš produkt byl přidán do košíku`);
          var orders = [];
          if (localStorage.orders)
          {
            orders = JSON.parse(localStorage.orders);
          }
          
          for (var i=0;i<this.mnozstvi;i++){
          const days = ((this.dateto-this.datefrom)/86400000)+1;
          const datumod = this.datefrom.getFullYear() + '-' + ('0'+ (this.datefrom.getMonth()+1)).slice(-2) + '-' + ('0' + this.datefrom.getDate()).slice(-2);
          const datumdo = this.dateto.getFullYear() + '-' + ('0'+ (this.dateto.getMonth()+1)).slice(-2) + '-' + ('0' + this.dateto.getDate()).slice(-2);
          orders.push({idkolobezka:this.listofavailable[0], typ: 2, datumzapujceni:datumod, datumvraceni:datumdo, nazev: this.jmenokolobezky, cena: (this.cena2*days)});
          this.listofavailable.splice(0,1);
          }
          localStorage.orders = JSON.stringify(orders);
          this.mnozstvi = 1;
        }
 },
  };

</script>

<style lang="scss" scoped>
h1{
  text-align: center;
  font-size: 50px;
}
label{
  font-size: 20px;
  font-weight: bold;

}
p{
    text-align:center;
}
h2{
   text-align: center;
  font-size: 30px; 
}

#gallery {
    margin: auto;
      max-width: 450px;
}
.new{
    padding: 50px;
}
.center{  
  padding: 20px;
}
.container1{
    
    align-items:flex-start;
    width: 100%;
    display:grid;
    grid-template-columns: repeat(auto-fit,minmax(200px, 1fr));
    
    
}
.container2{
  width: 100%;
  
  display:grid;
  grid-template-columns: repeat(auto-fit,minmax(150px, 1fr));
  grid-gap: 180px;
  
}

.box{
  height: 300px;
  border-radius:8px;
  border: 5px solid black;
  
  position: relative;
}
.box:hover{
  border-color: rgb(224, 204, 22);
  transition: .3s;
  
}
 .box .obrazek{
width: 100%;
  height: 100%;

}
.popisky{
  list-style: none;
  font-size: 20px;
  
}
.a_popisky{
  text-decoration: none;
  color: black;
}


.myButton_kosik{
        background-color:#ff9900;
        border-radius:8px;
        border:2px solid #e4e4e4;
        display:inline-block;
        
        color:rgb(0, 0, 0);
        font-family:Arial;
        font-size:25px;
        padding:10px 20px;
        text-decoration:none;
}
.myButton_kosik:hover{
  background-color:#ecbd23;
}
input[type=number] {
    height: 30px;
    font-size: 18px;
}
input[type=number]:hover::-webkit-inner-spin-button {  
    width: 14px;
    height: 30px;}
</style>

