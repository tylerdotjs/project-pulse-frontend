<template>
  <q-card-section>
    <q-form class="flex q-gutter-md items-center" @submit="submit">
      <q-input
        ref="textInput"
        rounded
        outlined
        v-model="text"
        style="flex-grow: 1"
      ></q-input>
      <q-btn
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
import { useMessageStore } from 'src/stores/message';
import { computed, ref } from 'vue';

const messageStore = useMessageStore();

const text = ref('');
const textInput = ref<QInput | null>(null);

const canSubmit = computed<boolean>(() => text.value.length > 0);

const emit = defineEmits<{
  (event: 'submit', message: MessageBase): void;
}>();

function submit() {
  if (!canSubmit.value) return;
  emit('submit', messageStore.send(text.value).value);
  text.value = '';
  focusInput();
}

function focusInput() {
  if (textInput.value) {
    textInput.value.focus();
  }
}
</script>
