import { createRef, Component } from 'react';
import InputChild from './InputChild';
import { DeleteButton } from './shared/helpers';

export default class Item extends Component {
  divElement = createRef();

  componentDidUpdate() {
    if (this.props.height === this.divElement.current.scrollHeight) return;
    this.props.updateComponentHeight(
      this.props.section,
      this.props.id,
      this.divElement.current.scrollHeight
    );
  }

  componentDidMount() {
    if (this.props.height === this.divElement.current.scrollHeight) return;
    this.props.updateComponentHeight(
      this.props.section,
      this.props.id,
      this.divElement.current.scrollHeight
    );
  }

  render() {
    const { section, location, duration, subChildren, deleteSubChild, handleBlur, id } =
      this.props;
    return (
      <div ref={this.divElement}>
        <InputChild
          id={[id]}
          className={`${section}--location`}
          text={location}
          target="location"
          type="text"
          handleBlur={handleBlur}
        />
        <InputChild
          id={[id]}
          className={`${section}--duration`}
          text={duration}
          target="duration"
          type="text"
          handleBlur={handleBlur}
        />
        <ul className={`section--sub-children`}>
          {subChildren.map((item) => (
            <li key={item.id}>
              <InputChild
                id={[id, item.id]}
                text={item.data.input}
                target="subChildren"
                type="textarea"
                handleBlur={handleBlur}
              />
              <DeleteButton
                onClick={() => deleteSubChild(section, id, item.id)}
                whatToDelete={'sub-child'}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
