import { useState } from 'react';
import { Box, Input, Button, List, ListItem, ListIcon, IconButton } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: input, isComplete: false }]);
      setInput('');
    }
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isComplete: !task.isComplete } : task));
  };

  return (
    <Box p={5}>
      <Input
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
      />
      <IconButton
        icon={<FaPlus />}
        onClick={handleAddTask}
        colorScheme="blue"
        ml={2}
      />
      <List spacing={3} mt={4}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" alignItems="center">
            <ListIcon
              as={task.isComplete ? FaCheckCircle : FaRegCircle}
              color={task.isComplete ? 'green.500' : 'gray.500'}
              onClick={() => handleToggleComplete(task.id)}
              cursor="pointer"
            />
            <Box flex="1" as={task.isComplete ? 's' : 'span'}>
              {task.text}
            </Box>
            <IconButton
              icon={<FaTrash />}
              onClick={() => handleRemoveTask(task.id)}
              colorScheme="red"
              size="sm"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;