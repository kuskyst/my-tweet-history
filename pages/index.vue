<template>
  <div>
    <ul>
      <li v-for="tweet in tweets" :key="tweets.id">
        {{ tweet.tweet.created_at }}<br>
        {{ tweet.tweet.full_text }}<br>
        favorite: {{ '♡'.repeat(tweet.tweet.favorite_count) }} retweet: {{ '⇄'.repeat(tweet.tweet.retweet_count) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const tweets = ref(null);

onMounted(async () => {
  const response = await axios.get('/data.json');
  const data = await response.data.tweets;
  const today = new Date();
  tweets.value = data
    .filter(tweet => tweet.tweet.created_at.startsWith(`${today.getMonth() + 1}/${today.getDate()}`))
    .filter(tweet => !tweet.tweet.full_text.includes("@"));
});
</script>
