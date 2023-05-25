<template>
  <div class="flex items-center" style="line-height: normal">
    <q-chip
      v-for="item in selected"
      :dense="dense"
      :key="item"
      :color="color"
      class="flex items-center q-pr-none"
      style="line-height: normal"
    >
      {{ item }}
      <q-btn
        icon="cancel"
        round
        size="xs"
        dense
        flat
        class="q-pa-none"
        @click="deSelect(item)"
      ></q-btn>
    </q-chip>
    <q-btn icon="add" round size="sm" dense flat v-if="options">
      <q-menu>
        <q-list>
          <q-item
            v-for="option in options.filter((el) => !selected?.includes(el))"
            clickable
            v-ripple
            :key="option"
            @click="select(option)"
          >
            <q-item-section>
              <q-item-label>{{ option }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  options?: string[];
  selected: string[];
  dense?: boolean;
  color?: string;
}>();

const emit = defineEmits<{
  (event: 'select', item: string): void;
  (event: 'deSelect', item: string): void;
  (event: 'update:selected', items: string[]): void;
}>();

function select(item: string) {
  emit('select', item);
  emit('update:selected', [...props.selected, item]);
}
function deSelect(item: string) {
  emit('deSelect', item);
  emit(
    'update:selected',
    [...props.selected].filter((el) => el != item)
  );
}
</script>
