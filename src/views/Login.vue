<template>
  <div class="center">
    <h1>Přihlašovací údaje</h1><br>
    <form action="your-action" @submit.prevent="handleSubmit">
      <DxForm :formData="user" :read-only="false" width="300">
        <DxSimpleItem data-field="username">
          <DxLabel text="Přihlašovací jméno"/>
          <DxRequiredRule message="Username is required"/>
        </DxSimpleItem>

        <DxSimpleItem data-field="password" :editor-options="passwordOptions" editor-type="dxTextBox">
          <DxLabel text="Heslo"/>
          <DxRequiredRule message="Password is required"/>
        </DxSimpleItem>

        <DxButtonItem :button-options="buttonOptions" horizontal-alignment="left" />
      </DxForm>
    </form>
  </div>
</template>

<script>
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
import notify from 'devextreme/ui/notify';
import RezervaceVue from '../../../pkc/src/views/Rezervace.vue';
import RezervaceService from '@/services/RezervaceService.js';

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
      user: {
        username: '',
        password: ''
      },
      passwordOptions: {
        mode: 'password'
      },
      buttonOptions: {
        text: 'Přihlásit se',
        type: 'success',
        useSubmitBehavior: true
      }
      
    }
  },

  methods: {
    async handleSubmit(){
      await RezervaceService.login(this.user.username, this.user.password)
      .then(response => {localStorage.token = response.data.token})
      .catch(error => {console.log(error.response);})
    }
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
.center{  
  display: block;
    text-align: center;
 
}
</style>
