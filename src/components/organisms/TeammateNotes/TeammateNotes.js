import React, { useState } from 'react';

import Card from '../../atoms/Card/Card';
import Button from '../../atoms/Buttons/Buttons';

import clientWrapper from '../../../utilities/fetchWrapper';

const TeammateNotes = ({ notes, onSubmitFn, onDeleteFn, route }) => {
  const [newNote, setNewNotes] = useState();

  function handleChange({ target }) {
    setNewNotes(target.value);
  }

  function sendUpdatedNotes(updatedNotes) {
    clientWrapper(route, {
      body: {
        updatedTeammate: { notes: updatedNotes },
      },
      method: 'PUT',
    })
      .then(async (result) => {
        const datas = await result;

        if (!!datas.updated) {
          // eslint-disable-next-line no-unused-expressions
          onSubmitFn?.success(updatedNotes);
        }
      })
      .finally(() => {
        setNewNotes('');
        // eslint-disable-next-line no-unused-expressions
        onSubmitFn?.clear();
      });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const updatedNotes = [...notes, { content: newNote }];
    sendUpdatedNotes(updatedNotes);
  }

  function deleteNote(idToDelete) {
    const updatedNotes = notes.filter((note) => note._id !== idToDelete);
    sendUpdatedNotes(updatedNotes);
  }

  return (
    <Card classes={['teammate__newNote']}>
      <h2>Notes</h2>
      <form onSubmit={handleSubmit}>
        <textarea value={newNote} onChange={handleChange}></textarea>
        <Button modifiers={['primary']} type="submit">
          Enregistrer la note
        </Button>
      </form>
      <h3>Notes enregistrées ({notes.length})</h3>
      <ul className="teammate__notesList">
        {notes.map(({ content, _id }, index) => (
          <li key={_id} id={_id} className="teammate__noteItem">
            <span>{content}</span>
            <Button clicked={() => deleteNote(_id)}>Effacer</Button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default TeammateNotes;
