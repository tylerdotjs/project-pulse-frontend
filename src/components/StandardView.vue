<template>
  <q-item>
    <div class="flex fill-x">
      <q-item-section>
        <q-item-label>
          {{ standard.data?.code }} - {{ standard.data?.title }}
        </q-item-label>
        <q-item-label caption>
          {{ standard.data?.description }}
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <div class="flex items-center no-wrap">
          <slot name="action"></slot>
        </div>
      </q-item-section>
    </div>
    <div class="flex items-center no-wrap">
      <slot></slot>
    </div>
  </q-item>
</template>

<script lang="ts" setup>
import { useStandardStore } from 'src/stores/standard';
import { computed } from 'vue';

const store = useStandardStore();

const props = defineProps<{
  id: string;
}>();

const standard = computed(() => store.get(props.id));
</script>
