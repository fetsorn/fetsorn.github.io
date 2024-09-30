<script setup>
import { MainButton, useWebAppPopup } from "vue-tg";

const { showAlert } = useWebAppPopup();
</script>

<template>
  <div>
    <!-- домашняя страница:
             заголовок
             описание
             реклама гидов
             ссылка на альбом ри
             ссылка на альбом ссср
             ссылка на альбом рф
             ссылка на страницу со ссылками и их описанием-->
    <h1>Охохонюшки</h1>

    <div>
      <ul class="links">
        <li><router-link :to="'/empire'">Российская Империя</router-link></li>
        <li><router-link :to="'/ussr'">Советская Россия</router-link></li>
        <li>
          <router-link :to="'/link'">Ссылки на другие ресурсы</router-link>
        </li>
        <li><router-link :to="'/json'">maps</router-link></li>
        <li><router-link :to="'/line'">line</router-link></li>
      </ul>
    </div>
    <!-- спасибо за внимание -->
  </div>
</template>
