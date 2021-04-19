<template>
  <v-app>
    <v-app-bar app color="primary" flat dark>
      <nuxt-link to="/">
        <v-avatar size="55" class="ml-0 mb-1" tile>
          <img height="70px" src="~/assets/2.png" contain />
        </v-avatar>
      </nuxt-link>

      <v-toolbar-title
        class="font-weight-bold ml-2 d-none d-md-flex"
        style="cursor: pointer"
      >
        Weather
      </v-toolbar-title>

      <v-autocomplete
        class="ml-2"
        dark
        background-color="primary"
        rounded
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        chips
        clearable
        hide-details
        hide-selected
        item-text="name"
        item-value="symbol"
        label="Search for a City..."
        solo
        return-object
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-title> Search for your City </v-list-item-title>
          </v-list-item>
        </template>
        <template v-slot:selection="{ attr, on, item, selected }">
          <v-chip
            v-bind="attr"
            :input-value="selected"
            color="blue-grey"
            class="white--text"
            v-on="on"
          >
            <span v-text="item.name"></span>
          </v-chip>
        </template>
        <template v-slot:item="{ item }">
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-subtitle
              v-text="country(item.countryCode)"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </v-autocomplete>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main class="primary">
   
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import csc from "country-state-city";
import { ICountry, IState, ICity } from "country-state-city";

export default {
  name:"default",
  data: () => ({
    isLoading: false,
    items: [],
    model: null,
    search: null,
    tab: null,
  }),

  watch: {
    model(val) {
      if(val == null)
        return
      
      this.$store.dispatch("getWeatherSearch",val.name)
    },
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return;

      this.isLoading = true;
      this.items = csc.getAllCities().filter((city) => city.name.match(val));
      this.isLoading = false;
    },
  },
  methods: {
    country(code) {
      let pp = csc.getAllCountries().filter((city) => city.isoCode == code);
      return pp[0].name + "  " + pp[0].flag;
    },
  },

  async mounted() {
       await this.$store.dispatch("getInfo")
     await  this.$store.dispatch("getWeather")
  },
};
</script>
<style>
</style>
