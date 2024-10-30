<template>
  <div id="container" v-if="tweet">
    <div id="content">
      <p id="created_at">{{ tweet.created_at }}</p>
      <p id="full_text">{{ tweet.full_text }}</p>
      <p id="reaction">
        favorite: {{ '💖'.repeat(tweet.favorite_count) }}
        <span v-if="tweet.retweet_count > 0">retweet: {{ '⇄'.repeat(tweet.retweet_count) }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const tweet = ref(null);

onMounted(async () => {
  const response = await axios.get('/data.json');
  const data = await response.data.tweets;
  const today = new Date();
  const tweets = data
    .filter(tweet => tweet.tweet.created_at.startsWith(`${today.getMonth() + 1}/${today.getDate()}`))
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
}
#created_at {
  text-align: left;
}
#full_text {
  text-align: center;
}
#reaction {
  text-align: right;
}
</style>