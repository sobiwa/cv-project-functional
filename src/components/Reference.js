import { Component, createRef } from 'react';
import InputChild from './InputChild';

export default class Reference extends Component {
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
    const {contact, email, phone, handleBlur, id } =
      this.props;
    return (
      <div ref={this.divElement}>
        <InputChild
          id={[id]}
          className='reference--contact'
          text={contact}
          target="contact"
          type="text"
          handleBlur={handleBlur}
        />
        <div className="ref--contact-info">
          <InputChild
            id={[id]}
            className={'reference--email'}
            text={email}
            target="email"
            type="email"
            handleBlur={handleBlur}
          />
          |
          <InputChild
            id={[id]}
            className={'reference--phone'}
            text={phone}
            target='phone'
            type='tel'
            handleBlur={handleBlur}
          />
        </div>
      </div>
    );
  }
}