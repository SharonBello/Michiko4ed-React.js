import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Questions-list from './Questions-list';

describe('<Questions-list />', () => {
  test('it should mount', () => {
    render(<Questions-list />);
    
    const questionsList = screen.getByTestId('Questions-list');

    expect(questionsList).toBeInTheDocument();
  });
});