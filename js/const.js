export const RenderPosition = {
    BEFOREBEGIN: 'beforebegin',
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
    AFTEREND: 'afterend',
}

export const HIDE_BLOCK_CLASS = 'hidden-block';

export const StateActions = {
    TASK_CREATE: `task-create`,
    TASK_UPDATE_TITLE: `task-update-title`,
    TASK_UPDATE_POSITION: `task-update-position`,
    TASK_DELETE: `task-delete`,
    BASKET_CLEANUP: `basket-cleanup`,
    ELEMENT_DRAGOVER: `elementDragover`,
    ELEMENT_EDITED: `elementEdited`,
};

export const Status = {
    BACKLOG: 'backlog',
    PROCESSING: 'processing',
    DONE: 'done',
    BASKET: 'basket',
};

export const StatusLabel = {
    [Status.BACKLOG]: 'backlog',
    [Status.PROCESSING]: 'processing',
    [Status.DONE]: 'done',
    [Status.BASKET]: 'basket',
}

export const Text = {
    EMPTY_TASK: 'Drag the card',
    EMPTY_BASKET: 'Trash can is empty',
    NEW_TASK: 'New task',
};

export const STATE_EMPTY = 'empty'

export const EventTypes = {
    click: 'click',
    keydown: 'keydown',
}

export const Key = {
    ENTER: 13,
    ESCAPE: 27,
}
