<template>
  <div >
    <header>
      <nav class="navbar">
      <div class="content">
        <div class="logo"><router-link class="a1" to="/">Koloběžky</router-link>
        </div>
        <ul class="menu-list">
          
        <button @click="api">mmm</button>
          <li><router-link class="a" to="/">Domov</router-link></li>
          <li><router-link class="a" to="/about">O nás</router-link></li>
          <li><router-link class="a" to="/kosik"><img class="icon" src="@/assets/shoping_cart.png" ></router-link></li>
          <li><router-link class="a" to="/seznamrezervaci"><img class="icon" src="@/assets/settingsicon.png" ></router-link></li>
          
          
        </ul>        
        
      </div>
    </nav>
    </header>
    
    <main>
      <div class="banner"></div>
    <div class="about">
      <div class="content">
        <router-view/>
      </div>
    </div>
    </main>
    
    
    <footer>
      
      <div class="footer-bottom">
        <p>copyright &copy;2021 koloběžky. designed by <span>Ambica</span> </p>
      </div>
    </footer>
    
    
    
  </div>
</template>
<script>
import AOS from "aos";
import 'aos/dist/aos.css';
import {loadMessages, locale} from 'devextreme/localization';
import csMessages from 'devextreme/localization/messages/cs.json';
import RezervaceService from '@/services/RezervaceService.js'
import axios from 'axios';
 
export default {
  created() {locale(navigator.language),
            loadMessages(csMessages)},
methods:{
 async api()
 {
    

     await RezervaceService.apiauth()
        .then(response => {console.log(response.data);})
        .catch(error => {console.log(error.response);})
 }}
}
AOS.init({
  duration: 600,
});

</script>
<style >

</style>
