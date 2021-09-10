<template>
  <div data-aos="zoom-out" >
    
    <div>
        <h1>Výběr koloběžek</h1>
    </div>
    <div class="container">
      <div class="box">
        <router-link class="a_popisky" to="/k_dospely"><img class="obrazek" src="../assets/horska_kolobezka.jpg" >
        <ul class="popisky">
          <li><h4>Koloběžka pro dospělé</h4></li>
          <li >Cena: {{cena2}} Kč/den</li>          
        </ul>
        </router-link>
      </div>
      <div class="box">
        <router-link class="a_popisky" to="/k_detska"><img class="obrazek" src="../assets/detska_kolobezka.jpg" >
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
          <li >Cena: {{cena3}} Kč/den</li>          
        </ul>
        </router-link>
      </div>
    </div>
    
  </div>
</template>

<script>
import RezervaceService from '@/services/RezervaceService.js';

export default {
  data() {
    return {
      cena1: '',
      cena2: '',
      cena3: ''
    }
    
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
  }
}
</script>


<style scoped>
h1{
  text-align: center;
  font-size: 60px;
}

.container{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(210px, 1fr));
  grid-gap: 200px;
  
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
</style>
