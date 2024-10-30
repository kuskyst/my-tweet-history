<template>
  <div id="container" v-if="tweet">
    <div id="content">
      <p id="created_at">{{ tweet.created_at }}</p>
      <p id="full_text">{{ tweet.full_text }}</p>
      <p id="media_url" v-for="url in tweet.media_url_https" :key="url">
        <img height="240px" :src="url" /></p>
      <p id="reaction">
        favorite: {{ '💖'.repeat(tweet.favorite_count) }}
        <span v-if="tweet.retweet_count > 0">retweet: {{ '♳'.repeat(tweet.retweet_count) }}</span>
      </p>
      <p id="source">from: <span v-html="tweet.source"></span></p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const paramDate = route.query.date || '';
const tweet = ref(null);

onMounted(async () => {
  const response = await axios.get('/data.json');
  const data = await response.data.tweets;

  const month = parseInt(paramDate.substring(0, 2), 10) - 1;
  const day = parseInt(paramDate.substring(2, 4), 10);
  let target = new Date(new Date().getFullYear(), month, day);
  if (target.getMonth() !== month || target.getDate() !== day) {
    target = new Date();
  }
  const tweets = data
    .filter(tweet => tweet.tweet.created_at.startsWith(`${(target.getMonth() + 1).toString().padStart(2, '0')}/${target.getDate().toString().padStart(2, '0')}`))
    .filter(tweet => !tweet.tweet.full_text.includes("@"));
  tweet.value = tweets[Math.floor(Math.random() * tweets.length)].tweet;
});
</script>

<style lang="scss">
#container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#content {
  width: 70%;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 1s forwards;
}
#created_at {
  text-align: left;
}
#full_text {
  text-align: left;
}
#media_url {
  text-align: center;
}
#reaction {
  text-align: right;
}
#source {
  text-align: right;
}
@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>