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

    <div><p>Это сайт об истории Волгограда.</p></div>
    <div class="grade">
      <div class="column">
        <img
          class="avatar"
          decoding="async"
          src="https://a.travelcdn.mts.ru/travel-media/ekaterina_leksina_spiker_b7640ac175.jpg"
        />
        <p>Катя Лёксина, основатель проекта Здесь прекрасно</p>
      </div>
      <div class="column">
        <img
          class="avatar"
          src="https://i.postimg.cc/5tXJ2PwP/s-JVu-Wj-Tj-Owo.jpg"
        />
        <p>Дмитрий Бушмин, гид</p>
      </div>
    </div>

    <div>
      <ul class="links">
        <li><router-link :to="'/empire'">Российская Империя</router-link></li>
        <li><router-link :to="'/ussr'">Советская Россия</router-link></li>
        <li><router-link :to="'/rf'">Российская Федерация</router-link></li>
        <li>
          <router-link :to="'/link'">Ссылки на другие ресурсы</router-link>
        </li>
        <li><router-link :to="'/point_along_route'">maps</router-link></li>
        <li><router-link :to="'/line'">line</router-link></li>
      </ul>
    </div>
    <!-- спасибо за внимание -->
  </div>
</template>
