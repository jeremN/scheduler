import React, { useState } from 'react';

import Card from '../../atoms/Card/Card';
import Button from '../../atoms/Buttons/Buttons';
import Label from '../../atoms/Label/Label';

import { useClient } from '../../../context/authContext';

const TeammateNotes = ({ notes, onSubmitFn, onDeleteFn, route }) => {
  const client = useClient();
  const [newNote, setNewNotes] = useState();

  function handleChange({ target }) {
    setNewNotes(target.value);
  }

  function sendUpdatedNotes(updatedNotes) {
    client(route, {
      body: {
        updatedTeammate: { notes: updatedNotes },
      },
      method: 'PUT',
    })
      .then(async (result) => {
        const datas = await result;

        if (datas.updated) {
          onSubmitFn?.success(updatedNotes);
        }
      })
      .finally(() => {
        setNewNotes('');
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
        <div className="form__group">
          <Label labelId={'newNote'}>Nouvelle note</Label>
          <textarea
            id="newNote"
            name="newNote"
            value={newNote}
            onChange={handleChange}></textarea>
        </div>
        <Button modifiers={['primary']} type="submit">
          Enregistrer la note
        </Button>
      </form>
      <h3>Notes enregistrées ({notes.length})</h3>
      <ul className="teammate__notesList">
        {notes.map(({ content, _id }, index) => (
          <li
            key={_id || index}
            id={_id || index}
            className="teammate__noteItem">
            <span>{content}</span>
            <Button clicked={() => deleteNote(_id)}>Effacer</Button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default TeammateNotes;
