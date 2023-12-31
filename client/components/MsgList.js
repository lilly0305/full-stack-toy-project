import React, { useState } from "react";

import MsgItem from "./MsgItem";
import MsgInput from "./MsgInput";

const UserIds = ["roy", "jay"];
const getRandomUserId = () => UserIds[Math.round(Math.random())];

const originalMsgs = Array(50)
  .fill(0)
  .map((_, i) => ({
    id: 50 - i,
    userId: "roy",
    timestamp: 1234567890123 + i + 1000 * 60,
    text: `${50 - i} mock text`,
  }));

const MsgList = () => {
  const [msgs, setMsgs] = useState(originalMsgs);
  const [editingId, setEditingId] = useState(null);

  const onCreate = (text) => {
    const newMsg = {
      id: msgs.length + 1,
      userId: "jay",
      timestamp: Date.now(),
      text: `${msgs.length} new ${text}`,
    };

    setMsgs((msgs) => [newMsg, ...msgs]);
  };

  const onUpdate = (text, id) => {
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id);

      if (targetIndex < 0) return msgs;

      const newMsgs = [...msgs];

      newMsgs.splice(targetIndex, 1, {
        ...msgs[targetIndex],
        text,
      });

      return newMsgs;
    });

    doneEdit();
  };

  const doneEdit = () => setEditingId(null);

  const onDelete = (id) => {
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id);

      if (targetIndex < 0) return;

      const newMsgs = [...msgs];

      newMsgs.splice(targetIndex, 1);

      return newMsgs;
    });
  };

  return (
    <>
      <MsgInput mutate={onCreate} />

      <ul className="messages">
        {msgs.map((x) => (
          <MsgItem
            key={x.id}
            {...x}
            onUpdate={onUpdate}
            isEditing={editingId === x.id}
            startEdit={() => setEditingId(x.id)}
            onDelete={() => onDelete(x.id)}
          />
        ))}
      </ul>
    </>
  );
};

export default MsgList;
