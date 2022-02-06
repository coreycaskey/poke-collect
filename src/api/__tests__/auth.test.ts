
import { signUpForApp } from 'api/auth';
import * as firebase from 'firebase/auth';
import { firebaseConfig } from 'utils/firebase';


describe('auth.ts', () => {

  describe('sign up process', () => {
    beforeAll(() => {
      jest.spyOn(firebase, 'setPersistence').mockResolvedValue();
      // jest.spyOn(firebase, 'createUserWithEmailAndPassword').mockResolvedValue();
    });

    // it('should successfully create account', () => {
    //   const test = signUpForApp('test@test.com', 'test123');

    //   expect(firebase.setPersistence).toHaveBeenCalledTimes(1);
    // });

    // it('should fail to create account', () => {});
  });
});
