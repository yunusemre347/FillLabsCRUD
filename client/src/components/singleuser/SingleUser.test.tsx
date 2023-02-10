
import { render, screen } from '@testing-library/react';
import SingleUser from './SingleUser';

const user = {
  _id: '1',
  firstname: 'first',
  lastname: 'last',
};
const getID = jest.fn();
describe('SingleUser component', () => {
  test('renders at first', () => {
    const button = 'Default';
   render(
      <SingleUser user={user} getID={getID} button={button} />
    );
    const firstNameElement= screen.getByText("first")
    expect(firstNameElement).toBeInTheDocument();

    const lastNameElement= screen.getByText("last")
    expect(lastNameElement).toBeInTheDocument();

    const wrapperElement= screen.getByTestId('single-user')
    expect(wrapperElement).toBeInTheDocument();

    const radioElement=screen.queryByRole("radio")
    expect(radioElement).not.toBeInTheDocument();
  });
  test("renders at edit",()=>{
    const button = 'Edit';
    render(
      <SingleUser user={user} getID={getID} button={button} />
    );
    const radioElement=screen.queryByRole("radio")
    expect(radioElement).toBeInTheDocument();
  })
});

