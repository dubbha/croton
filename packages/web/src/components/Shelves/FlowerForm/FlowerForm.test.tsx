import React from 'react';
import { render } from '@testing-library/react';
import { FlowerForm } from './FlowerForm';

jest.mock('react-rrule-generator', () => ({
  __esModule: true,
  default: () => <div>RRuleGenerator</div>,
}));

describe('components/FlowerForm', () => {
  const fn = jest.fn();

  const props = {
    onSubmit: fn,
  };

  afterEach(() => {
    fn.mockReset();
  });

  it('should render successfully', () => {
    const { container } = render(<FlowerForm {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
