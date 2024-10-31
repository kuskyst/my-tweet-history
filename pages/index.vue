<template>
  <div id="container" v-if="!loading">
    <div class="content" v-if="tweet">
      <p id="created_at">{{ tweet.created_at }}</p>
      <p id="full_text">{{ tweet.full_text }}</p>
      <div id="media_url">
        <div v-for="url in tweet.media_url_https" :key="url">
          <img height="180px" :src="url" />
        </div>
      </div>
      <p id="reaction">
        favorite: <span class="mark">{{ '💖'.repeat(tweet.favorite_count) }}</span>
        <span v-if="tweet.retweet_count > 0">retweet: <span class="mark">{{ '♻'.repeat(tweet.retweet_count) }}</span></span>
      </p>
      <p id="source">from: <span v-html="tweet.source"></span></p>
    </div>
    <div class="content" v-else>今日はツイートしていませんでした...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const paramDate = route.query.date || '';
const tweet = ref(null);
const loading = ref(true);

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
    .filter(tweet => tweet.tweet.created_at.includes(`/${(target.getMonth() + 1).toString().padStart(2, '0')}/${target.getDate().toString().padStart(2, '0')}`))
    .filter(tweet => !tweet.tweet.full_text.includes("@"));
  if (tweets.length > 0) {
    tweet.value = tweets[Math.floor(Math.random() * tweets.length)].tweet;
  }
  loading.value = false;
});
</script>

<style lang="scss">
#container {
  display: flex;
  justify-content: center;
  align-items: center;
}
#created_at {
  text-align: left;
}
#full_text {
  text-align: left;
}
#media_url {
  display: flex;
  justify-content: center;
  align-items: center;
}
#reaction {
  text-align: right;
}
#source {
  text-align: right;
}
img {
  margin: 0 20px;
}
.content {
  width: 70%;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 1s forwards;
}
.mark {
  letter-spacing: -8px;
}
@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>