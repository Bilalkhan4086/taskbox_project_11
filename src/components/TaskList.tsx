import React from 'react';
import PropTypes from 'prop-types';

import Task, { TaskType } from './Task';
import { connect } from 'react-redux';
import { archiveTask, pinTask } from '../lib/redux';


type PureTaskListTypes = {
  loading : boolean,
  onPinTask : ()=>void,
  onArchiveTask : ()=>void,
  tasks : TaskType[]
}

export const PureTaskList:React.FC<any> = ({ loading, tasks, onPinTask, onArchiveTask }:PureTaskListTypes) => {
  const events = {
    onPinTask,
    onArchiveTask,
  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );
  if (loading) {
    return (
      <div className="list-items">
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }
  if (tasks.length === 0) {
    return (
      <div className="list-items">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }
  const tasksInOrder = [
    ...tasks.filter((t:any) => t.state === 'TASK_PINNED'),
    ...tasks.filter((t:any) => t.state !== 'TASK_PINNED'),
  ];
  return (
    <div className="list-items">
      {tasksInOrder.map(task => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
}
PureTaskList.propTypes = {
    /** Checks if it's in loading state */
    loading: PropTypes.bool,
    /** The list of tasks */
    tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
    /** Event to change the task to pinned */
    onPinTask: PropTypes.func.isRequired,
    /** Event to change the task to archived */
    onArchiveTask: PropTypes.func.isRequired,
  };
  
  PureTaskList.defaultProps = {
    loading: false,
  };
  
  export default connect(
    ({ tasks }:any) => ({
      tasks: tasks.filter((t:any) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'),
    }),
    dispatch => ({
      onArchiveTask: (id:any) => dispatch(archiveTask(id)),
      onPinTask: (id:any) => dispatch(pinTask(id)),
    })
  )(PureTaskList);