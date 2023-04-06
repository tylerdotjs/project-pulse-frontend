<template>
  <q-scroll-area
    ref="scrollArea"
    :bar-style="barStyle"
    :thumb-style="thumbStyle"
  >
    <q-infinite-scroll @load="onLoad" reverse :offset="250">
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
      <q-list separator>
        <q-item v-for="message in messages" :key="message._id">
          <q-item-section side
            ><q-avatar color="primary" text-color="black" sr>
              <img
                :src="message.sender.avatar"
                :alt="
                  message.sender.name
                    .split(' ')
                    .slice(0, 2)
                    .map((el) => el.charAt(0))
                    .join('')
                "
              /> </q-avatar
          ></q-item-section>
          <q-item-section>
            <q-item-label class="flex row q-gutter-sm">
              <div>{{ message.sender.name }}</div>
              <div class="text-caption text-grey" style="line-height: inherit">
                {{ toRel(message.createdAt).value }}
              </div>
            </q-item-label>
            <q-item-label caption>
              {{ message.text }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-infinite-scroll>
  </q-scroll-area>
</template>

<script lang="ts" setup>
import { QScrollArea } from 'quasar';
import { useMessageStore } from 'src/stores/message';
import { computed, ref } from 'vue';
import iL from 'src/models/intervalLengths';

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

const store = useMessageStore();
const messages = store.toReactiveArray();

const scrollArea = ref<QScrollArea | null>(null);

const thumbStyle: QScrollArea['thumbStyle'] = {
  right: '4px',
  borderRadius: '7px',
  backgroundColor: '#027be3',
  width: '4px',
  opacity: '0.5',
};

const barStyle: QScrollArea['barStyle'] = {
  right: '2px',
  borderRadius: '9px',
  backgroundColor: '#000000',
  width: '8px',
  opacity: '0.05',
};

function onLoad(index: number, done: () => void) {
  store.pull();
  done();
}

function scrollToBottom() {
  if (scrollArea.value) {
    console.log(scrollArea.value.getScrollPercentage());
    scrollArea.value.setScrollPercentage('vertical', 1);
  }
}
store.$onAction(({ name }) => {
  if (name == 'send') {
    // Wait 1ms for msg to be added
    setTimeout(scrollToBottom, 1);
  }
});
</script>
