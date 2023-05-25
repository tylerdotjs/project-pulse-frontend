<template>
  <q-page padding class="q-gutter-md">
    <q-input label="Title" v-model="projectItem.data.title" filled></q-input>
    <div>
      <q-card>
        <q-card-section class="flex items-center">
          <div class="text-overline">Users</div>
          <q-space></q-space>
          <q-btn color="primary" icon="add">
            <span class="text-center q-mr-sm" style="line-height: normal">
              User
            </span>
            <users-select v-model="users"></users-select>
          </q-btn>
        </q-card-section>
        <q-separator></q-separator>
        <div
          class="q-pa-sm justify-center"
          style="
            display: grid;
            grid-template-columns: repeat(auto-fill, 300px);
            gap: 8px;
          "
        >
          <q-card v-for="id in users" :key="id" style="width: 100%">
            <profile-preview :id="id">
              <tag-list
                dense
                :color="$q.dark.isActive ? 'grey-9' : undefined"
                v-model:selected="getUserPerms(id).value"
                :options="Object.values(ProjectPermission)"
              ></tag-list>
              <template #action>
                <q-btn
                  icon="close"
                  dense
                  round
                  flat
                  @click="removeUser(id)"
                ></q-btn>
              </template>
            </profile-preview>
          </q-card>
        </div>
      </q-card>
    </div>
    <q-input
      label="Description"
      v-model="projectItem.data.description"
      type="textarea"
      filled
    ></q-input>
    <q-card>
      <q-card-section class="flex items-center">
        <div class="text-overline">Standards</div>
        <q-space></q-space>
        <q-btn color="primary" icon="add">
          <span class="text-center q-mr-sm" style="line-height: normal">
            Standard
          </span>
        </q-btn>
      </q-card-section>
      <q-separator></q-separator>
      <q-list separator class="scroll" style="max-height: 300px">
        <standard-view
          v-for="standard in projectItem.populatedStandards"
          :key="standard.id"
          :id="standard.id"
        >
          <template #action>
            <div class="q-px-md">Influence:</div>
            <q-slider
              v-model="standard.influence"
              :max="1"
              :min="0"
              :step="0.01"
              style="width: 100px"
            ></q-slider>
            <input
              type="number"
              class="q-mx-md"
              max="100"
              min="0"
              :value="Math.round(standard.influence * 100)"
              @input="standard.influence = $event * 0.01"
            />
            <q-btn flat icon="close" dense round></q-btn>
          </template>
        </standard-view>
      </q-list>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import UsersSelect from 'src/components/UserFindSelect.vue';
import ProfilePreview from 'src/components/ProfilePreview.vue';
import { computed, reactive, ref } from 'vue';
import { ProjectPermission } from 'src/models/permissions.enum';
import TagList from 'src/components/TagList.vue';
import StandardView from 'src/components/StandardView.vue';
import { useStandardStore } from 'src/stores/standard';
import { ProjectItem } from 'src/stores/project';
import { Project } from 'src/models/project.model';

const standardStore = useStandardStore();

const projectItem = reactive(
  new ProjectItem('null') as ProjectItem & { data: Project }
);

function log(msg: unknown) {
  console.log(msg);
}

projectItem.data = {
  _id: 'null',
  title: '',
  description: '',
  users: [],
  standards: standardStore.items.map((el) => {
    return {
      id: el.id,
      influence: 1,
    };
  }),
  createdAt: new Date(),
};

const userPerms = reactive<{
  [id: string]: ProjectPermission[];
}>({});

function getUserPerms(id: string) {
  if (!userPerms[id] || userPerms[id].length < 1) {
    userPerms[id] = [ProjectPermission.Read, ProjectPermission.Write];
  }
  return computed({
    get: () => userPerms[id],
    set: (value) => {
      userPerms[id] = value;
    },
  });
}

const users = ref<string[]>([]);

function removeUser(id: string) {
  const index = users.value.indexOf(id);
  if (index > -1) {
    users.value.splice(index, 1);
  }
}
</script>
