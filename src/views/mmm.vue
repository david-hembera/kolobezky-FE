<template>
    <div>
        <h1>Rezervace</h1>
        <div class="center">
            <h2>Kontaktní údaje</h2>
            <div>
                <form>
                    
                    <div>
                        <label class="field field_v1">
                        <input class="field__input" required v-model="jmeno" placeholder=" ">
                        <span class="field__label-wrap">
                        <span class="field__label">Jméno</span>
                        </span></label><br><br>
                        <label class="field field_v1">
                        <input class="field__input" required v-model="prijmeni" placeholder=" ">
                        <span class="field__label-wrap">
                        <span class="field__label">Příjmení</span>
                        </span></label> <br><br>
                        <label class="field field_v1">
                        <input class="field__input" required v-model="email" placeholder="example@example.com">
                        <span class="field__label-wrap">
                        <span class="field__label"  type="text" >E-mail</span>
                        </span></label> <br> <br>
                        <label class="field field_v1">
                        <input class="field__input" required type="number" v-model="tel" placeholder="777666555">
                        <span class="field__label-wrap">
                        <span class="field__label">Telefon</span>
                        </span></label> 
                    </div>
                    <br><br>
        <div >
            <button class="myButton3" :disabled="!isDisabled"  @click.prevent="rezervovatClick">Rezervovat</button>
        </div>
                </form>
                
            </div>
        </div>
    </div>
</template>

<script>
import RezervaceService from '@/services/RezervaceService.js';
import notify from 'devextreme/ui/notify';

export default {
  data(){
    return{
    jmeno: '',
    prijmeni: '',
    email: '',
    tel: '',
    idzakaznik: '',
    orders: [],
    k: 0
    
          
    }
  },

  created(){
    if(localStorage.orders){
    this.orders = JSON.parse(localStorage.orders);
    this.k = 1;
    }
    else{notify('Váš košík je prázdný'); this.k = 0;}
  },

  computed: {
        totalRows: function() {
             return this.orders.length
        },
        isDisabled(){
          return this.k*this.jmeno.length*this.prijmeni.length*this.email.length*(this.tel-99999999)*(this.email.indexOf('@')+1) > 0;
        }
        },
  

  methods: {

    async rezervovatClick() 
    {
      await RezervaceService.getOrCreateZakaznik(this.jmeno, this.prijmeni, this.email, this.tel)
      .then(response => {this.idzakaznik = response.data.id})
      .catch(error => {console.log(error.response)});

      console.log(this.idzakaznik);

      
      await this.createRezervace();
      
      

      await localStorage.clear();
      
      window.location.href='/Succes'
      
    },

    async createRezervace()
    {
      console.log('here');
      for (var i = 0;i <= this.totalRows-1;i++)
      {
        await RezervaceService.postRezervace(this.orders[i].idkolobezka, this.orders[i].datumzapujceni, this.orders[i].datumvraceni, this.idzakaznik);
        
      }
    }
  }

}
</script>




<style scoped>
h1{
  text-align: center;
  font-size: 50px;
}
h2{
    font-size: 28px;
}
input{
    height: 20px;
    width: 18%;
}
.center{
    text-align: center;
    font-size: 20px;
}
.field__input{ 
  --uiFieldPlaceholderColor: var(--fieldPlaceholderColor, #767676);
  
  background-color: transparent;
  border-radius: 0;
  border: none;

  -webkit-appearance: none;
  -moz-appearance: none;

  font-family: inherit;
  font-size: inherit;
}

.field__input:focus::-webkit-input-placeholder{
  color: var(--uiFieldPlaceholderColor);
}

.field__input:focus::-moz-placeholder{
  color: var(--uiFieldPlaceholderColor);
}



.field{
  --uiFieldBorderWidth: var(--fieldBorderWidth, 2px);
  --uiFieldPaddingRight: var(--fieldPaddingRight, 1rem);
  --uiFieldPaddingLeft: var(--fieldPaddingLeft, 1rem);   
  --uiFieldBorderColorActive: var(--fieldBorderColorActive, #ff9900);

  display: var(--fieldDisplay, inline-flex);
  position: relative;
  font-size: var(--fieldFontSize, 1rem);
}

.field__input{
  box-sizing: border-box;
  width: var(--fieldWidth, 100%);
  height: var(--fieldHeight, 3rem);
  padding: var(--fieldPaddingTop, 1.25rem) var(--uiFieldPaddingRight) var(--fieldPaddingBottom, .5rem) var(--uiFieldPaddingLeft);
  border-bottom: var(--uiFieldBorderWidth) solid var(--fieldBorderColor, rgba(0, 0, 0, .25));  
}

.field__input:focus{
  outline: none;
}

.field__input::-webkit-input-placeholder{
  opacity: 0;
  transition: opacity .2s ease-out;
}

.field__input::-moz-placeholder{
  opacity: 0;
  transition: opacity .2s ease-out;
}

.field__input:focus::-webkit-input-placeholder{
  opacity: 1;
  transition-delay: .2s;
}

.field__input:focus::-moz-placeholder{
  opacity: 1;
  transition-delay: .2s;
}

.field__label-wrap{
  box-sizing: border-box;
  pointer-events: none;
  cursor: text;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.field__label-wrap::after{
  content: "";
  box-sizing: border-box;
  width: 100%;
  height: 0;
  opacity: 0;

  position: absolute;
  bottom: 0;
  left: 0;
}

.field__input:focus ~ .field__label-wrap::after{
  opacity: 1;
}

.field__label{
  position: absolute;
  left: var(--uiFieldPaddingLeft);
  top: calc(50% - .5em);

  line-height: 1;
  font-size: var(--fieldHintFontSize, inherit);

  transition: top .2s cubic-bezier(0.9, -0.15, 0.1, 1.15), opacity .2s ease-out, font-size .2s ease-out;
  will-change: bottom, opacity, font-size;
}

.field__input:focus ~ .field__label-wrap .field__label,
.field__input:not(:placeholder-shown) ~ .field__label-wrap .field__label{
  --fieldHintFontSize: var(--fieldHintFontSizeFocused, .75rem);

  top: var(--fieldHintTopHover, .25rem);
}


.field_v1 .field__label-wrap::after{
  border-bottom: var(--uiFieldBorderWidth) solid var(--uiFieldBorderColorActive);
  transition: opacity .2s ease-out;
  will-change: opacity;
}
.myButton3 {
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
    .myButton3:hover {
        background-color:aliceblue;
        cursor: pointer;
        
    }
    .myButton3:disabled,
.myButton3[disabled]{
  border: 2px solid #a5a5a5;
  background-color: #3f3f3f;
  color: #ffc400;
}
    input:invalid {
  box-shadow: 0 0 1px 1px red;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>