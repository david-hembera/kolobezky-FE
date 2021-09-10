import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://localhost:5001',
    withCredentials: false,
    headers: {
        Authorization: "Bearer " + localStorage.token,
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }

})

export default {
    getAvailable(dayfrom, monthfrom, yearfrom, dayto, monthto, yearto, type) {
        return apiClient.get('/rezervace/' + dayfrom + '/' + monthfrom + '/' + yearfrom + '/' + dayto + '/' + monthto + '/' + yearto + '/' + type)
    },

    getOrCreateZakaznik(firstname, lastname, email, tel)
    {
        return apiClient.post('/Zakaznici',{"jmeno":firstname,"prijmeni":lastname,"email":email,"tel":tel,"rezervace":[]})
    },


    postRezervace(idkolobezka, datumzapujceni, datumvraceni, idzakaznik, idobjednavka)
    {
        return apiClient.post('/rezervace',{"idkolobezka":idkolobezka,"datumzapujceni":datumzapujceni,"datumvraceni":datumvraceni,"idzakaznik":idzakaznik,"idobjednavka":idobjednavka,"idkolobezkaNavigation":null,"idzakaznikNavigation":null})
    },


    getPriceByType(type)
    {
        return apiClient.get('/kolobezkycenik/cena/' + type);
    },

    getNameByType(type)
    {
        return apiClient.get('/kolobezkycenik/nazev/' + type);
    },

    getRezervaceFull()
    {
        return apiClient.get('/rezervace/indexfull/');
    },

    deleteRezervace(id)
    {
        return apiClient.delete('/rezervace/delete/' + id);
    },

    getiddalsiobjednavky()
    {
        return apiClient.get('/rezervace/iddalsiobjednavky');
    },


    login(username, password)
    {
        return apiClient.post('/auth/login',{"username":username,"password":password});
    },

    apiauth()
    {
        return apiClient.get('/values');
    },

    update(id, object){
        return apiClient.put('/update/' + id, object );
    }


}