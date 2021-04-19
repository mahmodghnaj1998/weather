<template>
  <div class="text-center" v-if="loding">
    <v-overlay z-index="0">
      <v-progress-circular
        :size="200"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </div>
  <div v-else>
    <v-bottom-navigation app class="d-sm-none d-flex">
      <v-btn @click="tab = 0">
        <span>Tody</span>

        <v-icon>mdi-calendar-today</v-icon>
      </v-btn>

      <v-btn @click="tab = 1">
        <span>Hourly</span>

        <v-icon>mdi-hours-24</v-icon>
      </v-btn>

      <v-btn @click="tab = 2">
        <span>3 Day</span>

        <v-icon>mdi-view-day-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-tabs
      dark
      height="40"
      background-color="indigo darken-4"
      centered
      fixed-tabs
      v-model="tab"
      :class="mobile1"
    >
      <v-tab> Tody </v-tab>
      <v-tab> Hourly </v-tab>
      <v-tab> 3 Day </v-tab>
    </v-tabs>
    <v-container>
      <v-col v-if="error" cols="12" md="6">
        <v-alert prominent type="error" v-model="error">
          "We apologize. this city has no information."
        </v-alert>
      </v-col>
      <v-tabs-items v-model="tab" class="mt-4">
        <!-- Tody -->

        <v-tab-item class="primary">
          <v-row v-if="current && forecast">
            <v-col>
              <v-card
                class="primary mb-4 mt-4 mx-4"
                elevation="20"
                max-width="800"
                dark
              >
                <v-card-title class="font-weight-bold" :class="mobile">
                  {{ city }} City, {{ country }} Weather
                </v-card-title>
                <v-card-subtitle class="font-weight-bold subtitle-1">
                  last Update
                  {{ new Date(`${current.last_updated}`).toLocaleTimeString() }}
                </v-card-subtitle>
                <v-card-text>
                  <v-row align="center">
                    <v-col cols="12" md="8" sm="6">
                      <p class="display-3 font-weight-bold">
                        {{ current.temp_c }}&deg;C
                      </p>
                      <h2 class="white--text headline font-weight-bold">
                        {{ current.condition.text }}
                      </h2>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-img
                        :src="current.condition.icon"
                        alt="Sunny image"
                        :aspect-ratio="16 / 9"
                        width="200"
                        height="200"
                        class="mx-auto"
                      ></v-img>
                      <h2
                        class="title white--text h2 mt-4 text-center font-weight-bold"
                      >
                        {{ forecast.forecastday[0].day.maxtemp_c }}&deg; /
                        {{ forecast.forecastday[0].day.mintemp_c }}&deg;
                      </h2>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <!-- ---------------------- -->
          <v-row v-if="forecast">
            <v-col>
              <v-card
                class="white mb-4 mt-4 mx-4"
                elevation="20"
                max-width="800"
              >
                <v-card-title primary-title class="font-weight-bold">
                  Today's Forecast for <br class="d-sm-none d-flex" />
                  {{ city }}, {{ country }}
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="3" class="text-center">
                        <p class="title blue--text">Morning</p>
                        <p class="display-1 font-weight-bold">
                          {{ forecast.forecastday[0].hour[6].temp_c }}&deg;C
                        </p>
                        <v-img
                          :src="forecast.forecastday[0].hour[6].condition.icon"
                          alt="Sunny image"
                          width="92"
                          class="mx-auto"
                        ></v-img>
                      </v-col>
                      <v-col cols="12" md="3" class="text-center">
                        <p class="title blue--text">Afternoon</p>
                        <p class="display-1 font-weight-bold">
                          {{ forecast.forecastday[0].hour[11].temp_c }}&deg;C
                        </p>
                        <v-img
                          :src="forecast.forecastday[0].hour[11].condition.icon"
                          alt="Sunny image"
                          width="92"
                          class="mx-auto"
                        ></v-img>
                      </v-col>
                      <v-col cols="12" md="3" class="text-center">
                        <p class="title blue--text">Evening</p>
                        <p class="display-1 font-weight-bold">
                          {{ forecast.forecastday[0].hour[14].temp_c }}&deg;C
                        </p>
                        <v-img
                          :src="forecast.forecastday[0].hour[14].condition.icon"
                          alt="Sunny image"
                          width="92"
                          class="mx-auto"
                        ></v-img>
                      </v-col>
                      <v-col cols="12" md="3" class="text-center">
                        <p class="title blue--text">Overnight</p>
                        <p class="display-1 font-weight-bold">
                          {{ forecast.forecastday[0].hour[18].temp_c }}&deg;C
                        </p>
                        <v-img
                          :src="forecast.forecastday[0].hour[18].condition.icon"
                          alt="Sunny image"
                          width="92"
                          class="mx-auto"
                        ></v-img>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <!-- ---------------------- -->
          <v-row v-if="forecast">
            <v-col>
              <v-card
                class="white mb-4 mt-4 mx-4"
                elevation="20"
                max-width="800"
              >
                <v-card-title primary-title class="font-weight-bold">
                  Weather Today in <br class="d-sm-none d-flex" />
                  {{ city }}, {{ country }}
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="12">
                        <p class="black--text display-3 font-weight-bold">
                          {{ current.feelslike_c }}&deg;
                        </p>
                        <p class="font-weight-bold mt-n4 text-h6">Feels Like</p>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-simple-table>
                          <template v-slot:default>
                            <tbody>
                              <tr class="font-weight-bold title">
                                <td>
                                  <v-icon>mdi-thermometer-low</v-icon> High /
                                  Low
                                </td>
                                <td>
                                  {{
                                    forecast.forecastday[0].day.maxtemp_c
                                  }}&deg; /
                                  {{
                                    forecast.forecastday[0].day.mintemp_c
                                  }}&deg;
                                </td>
                              </tr>
                              <tr class="font-weight-bold title">
                                <td>
                                  <v-icon>mdi-water-percent</v-icon> Humidity
                                </td>
                                <td>{{ current.humidity }}%</td>
                              </tr>
                              <tr class="font-weight-bold title">
                                <td>
                                  <v-icon>mdi-arrow-expand-vertical</v-icon>
                                  Pressure
                                </td>
                                <td>{{ current.pressure_in }} in</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-simple-table>
                          <template v-slot:default>
                            <tbody>
                              <tr class="font-weight-bold title">
                                <td><v-icon>mdi-weather-windy</v-icon> Wind</td>
                                <td>{{ current.wind_mph }} mph</td>
                              </tr>
                              <tr class="font-weight-bold title">
                                <td><v-icon>mdi-eye</v-icon> Visibility</td>
                                <td>{{ current.vis_km }} Km</td>
                              </tr>
                              <tr class="font-weight-bold title">
                                <td><v-icon>mdi-cloud</v-icon> Cloud</td>
                                <td>{{ current.cloud }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- ---------------------- -->

          <v-row v-if="current && forecast">
            <v-col>
              <v-card
                class="white mb-4 mt-4 mx-4"
                elevation="20"
                max-width="800"
              >
                <v-card-title primary-title class="font-weight-bold">
                  Hourly Forecast
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="2" class="text-center">
                        <p class="title">Now</p>
                        <p class="display-1 blue--text font-weight-bold">
                          {{ current.temp_c }}&deg;
                        </p>
                        <v-img
                          :src="current.condition.icon"
                          width="92"
                          class="mx-auto"
                        ></v-img>
                      </v-col>
                      <v-col cols="12" md="2" class="text-center">
                        <p class="title">
                          {{
                            new Date(
                              forecast.forecastday[0].hour[datanow + 1].time
                            )
                              .toLocaleTimeString()
                              .replace(/:\d+ /, " ")
                          }}
                        </p>
                        <p class="display-1 blue--text font-weight-bold">
                          {{
                            forecast.forecastday[0].hour[datanow + 1].temp_c
                          }}&deg;
                        </p>
                        <v-img
                          :src="
                            forecast.forecastday[0].hour[datanow + 1].condition
                              .icon
                          "
                          alt="Sunny image"
                          width="92"
                          class="mx-auto"
                        ></v-img>
                      </v-col>
                      <v-col cols="12" md="2" class="text-center">
                        <p class="title">
                          {{
                            new Date(
                              forecast.forecastday[0].hour[datanow + 2].time
                            )
                              .toLocaleTimeString()
                              .replace(/:\d+ /, " ")
                          }}
                        </p>
                        <p class="display-1 blue--text font-weight-bold">
                          {{
                            forecast.forecastday[0].hour[datanow + 2].temp_c
                          }}&deg;
                        </p>
                        <v-img
                          :src="
                            forecast.forecastday[0].hour[datanow + 2].condition
                              .icon
                          "
                          alt="Sunny image"
                          width="92"
                          class="mx-auto"
                        ></v-img>
                      </v-col>
                      <v-col cols="12" md="2" class="text-center">
                        <p class="title">
                          {{
                            new Date(
                              forecast.forecastday[0].hour[datanow + 3].time
                            )
                              .toLocaleTimeString()
                              .replace(/:\d+ /, " ")
                          }}
                        </p>
                        <p class="display-1 blue--text font-weight-bold">
                          {{
                            forecast.forecastday[0].hour[datanow + 3].temp_c
                          }}&deg;
                        </p>
                        <v-img
                          :src="
                            forecast.forecastday[0].hour[datanow + 3].condition
                              .icon
                          "
                          alt="Sunny image"
                          width="92"
                          class="mx-auto"
                        ></v-img>
                      </v-col>
                      <v-col cols="12" md="2" class="text-center">
                        <p class="title">
                          {{
                            new Date(
                              forecast.forecastday[0].hour[datanow + 4].time
                            )
                              .toLocaleTimeString()
                              .replace(/:\d+ /, " ")
                          }}
                        </p>
                        <p class="display-1 blue--text font-weight-bold">
                          {{
                            forecast.forecastday[0].hour[datanow + 4].temp_c
                          }}&deg;
                        </p>
                        <v-img
                          :src="
                            forecast.forecastday[0].hour[datanow + 4].condition
                              .icon
                          "
                          alt="Sunny image"
                          width="92"
                          class="mx-auto"
                        ></v-img>
                      </v-col>
                      <v-col cols="12" md="2" class="text-center">
                        <p class="title">
                          {{
                            new Date(
                              forecast.forecastday[0].hour[datanow + 5].time
                            )
                              .toLocaleTimeString()
                              .replace(/:\d+ /, " ")
                          }}
                        </p>
                        <p class="display-1 blue--text font-weight-bold">
                          {{
                            forecast.forecastday[0].hour[datanow + 5].temp_c
                          }}&deg;
                        </p>
                        <v-img
                          :src="
                            forecast.forecastday[0].hour[datanow + 5].condition
                              .icon
                          "
                          alt="Sunny image"
                          width="92"
                          class="mx-auto"
                        ></v-img>
                      </v-col>
                      <v-btn
                        rounded
                        small
                        elevation="50"
                        @click="tab = 1"
                        color="primary"
                      >
                        next 48 Hours
                      </v-btn>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>

        <!-- Hourly -->

        <v-tab-item class="primary">
          <v-row v-if="current && forecast">
            <v-col>
              <v-card  elevation="20" max-width="800">
                <v-card-title primary-title class="font-weight-bold">
                  Hourly Weather
                  <span class="font-weight-light">
                    -{{ city }}, {{ country }}</span
                  >
                </v-card-title>
                <v-card-subtitle class="font-weight-bold subtitle-1">
                  As of
                  {{ new Date(`${current.last_updated}`).toLocaleTimeString() }}
                </v-card-subtitle>
                <v-card-text>
                  <!-- day1 -->
                  <h3 class="black--text font-weight-bold">
                    {{
                      new Date(`${current.last_updated}`).toLocaleDateString(
                        undefined,
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    }}
                  </h3>
                  <v-expansion-panels class="mt-5 mb-5">
                    <v-expansion-panel
                      v-for="(item, index) in forecast.forecastday[0].hour"
                      :key="index"
                    >
                      <v-expansion-panel-header>
                        <v-row>
                          <v-col class="mt-6" md="2" xs="1">
                            <span class="font-weight-light">{{
                              new Date(item.time)
                                .toLocaleTimeString()
                                .replace(/:\d+ /, " ")
                            }}</span>
                          </v-col>
                          <v-col class="mt-4" md="2" xs="1">
                            <span class="font-weight-bold title ml-8"
                              >{{ item.temp_c }}&deg;</span
                            >
                          </v-col>
                          <v-col md="5" xs="1">
                            <v-img
                              :src="item.condition.icon"
                              alt="Sunny image"
                            height="50"
                            :aspect-ratio="16 / 9"
                            width="50"
                            class="mx-auto"
                            ></v-img>
                          </v-col>
                          <v-col
                         
                            md="3"
                            sm="2"
                            class="justify-center d-none d-md-flex"
                          >
                            <p class="mt-4">
                              <v-icon medium color="blue lighten-1"
                                >mdi-weather-windy</v-icon
                              >
                              NE {{ item.wind_mph }} mph
                            </p>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-row>
                          <v-col cols="12" md="3">
                            <p class="font-weight-light">Feels Like</p>
                            <span class="font-weight-bold text-h5">
                              <v-icon color="blue" medium
                                >mdi-thermometer-low</v-icon
                              >
                              {{ item.feelslike_c }}&deg;</span
                            >
                          </v-col>
                          <v-col cols="12" md="3">
                            <p class="font-weight-light">Win</p>
                            <span class="font-weight-bold text-h6">
                              <v-icon color="blue" medium
                                >mdi-weather-windy</v-icon
                              >
                              NNE {{ item.wind_mph }} mph</span
                            >
                          </v-col>
                          <v-col cols="12" md="3">
                            <p class="font-weight-light">Humidity</p>
                            <span class="font-weight-bold text-h5">
                              <v-icon color="blue" medium
                                >mdi-water-percent</v-icon
                              >
                              {{ item.humidity }}%</span
                            >
                          </v-col>
                          <v-col cols="12" md="3">
                            <p class="font-weight-light">rain</p>
                            <span class="font-weight-bold text-h5">
                              <v-icon color="blue" medium
                                >mdi-weather-pouring</v-icon
                              >
                              {{ item.will_it_rain }}%</span
                            >
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>
        <!-- 3 Day -->
        <v-tab-item class="primary">
          <v-row v-if="current && forecast">
            <v-col>
              <v-card class="mt-20" elevation="10" max-width="800">
                <v-card-title primary-title class="font-weight-bold">
                  10 Day Weather
                  <span class="font-weight-light">
                    -{{ city }}, {{ country }}</span
                  >
                </v-card-title>
                <v-card-subtitle class="font-weight-bold subtitle-1">
                  As of
                  {{ new Date(`${current.last_updated}`).toLocaleTimeString() }}
                </v-card-subtitle>
                <v-card-text>
                  <v-expansion-panels class="">
                    <v-expansion-panel
                      v-for="(item, i) in forecast.forecastday"
                      :key="i"
                    >
                      <v-expansion-panel-header>
                        <v-col  md="3" xs="3">
                          <span class="font-weight-light">{{
                            new Date(item.date).toLocaleDateString(undefined, {
                              day: "numeric",
                              weekday: "long",
                            })
                          }}</span>
                        </v-col>
                        <v-col  md="2" xs="2">
                          <span class="font-weight-bold title mt-2"
                            >{{ item.day.maxtemp_c }}&deg;</span
                          ><span> /{{ item.day.mintemp_c }}&deg; </span>
                        </v-col>
                        <v-col  md="1" xs="1">
                          <v-img
                            :src="item.day.condition.icon"
                            alt="Sunny image"
                            height="50"
                            :aspect-ratio="16 / 9"
                            width="50"
                            class="mx-auto"
                          ></v-img>
                        </v-col>
                        <v-col  md="3" xs="3" class="d-none d-md-flex text-right">
                          <span class="ml-4">{{
                            item.day.condition.text
                          }}</span>
                        </v-col>
                        <v-col cols="12" md="3" class="d-none d-md-flex text-right">
                          <v-icon medium color="blue lighten-1"
                            >mdi-weather-windy</v-icon
                          >
                          NE {{ item.day.maxwind_mph }} mph
                        </v-col>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-row>
                          <v-col cols="12" md="6">
                            <v-card>
                              <v-card-title class="font-weight-light">
                                {{
                                  new Date(`${item.date}`).toLocaleDateString(
                                    undefined,
                                    {
                                      weekday: "long",

                                      day: "numeric",
                                    }
                                  )
                                }}| Day
                              </v-card-title>
                              <v-card-text>
                                <v-row align="center">
                                  <v-col cols="10">
                                    <v-row>
                                      <v-col cols="6">
                                        <p
                                          class="display-1 black--text font-weight-bold"
                                        >
                                          {{ item.day.avgtemp_c }}&deg;
                                        </p>
                                      </v-col>
                                      <v-col cols="9" md="">
                                        <v-img
                                          :src="item.hour[12].condition.icon"
                                          alt="Sunny image"
                                          height="50"
                                          :aspect-ratio="16 / 9"
                                          width="50"
                                          class="mx-auto"
                                        ></v-img>
                                      </v-col>
                                    </v-row>
                                    <v-simple-table>
                                      <template v-slot:default>
                                        <tbody>
                                          <tr>
                                            <td>
                                              <p>
                                                <span>
                                                  <v-icon color="blue"
                                                    >mdi-water-percent</v-icon
                                                  >
                                                </span>
                                                Humidity
                                              </p>
                                              <p
                                                class="mt-n3 ml-8 font-weight-bold"
                                              >
                                                {{ item.hour[12].humidity }}%
                                              </p>
                                            </td>
                                            <td>
                                              <p>
                                                <span>
                                                  <v-icon color="blue"
                                                    >mdi-eye</v-icon
                                                  >
                                                </span>
                                                visibility
                                              </p>
                                              <p
                                                class="mt-n3 ml-8 font-weight-bold"
                                              >
                                                {{ item.day.avgvis_km }}Km
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <p class="mt-4">
                                                <span>
                                                  <v-icon color="blue"
                                                    >mdi-weather-sunset-up</v-icon
                                                  >
                                                </span>
                                                Sunrise
                                              </p>
                                              <p
                                                class="mt-n3 ml-8 font-weight-bold"
                                              >
                                                {{ item.astro.sunrise }}
                                              </p>
                                            </td>
                                            <td>
                                              <p class="mt-4">
                                                <span>
                                                  <v-icon color="blue"
                                                    >mdi-weather-sunset-down</v-icon
                                                  >
                                                </span>
                                                Sunset
                                              </p>
                                              <p
                                                class="mt-n3 ml-8 font-weight-bold"
                                              >
                                                {{ item.astro.sunset }}
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </template>
                                    </v-simple-table>
                                  </v-col>
                                  <v-col cols="2"> </v-col>
                                </v-row>
                              </v-card-text>
                            </v-card>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-card>
                              <v-card-title class="font-weight-light">
                                {{
                                  new Date(`${item.date}`).toLocaleDateString(
                                    undefined,
                                    {
                                      weekday: "long",

                                      day: "numeric",
                                    }
                                  )
                                }}| Night
                              </v-card-title>
                              <v-card-text>
                                <v-row align="center">
                                  <v-col cols="10">
                                    <v-row>
                                      <v-col cols="6">
                                        <p
                                          class="display-1 black--text font-weight-bold"
                                        >
                                          {{ item.hour[5].temp_c }}&deg;
                                        </p>
                                      </v-col>
                                      <v-col cols="9" md="">
                                        <v-img
                                          :src="item.hour[5].condition.icon"
                                          alt="Sunny image"
                                          height="50"
                                          :aspect-ratio="16 / 9"
                                          width="50"
                                          class="mx-auto"
                                        ></v-img>
                                      </v-col>
                                    </v-row>
                                    <v-simple-table>
                                      <template v-slot:default>
                                        <tbody>
                                          <tr>
                                            <td>
                                              <p>
                                                <span>
                                                  <v-icon color="blue"
                                                    >mdi-water-percent</v-icon
                                                  >
                                                </span>
                                                Humidity
                                              </p>
                                              <p
                                                class="mt-n3 ml-8 font-weight-bold"
                                              >
                                                {{ item.hour[5].humidity }}%
                                              </p>
                                            </td>
                                            <td>
                                              <p>
                                                <span>
                                                  <v-icon color="blue"
                                                    >mdi-eye</v-icon
                                                  >
                                                </span>
                                                visibility
                                              </p>
                                              <p
                                                class="mt-n3 ml-8 font-weight-bold"
                                              >
                                                {{ item.day.avgvis_km }}Km
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <p class="mt-4">
                                                <span>
                                                  <v-icon color="blue"
                                                    >mdi-moon-full</v-icon
                                                  >
                                                </span>
                                                Moonrise
                                              </p>
                                              <p
                                                class="mt-n3 ml-8 font-weight-bold"
                                              >
                                                {{ item.astro.moonrise }}
                                              </p>
                                            </td>
                                            <td>
                                              <p class="mt-4">
                                                <span>
                                                  <v-icon color="blue"
                                                    >mdi-moon-waning-crescent</v-icon
                                                  >
                                                </span>
                                                Moonset
                                              </p>
                                              <p
                                                class="mt-n3 ml-8 font-weight-bold"
                                              >
                                                {{ item.astro.moonset }}
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </template>
                                    </v-simple-table>
                                  </v-col>
                                  <v-col cols="2"> </v-col>
                                </v-row>
                              </v-card-text>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: null,
    };
  },
  computed: {
    loding() {
      return this.$store.getters.getLoding;
    },
    city() {
      return this.$store.getters.getCity;
    },
    country() {
      return this.$store.getters.getCountry;
    },
    current() {
      return this.$store.getters.getCurrent;
    },
    forecast() {
      return this.$store.getters.getForecast;
    },
    datanow() {
      if (this.forecast) {
        let timeL = new Date(
          this.$store.getters.getLoction.localtime
        ).getHours();

        let forecast = this.forecast.forecastday[0].hour;
        let index = forecast.findIndex((time) => {
          return new Date(time.time).getHours() == timeL;
        });
        if (index > 18) {
          return 18;
        }
        return index;
      }
    },
    mobile() {
      return this.$vuetify.breakpoint.xs ? "text-subtitle-1" : "";
    },
    mobile1() {
      return this.$vuetify.breakpoint.xs ? "d-none" : "";
    },
    error() {
      return this.$store.getters.getError;
    },
  },
};
</script>