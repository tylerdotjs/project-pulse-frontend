<template>
  <q-card-section>
    <q-form class="flex q-gutter-md items-center" @submit="submit">
      <q-input
        ref="textInput"
        dense
        rounded
        outlined
        v-model="text"
        style="flex-grow: 1"
      ></q-input>
      <q-btn
        dense
        round
        v-if="canSubmit"
        color="primary"
        icon="send"
        type="submit"
      ></q-btn>
    </q-form>
  </q-card-section>
</template>

<script lang="ts" setup>
import { QInput } from 'quasar';
import { MessageBase } from 'src/models/message.model';
import { useChannelStore } from 'src/stores/channel';
import { useMessageStore } from 'src/stores/chat';
import { computed, ref } from 'vue';

const props = defineProps<{
  channel?: string;
}>();

const messageStore = useMessageStore();
const channelStore = useChannelStore();

const text = ref('');
const textInput = ref<QInput | null>(null);

const canSubmit = computed<boolean>(() => text.value.length > 0);

const emit = defineEmits<{
  (event: 'submit', message: MessageBase): void;
}>();

function submit() {
  if (!canSubmit.value) return;
  const channel = props.channel || channelStore.active;
  emit('submit', messageStore.send(text.value, channel).value);
  text.value = '';
  focusInput();
}

function focusInput() {
  if (textInput.value) {
    textInput.value.focus();
  }
}
</script>
