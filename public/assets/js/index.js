let noteTitle;
let noteInput;
let saveBtn;
let newBtn;
let noteList;

if (window.location.pathname === '/notes') {
    noteTitle = document.querySelector('.note-title');
    noteInput = document.querySelector('.note-input');
    saveBtn = document.querySelector('.save-note');
    newBtn = document.querySelector('.new-note');
    noteList = document.querySelector('.list-box .list-group');
}
// show/hide element
const show = (element) => {
    element.style.display = 'inline';
};
const hide = (element) => {
    element.style.display = 'none';
};

// tracks notes input
let trackNotes = {};

const getNotes = () =>
    fetch('/api/notes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

const saveNotes = (note) =>
    fetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'applicatiion/json',
        },
        body: JSON.stringify(note)
    });

const deleteNotes = (id) =>
    fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

const renderTrackNotes = (id) => {
    hide(saveBtn);

    if (trackNotes.id) {
        noteTitle.setAttribute('readonly', true);
        noteInput.setAttribute('readonly', true);
        noteTitle.value = trackNotes.title;
        noteInput.value = trackNotes.text;
    } else {
        noteTitle.removeAttribute('readonly');
        noteInput.removeAttribute('readonly');
        noteTitle.value = '';
        noteInput.value = '';
    }
};

const handleSaveNotes = () => {
    const newBtn = {
        title: noteTitle.value,
        text: noteInput.value,
    };
    saveBtn(newBtn).then(() => {
        getAndRenderNotes();
        renderTrackNotes();
    });
};

// delete notes
const handleDeleteNotes = (e) => {
e.stopPropagation();

const notes = e. target;
const notesId = JSON.parse(notes.parentElement.getAttributes('data-notes')).id;

if (trackNotes.id === notesId) {
    trackNotes = {};
}
deleteNotes(notesId).then(() => {
    getAndRenderNotes();
    renderTrackNotes();
});
};

// displays notes
const handleViewNotes = (e) => {
    e.preventDefault();
    trackNotes = JSON.parse(e.target.parentElement.getAttribute('data-notes'));
    renderTrackNotes();
};

// allows users to enter new notes
const handleViewNewNotes = (e) => {
    trackNotes = {};
    renderTrackNotes();
};

const handleRenderSaveBtn = () => {
    if (!noteTitle.value.trim() || !noteInput.value.trim()) {
        hide(saveBtn);
    } else {
        show(saveBtn);
    }
};

// render notes titles
const renderNoteList = async (notes) => {
    let jsonNotes = await notes.json();
    if (window.location.pathname === '/notes') {
        noteList.forEach((el) => (el.innerHTML = ''));
    }

    let noteListInput = [];

    const createList = (text, deleteBtn = true) => {
        const liEl = document.createElement('li');
        liEl.classList.add('list-group-items');
        const spanEl = document.createElement('span');
        spanEl.classList.add('list-items-title');
        spanEl.innerInput = text;
        spanEl.addEventListener('click', handleViewNotes);

        liEl.append(spanEl);

        if (deleteBtn) {
            const deleteBtnEl = document.createElement('i');
            deleteBtnEl.classList.add(
                'fas',
                'fa-trash-alt',
                'float-right',
                'text-danger',
                'delete-note'
            );

            deleteBtnEl.addEventListener('click', handleDeleteNotes);

            liEl.append(deleteBtnEl);
        }
        return liEl;
    };

    if (jsonNotes.length === 0) {
        noteListInput.push(createLi('No saved Notes', false));
    }

    jsonNotes.forEach((note) => {
        const li = createLi(note.title);
        li.dataset.note = JSON.stringify(note);

        noteListInput.push(li);
    });

    if (window.location.pathname === '/notes') {
        noteListInput.forEach((note) => noteList[0].append(note));
    }
};

const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === '/notes') {
    saveBtn.addEventListener('click', handleSaveNotes);
    newBtn.addEventListener('click', handleViewNewNotes);
    noteTitle.addEventListener('keyup', handleRenderSaveBtn);
    noteInput,addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderNotes();