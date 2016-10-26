import { find } from 'lodash';
import { pubsub } from './subscriptions';

/**
 * Creates the resolvers, backed by simple objects/arrays.
 *
 * In a real app, these would most likely be backed by some sort of data store.
 */

let taskId = 0;
const nextTaskId = () => { return ++taskId; };
const tasks = [
  { id: nextTaskId(), text: 'Sample 1', isComplete: false },
  { id: nextTaskId(), text: 'Sample 2', isComplete: true },
];

const resolveFunctions = {
  Query: {
    tasks() {
      return tasks;
    },
    task(_, { id }) {
      const val = find(tasks, (task) => { return task.id === id; });
      return val;
    },
  },
  Mutation: {
    createTask(_, { text }) {
      const task = { id: nextTaskId(), text, isComplete: false };
      tasks.push(task);
      pubsub.publish('taskCreated', task);
      return task;
    },
  },
  Subscription: {
    taskCreated(task) {
      console.log(`Subscript called for new task ID ${task.id}`);
      return task;
    },
  },
};

export default resolveFunctions;
