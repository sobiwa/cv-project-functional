import { Component } from 'react';
import Input from './Input';
import InputChild from './InputChild';
import { handleBlur } from './shared/helpers';
import Employment from './Employment';
import uniqid from 'uniqid';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.handleBlur = handleBlur;
  }

  newItem = (defaultText) => ({ input: defaultText, default: defaultText });

  createNewEmployment() {
    return {
      id: uniqid(),
      location: this.newItem('Cat Consultant at Feline Corp., New York'),
      duration: this.newItem('April 1993 - February 2023'),
      tasks: [
        {
          id: uniqid(),
          data: this.newItem(
            'Pet cats and ensured they received abundant quantities of love.'
          ),
        },
      ],
    };
  }

  state = {
    employment: JSON.parse(localStorage.getItem('employment')) || [
      this.createNewEmployment(),
    ],
  };

  addEmployment() {
    this.setState((prevState) => ({
      employment: [...prevState.employment, this.createNewEmployment],
    }));
  }

  deleteItem(id, target) {
    this.setState((prevState) => ({
      [target]: prevState[target].filter((item) => item.id === !id),
    }));
  }

  componentDidUpdate() {
    localStorage.setItem('employment', JSON.stringify(this.state.employment));
  }
  render() {
    return (
      <main>
        <div className="profile">
          <h2 className="main--title">Profile</h2>
          <Input id="profile" type="textarea" text="A little about yourself" />
        </div>
        <div className="employment">
          <h2 className="main--title">Employment History</h2>
          {this.state.employment.map((item) => (
            <Employment
              key={item.id}
              id={item.id}
              delete={() => this.deleteEmployment(item.id)}
              location={item.location.input}
              duration={item.duration.input}
              tasks={item.tasks}
              handleBlur={this.handleBlur('employment')}
            />
          ))}
        </div>
      </main>
    );
  }
}
