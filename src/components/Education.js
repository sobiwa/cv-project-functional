import { Component } from 'react';
import InputChild from './InputChild';
import { DeleteButton } from './shared/helpers';

export default class Education extends Component {
  render() {
    const { school, duration, details, deleteDetail, handleBlur, id } =
      this.props;
    return (
      <div>
        <InputChild
          id={[id]}
          className="education--school"
          text={school}
          target="school"
          type="text"
          handleBlur={handleBlur}
        />
        <InputChild
          id={[id]}
          className="education--duration"
          text={duration}
          target="duration"
          type="text"
          handleBlur={handleBlur}
        />
        <ul className="education--details">
          {details.map((item) => (
            <li key={item.id}>
              <InputChild
                id={[id, item.id]}
                text={item.data.input}
                target="details"
                type="textarea"
                handleBlur={handleBlur}
              />
              <DeleteButton
                onClick={() =>
                  deleteDetail('education', 'details', id, item.id)
                }
                whatToDelete="detail"
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
