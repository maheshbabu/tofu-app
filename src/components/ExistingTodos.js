import React from 'react';

import {styled} from 'fusion-plugin-styletron-react';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {toggleReactor, deleteReactor} from '../reactors/todos';
import {all, incomplete, completed} from '../selectors/todos';

const List = styled('ul', {
  padding: 0,
  margin: 0,
  width: '100%'
});

const ListItem = styled('li', {
  display: 'flex',
  margin: 0,
  padding: '15px 10px 15px 15px',
  listStyleType: 'none',
  borderTop: '1px solid black',
  fontSize: '18px',
  fontFamily: "'Montserrat', sans-serif",
});

const ItemCheckMark = styled('div', ({$checked}) => ({
  fontSize: '2em',
  color: `rgba(0, 0, 0, ${$checked ? '0.5' : '0.1'})`,
  fontFamily: "'Montserrat', sans-serif",
  cursor: 'pointer',
  width: '40px',
  lineHeight: '0',
  verticalAlign: 'middle',
  height: '100%',
  position: 'relative',
  ':before': {
    content: "'\u2714'",
    display: 'block',
    position: 'absolute',
    top: '10px',
    left: 0,
    fontSize: '36px'
  }
}));

const DeleteIcon = styled('div', {
  display: 'block',
  width: '30px',
  cursor: 'pointer',
  position: 'relative',
  color: 'rgba(255, 100, 100, 0.3)',
  ':before': {
    content: "'\u2717'",
    display: 'block',
    position: 'absolute',
    top: '10px',
    left: 0,
    fontSize: '36px',
    lineHeight: 0
  },
  ':hover': {
    color: 'red'
  }
});

const ListItemTitle = styled('div', {
  width: '100%'
});

const listItems = (items, toggleHandler, deleteHandler) => {
  return items.map((item, index) => {
    return (
      <ListItem key={item.id}>
        <ItemCheckMark $checked={item.completed} onClick={() => toggleHandler({id: item.id})} />
        <ListItemTitle>{item.title}</ListItemTitle>
        <DeleteIcon onClick={() => deleteHandler({id: item.id})} />
      </ListItem>
    );
  });
}

const ExistingTodos = ({todos, toggle, deleteOne}) => {
  return (
    <List>{listItems(todos, toggle, deleteOne)}</List>
  );
};

const hoc = compose(
  toggleReactor,
  deleteReactor,
  connect((state) => {
    switch (state.activeFilter) {
      case 'All':
        return {todos: all(state)}
      case 'Active':
        return {todos: incomplete(state)}
      case 'Completed':
        return {todos: completed(state)}
    }
  })
);
export default hoc(ExistingTodos);
