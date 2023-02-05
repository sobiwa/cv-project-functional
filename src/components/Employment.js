import { Component } from 'react';
import InputChild from './InputChild';

export default class Employment extends Component {
  render() {
    const { location, duration, tasks, handleBlur, id } = this.props;
    return (
      <div className="employment">
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
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
