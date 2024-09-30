<script setup>
import { MainButton, useWebAppPopup } from "vue-tg";

const { showAlert } = useWebAppPopup();
</script>

<template>
  <div>
    <!--
links page:
title
description
list of cards
each card has link and description
at the end of the page there are links to other pages-->
    <h1>Охохонюшки</h1>

    <div>
      <p>На этой странице будут ссылки на полезные ресурсы о городе</p>
    </div>

    <div>
      <div>
        <a href="https://poymamagazine.ru/">POYMA MAGASINE</a>
        <p>Журнал о жизни в Волгограде</p>
      </div>
    </div>

    <div>
      <ul>
        <li><router-link :to="'/empire'">Российская Империя</router-link></li>
        <li><router-link :to="'/ussr'">Советская Россия</router-link></li>
        <li><router-link :to="'/rf'">Российская Федерация</router-link></li>
        <li><router-link :to="'/point_along_route'">maps</router-link></li>
        <li><router-link :to="'/line'">line</router-link></li>
      </ul>
    </div>
    <!-- спасибо за внимание -->
  </div>
</template>
