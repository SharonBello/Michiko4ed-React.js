import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Add-question from './Add-question';

describe('<Add-question />', () => {
  test('it should mount', () => {
    render(<Add-question />);
    
    const addQuestion = screen.getByTestId('Add-question');

    expect(addQuestion).toBeInTheDocument();
  });
});