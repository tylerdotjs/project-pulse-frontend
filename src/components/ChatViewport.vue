<template>
  <div style="height: 100%">
    <q-infinite-scroll
      @load="onLoad"
      reverse
      :offset="250"
      class="scroll"
      style="contain: strict; height: 100%"
      ref="scroll"
    >
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
      <q-scroll-observer @scroll="onScroll"></q-scroll-observer>
      <q-list>
        <q-item
          v-for="message in messages"
          :key="message.id"
          style="min-height: 80px"
        >
          <q-item-section side
            ><q-avatar color="primary" text-color="black" sr>
              <img
                :src="message.sender?.avatar"
                :alt="
                  message.sender?.name
                    .split(' ')
                    .slice(0, 2)
                    .map((el) => el.charAt(0))
                    .join('') || 'N/A'
                "
              /> </q-avatar
          ></q-item-section>
          <q-item-section>
            <q-item-label class="flex row q-gutter-sm">
              <div>{{ message.sender?.name }}</div>
              <div
                class="text-caption text-grey"
                style="line-height: inherit"
                v-if="message.data"
              >
                {{ toRel(message.data.createdAt).value }}
              </div>
            </q-item-label>
            <q-item-label caption>
              {{ message.data?.text }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-infinite-scroll>
    <div class="flex justify-center" style="position: relative; bottom: 50px">
      <q-btn
        icon="expand_more"
        color="primary"
        rounded
        @click="scrollToBottom"
        v-if="showScrollBottomBtn"
        >Scroll to Bottom</q-btn
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMessageStore } from 'src/stores/chat';
import { computed, ref, watch } from 'vue';
import iL from 'src/models/intervalLengths';
import { QInfiniteScroll } from 'quasar';

const interval = ref(Date.now());
setInterval(() => {
  interval.value = Date.now();
}, 10000);

const intervals = {
  second: iL.second,
  minute: iL.minute,
  hour: iL.hour,
  day: iL.day,
  week: iL.week,
};

const toRel = (date: Date) =>
  computed<string>(() => {
    const relative = interval.value - date.valueOf();

    if (relative < iL.minute) return 'just now';
    if (relative >= iL.week) return date.toLocaleString();

    let iKey: keyof typeof intervals = 'second';

    for (const i in iL) {
      const intervalLength = intervals[i as keyof typeof intervals];
      if (relative > intervalLength) {
        iKey = i as keyof typeof intervals;
      }
    }

    const val = Math.floor(relative / iL[iKey]);
    return `${val} ${iKey}${val >= 2 ? 's' : ''} ago`;
  });

const props = defineProps<{
  channel?: string;
}>();

const store = useMessageStore();

const messages = computed(() => {
  let msgs = store.items;

  if (props.channel) {
    msgs = msgs.filter((el) => el.data?.channelId === props.channel);
  }

  return msgs;
});

watch(props, () => {
  setTimeout(scrollToBottom, 20);
});

const scroll = ref<QInfiniteScroll | null>(null);

function onLoad(index: number, done: () => void) {
  store.pull(props.channel);
  done();
}

function scrollToBottom() {
  if (scroll.value) {
    scroll.value.$el.scrollTop =
      scroll.value.$el.scrollHeight - scroll.value.$el.offsetHeight;
  }
}

const showScrollBottomBtn = ref(false);

function onScroll() {
  if (scroll.value) {
    const pos =
      scroll.value.$el.scrollHeight -
      scroll.value.$el.offsetHeight -
      scroll.value.$el.scrollTop;

    showScrollBottomBtn.value = pos > 0;
  }
}

store.$onAction(({ name }) => {
  if (name == 'send') {
    // Wait 1ms for msg to be added
    setTimeout(scrollToBottom, 1);
  }
});

defineExpose({
  scrollToBottom,
});
</script>
