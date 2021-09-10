<template>
    <div>
      <h1>Rezervace</h1>
      <div >
            <div class="center">
              <form  action="your-action" @submit.prevent="rezervovatClick">
          <DxForm
          :label-location="labelLocation"
               
          :width="260"
           :formData="user" :read-only="false" >
            <DxGroupItem caption="Kontaktní údaje">
              <DxSimpleItem
               editor:options="dxTextBox"
               data-field="jmeno">
                <DxLabel text="Jméno"/>
                <DxRequiredRule message="Zadejte jméno"/>
              </DxSimpleItem>

              <DxSimpleItem data-field="prijmeni">
                <DxLabel text="Příjmení"/>
                <DxRequiredRule message="Zadejte příjmení"/>
              </DxSimpleItem>

              <DxSimpleItem data-field="email">
                <DxLabel text="E-mail"/>
                <DxRequiredRule message="Zadejte email"/>
                <DxEmailRule message="Email je naplatný"/>
              </DxSimpleItem>

              <DxSimpleItem data-field="tel" :editor-options="phoneEditorOptions">
                <DxLabel text="Telefon"/>
                <DxRequiredRule message="Zadejte telefoní číslo"/>
                <DxPatternRule :pattern="phonePattern" message="The phone must have a correct USA phone format"/>
              </DxSimpleItem>
            </DxGroupItem>

            
            <DxButtonItem :button-options="buttonOptions" horizontal-alignment="right"/>
          </DxForm>
          </form>
            </div>       
                
            
      </div>
    </div>
</template>

<script>
import RezervaceService from '@/services/RezervaceService.js';
import notify from 'devextreme/ui/notify';
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
  DxRequiredRule,
  DxCompareRule,
  DxRangeRule,
  DxStringLengthRule,
  DxPatternRule,
  DxEmailRule,
  DxAsyncRule
} from 'devextreme-vue/form';

export default {
  components: {
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxRequiredRule,
    DxCompareRule,
    DxPatternRule,
    DxRangeRule,
    DxEmailRule,
    DxStringLengthRule,
    DxForm,
    DxAsyncRule,
    notify
  },
  data(){
    return{
      labelLocation:'top',
    idzakaznik: '',
    orders: [],
    idobjednavky:'',
    

    user: {
        jmeno: '',
        prijmeni: '',
        email: '',
        tel: ''
      },
      buttonOptions: {
        text: 'Rezervovat',
        type: 'success',
        useSubmitBehavior: true
      },

      phoneEditorOptions: {
        mask: '000 000 000',
        maskInvalidMessage: 'Zadejte platné číslo. Např. 777 888 999'
      },
      phonePattern:  /^\s*\d{3}\s*\d{3}\s*\d{3}$/
      //phonePattern:  /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/
    
          
    }
  },
  created(){
          
          this.orders = JSON.parse(localStorage.orders);

          RezervaceService.getiddalsiobjednavky()
      .then(response => {this.idobjednavky = response.data;})
      .catch(error => {console.log(error.response)});
         
       },
  

  computed: {
        totalRows: function() {
             return this.orders.length
        }
        
        },
  

  methods: {
    

    async rezervovatClick() 
    {
      
      
      await RezervaceService.getOrCreateZakaznik(this.user.jmeno, this.user.prijmeni, this.user.email, this.user.tel.toString())
      .then(response => {this.idzakaznik = response.data.id})
      .catch(error => {console.log(error.response)});

      console.log(this.idzakaznik);
      console.log(this.orders)
      
      await this.createRezervace();
      
      

      await localStorage.clear();
      
      window.location.href='/Succes'
      
    },

    async createRezervace()
    {
      
      for (var i = 0;i <= this.totalRows-1;i++)
      {
        await RezervaceService.postRezervace(this.orders[i].idkolobezka, this.orders[i].datumzapujceni, this.orders[i].datumvraceni, this.idzakaznik,this.idobjednavky);
        
      }
    },

    
  }

}
</script>




<style scoped>
form
{
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    
}
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
  display: block;
    text-align: center;
 
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