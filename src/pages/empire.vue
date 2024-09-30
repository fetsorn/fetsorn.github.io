<script setup>
import { MainButton, useWebAppPopup } from "vue-tg";

const { showAlert } = useWebAppPopup();

function myFunction(id) {
  const page =
    "https://dungeonmaster-wee-wee-53ff43089fcb49b0a2dd69bd42463cc15f20f598d.gitlab.io/empire.html#";
  const link = page + id; // Get the text field
  navigator.clipboard.writeText(link);
}

// function writeText(text) {
//     // do something to copy text
// }
</script>

<template>
  <div>
    <!--
title
description
endless scroll of cards
each card has image and description
when user clicks on card, card becomes large and loads high resolution image
by default all images are low resolution thumbnails
each photo has an anchor to open URLs that scroll to that photo
at the end of the page there are links to other pages
under each photo there is a button containing link to the photo example in Copy Text to Clipboard
user clicks on this button to copy the link and sends it elsewhere
-->
    <h1>Охохонюшки</h1>

    <div>
      <p>Это страница посвящена фотографиям Царицына</p>
    </div>

    <div class="grade">
      <div class="column" id="1">
        <img
          class="picture"
          src="https://gitlab.com/wee-wee/photostorage/-/raw/main/pa51e2mfqtau4xkcxm__01.jpg?ref_type=heads&inline=false"
        />
        <p>
          Детский дом, бывший дом купца Миллера рядом с нынешней станцией
          Пионерская, начало 20х
        </p>
        <button onclick="myFunction(1)">Поделиться</button>
      </div>
      <div class="column" id="2">
        <img
          class="picture"
          src="https://gitlab.com/wee-wee/photostorage/-/raw/main/1384869860_02.jpg?ref_type=heads&inline=false"
        />
        <p>дом Миллера со стороны р.Царицы</p>
        <button onclick="myFunction(2)">Поделиться</button>
      </div>
      <div class="column" id="3">
        <img
          class="picture"
          src="https://gitlab.com/wee-wee/photostorage/-/raw/main/5bumvxzyhdxw7n6mod.jpg?ref_type=heads&inline=false"
        />
        <p>Женская гимназия, сейчас - Казачий театр</p>
        <button onclick="myFunction(3)">Поделиться</button>
      </div>
    </div>

    <div>
      <ul class="links">
        <li><router-link :to="'/ussr'">Советская Россия</router-link></li>
        <li><router-link :to="'/rf'">Российская Федерация</router-link></li>
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
