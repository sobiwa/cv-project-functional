import { Component } from 'react';
import Input from './Input';

export default class Main extends Component {
  render() {
    return <main>
      <div className="profile">
        <h2 className='main--title'>Profile</h2>
        <Input id='profile' type='textarea' text='A little about yourself' />

      </div>

    </main>;
  }
}
