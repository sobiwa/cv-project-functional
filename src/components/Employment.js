import { createRef, Component } from 'react';
import InputChild from './InputChild';
import { DeleteButton } from './shared/helpers';

export default class Employment extends Component {

  divElement = createRef();

  componentDidUpdate() {
    if (this.props.height === this.divElement.current.scrollHeight) return;
    this.props.updateComponentHeight(
      'employment',
      this.props.id,
      this.divElement.current.scrollHeight
    );
  }

  componentDidMount() {
    if (this.props.height === this.divElement.current.scrollHeight) return;
    this.props.updateComponentHeight(
      'employment',
      this.props.id,
      this.divElement.current.scrollHeight
    );
  }

  render() {
    const { location, duration, tasks, deleteTask, handleBlur, id } =
      this.props;
    return (
      <div ref={this.divElement}>
        <InputChild
          id={[id]}
          className="employment--location"
          text={location}
          target="location"
          type="text"
          handleBlur={handleBlur}
        />
        <InputChild
          id={[id]}
          className="employment--duration"
          text={duration}
          target="duration"
          type="text"
          handleBlur={handleBlur}
        />
        <ul className="employment--tasks">
          {tasks.map((item) => (
            <li key={item.id}>
              <InputChild
                id={[id, item.id]}
                text={item.data.input}
                target="tasks"
                type="textarea"
                handleBlur={handleBlur}
              />
              <DeleteButton
                onClick={() => deleteTask('employment', 'tasks', id, item.id)}
                whatToDelete="task"
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
