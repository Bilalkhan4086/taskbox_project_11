import { createStore } from 'redux';
import { TaskType } from '../components/Task';


// The actions are the "names" of the changes that can happen to the store
export const actions = {
  ARCHIVE_TASK: 'ARCHIVE_TASK',
  PIN_TASK: 'PIN_TASK',
};

// The action creators bundle actions with the data required to execute them
export const archiveTask = (id:string) => ({ type: actions.ARCHIVE_TASK, id });
export const pinTask = (id:string) => ({ type: actions.PIN_TASK, id });

// All our reducers simply change the state of a single task.
function taskStateReducer(taskState:any) {
  return (state:any, action:any) => {
    return {
      ...state,
      tasks: state.tasks.map((task:any) =>
        task.id === action.id ? { ...task, state: taskState } : task
      ),
    };
  };
}

// The reducer describes how the contents of the store change for each action
export const reducer = (state:any, action:any) => {
  switch (action.type) {
    case actions.ARCHIVE_TASK:
      return taskStateReducer('TASK_ARCHIVED')(state, action);
    case actions.PIN_TASK:
      return taskStateReducer('TASK_PINNED')(state, action);
    default:
      return state;
  }
};

// The initial state of our store when the app loads.
// Usually you would fetch this from a server
const defaultTasks = [
  { id: '1', title: 'BreakFast before 8am', state: 'TASK_INBOX' },
  { id: '2', title: 'Study React before 1pm', state: 'TASK_INBOX' },
  { id: '3', title: 'Lunch At 1pm', state: 'TASK_INBOX' },
  { id: '4', title: 'Go to shop', state: 'TASK_INBOX' },
];

// We export the constructed redux store
export default createStore(reducer, { tasks: defaultTasks });
      