import { defineStore } from 'pinia';
import { MassStore, MassStoreItem } from 'src/models/massStore.class';
import { Project } from 'src/models/project.model';
import { useStandardStore } from './standard';
import Subject from 'src/models/subject.enum';

export class ProjectItem extends MassStoreItem<Project> {
  standardStore = useStandardStore();

  protected pullFn(): Promise<Project> {
    throw new Error('Method not implemented.');
  }

  get populatedStandards() {
    return (
      this.data?.standards.map((el) => {
        const standard = this.standardStore.get(el.id);
        return {
          ...el,
          standard,
          subject: standard.data?.subject,
        };
      }) || []
    );
  }

  get scoreAggregate(): { [key in Subject | 'total']: number } {
    const scores: { [key: string]: number } = {};

    for (const key of Object.values(Subject)) {
      scores[key] = 0;
    }

    for (const score of this.populatedStandards) {
      if (score.subject && score.score) {
        scores[score.subject] += score.score * score.influence;
      }
    }

    let total = 0;
    for (const key in scores) {
      total += scores[key];
    }
    scores.total = total;

    return scores as { [key in Subject | 'total']: number };
  }
}

export class ProjectData extends MassStore<ProjectItem> {
  protected createItem(id: string): ProjectItem {
    return new ProjectItem(id);
  }
}

export const useProjectStore = defineStore('project', () => {
  const data = new ProjectData();

  return {
    get: (id: string) => data.get(id),
  };
});
