import React from 'react';
import { QuestionPreview } from '../questions-preview/questions-preview.jsx'

export const QuestionsList = ({ questions }) => {
  return (
    <div className="list-of-questions-container">
      <ul className="question-list clean-list">
        {questions.map(question =>
          <QuestionPreview
            key={question._id}
            question={question}
          />
        )}
      </ul>
    </div>
  )
}
