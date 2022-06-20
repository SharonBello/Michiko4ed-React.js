import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QuestionsPreview from './sets-preview.jsx';

describe('<QuestionsPreview />', () => {
  test('it should mount', () => {
    render(<QuestionsPreview />);
    
    const questionsPreview = screen.getByTestId('QuestionsPreview');

    expect(questionsPreview).toBeInTheDocument();
  });
});