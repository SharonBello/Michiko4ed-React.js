import React from 'react';
import { SetPreview } from '../set-preview/set-preview.jsx'

export const SetList = ({ sets, user }) => {
  return (
    <div className="list-of-questions-container">
      <ul className="set-list clean-list">
        {sets.map(set =>
          <SetPreview
            key={set._id}
            set={set}
            user={user}
          />
        )}
      </ul>
    </div>
  )
}
