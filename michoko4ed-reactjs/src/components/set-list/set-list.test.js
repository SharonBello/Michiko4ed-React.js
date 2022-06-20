import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QuestionsList from './set-list.jsx;

describe('<QuestionsList />', () => {
  test('it should mount', () => {
    render(<QuestionsList />);
    
    const questionsList = screen.getByTestId('QuestionsList');

    expect(questionsList).toBeInTheDocument();
  });
});