import React, { useState } from 'react';

const EditQuestionForm = ({ question, tags, onCancel, onSave }) => {
    const [editedQuestionText, setEditedQuestionText] = useState(question.text);
    const [selectedTags, setSelectedTags] = useState(question.tagIds);

    const handleTagClick = (tagId) => {
        setSelectedTags((prevTags) => {
            if (prevTags.includes(tagId)) {
                return prevTags.filter((id) => id !== tagId);
            } else {
                return [...prevTags, tagId];
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedQuestionText, selectedTags);
    };

    return (
        <div>
            <h2>Edit Question</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea value={editedQuestionText} onChange={(e) => setEditedQuestionText(e.target.value)} />
                </div>
                <div>
                    <h3>Tags:</h3>
                    <div className="tags-container">
                        {tags.map((tag) => (
                            <button
                                key={tag.id}
                                className={selectedTags.includes(tag.id) ? 'selected' : ''}
                                onClick={() => handleTagClick(tag.id)}
                            >
                                {tag.name}
                            </button>
                        ))}
                    </div>
                </div>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditQuestionForm;
