import { StateService } from './store';

interface ITestState {
  entity: {
    name: string;
  };
}
export class TestState extends StateService<ITestState> {
  entity$ = this.select((state) => state.entity);

  setNewName(newName: string): void {
    this.setState({
      entity: {
        name: newName,
      },
    });
  }
}

describe('StateService', () => {
  let store: TestState;

  it('Selecting state should work', (done) => {
    const initialState: ITestState = {
      entity: {
        name: '',
      },
    };
    store = new TestState(initialState);

    expect(store.entity$).toBeDefined();
    store.entity$.subscribe((entity) => {
      expect(entity).toMatchObject({
        name: '',
      });
      done();
    });
  });

  it('Setting new state should work', (done) => {
    const initialState: ITestState = {
      entity: {
        name: '',
      },
    };
    store = new TestState(initialState);

    store.setNewName('newName');
    expect(store.entity$).toBeDefined();
    store.entity$.subscribe((entity) => {
      expect(entity).toMatchObject({
        name: 'newName',
      });
      done();
    });
  });
});
