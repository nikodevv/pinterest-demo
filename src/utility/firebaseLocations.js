/*
* Firebase collection references are separated from other code for easy mocking via dependency injection.
* */
import { db } from '../App';

export let UsersRef = () => db.collection('users');

