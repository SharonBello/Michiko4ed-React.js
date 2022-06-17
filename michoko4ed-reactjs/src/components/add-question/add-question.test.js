import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddQuestion from './add-question.jsx';

describe('<Add-question />', () => {
  test('it should mount', () => {
    render(<AddQuestion />);
    
    const addQuestion = screen.getByTestId('Add-question');

    expect(addQuestion).toBeInTheDocument();
  });
});