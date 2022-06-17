import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Questions-preview from './Questions-preview';

describe('<Questions-preview />', () => {
  test('it should mount', () => {
    render(<Questions-preview />);
    
    const questionsPreview = screen.getByTestId('Questions-preview');

    expect(questionsPreview).toBeInTheDocument();
  });
});