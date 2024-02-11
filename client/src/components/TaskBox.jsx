import { Box, Button, Flex, Grid, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const TaskBox = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTaskTitle, setSelectedTaskTitle] = useState();
  const [completeTheTask, setCompleteTheTask] = useState();
  useEffect(() => {
    const fetchData = () => {
      fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "get",
      })
        .then((res) => res.json())
        .then((data) => {
          setTasks(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    fetchData();
  }, []);
  const updateSelectedTask = async () => {
    await fetch(
      `https://jsonplaceholder.typicode.com/todos/${selectedTask.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          title: selectedTaskTitle,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTasks(tasks.map((task) => (task.id === data.id ? data : task)));
      });
  };
  const onDelete = async () => {
    await fetch(
      `https://jsonplaceholder.typicode.com/todos/${selectedTask.id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        setSelectedTask(null);
        setTasks(
          tasks.filter((task) => {
            return task.id !== selectedTask.id;
          })
        );
      })
      .catch((err) => console.log(err));
  };
  const updateCompletion = async () => {
    await fetch(
      `https://jsonplaceholder.typicode.com/todos/${selectedTask.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          completed: completeTheTask,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  const handleSubmitted = (event) => {
    if (event.keyCode === 13) {
      setSelectedTaskTitle(selectedTaskTitle);
      setIsEditing(false);
      updateSelectedTask();
      event.preventDefault();
    }
  };
  if (loading) return <div>loading...</div>;
  return (
    <Flex align="center" justify="center" direction="column" mt={20}>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={6}
        w="75vw"
        borderWidth="1px"
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="2xl"
      >
        <Box
          css={{
            overflowY: "auto",
            maxHeight: "80vh",
            minHeight: "10vh",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "gray",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
          }}
        >
          {tasks.map((task) => (
            <Box
              key={task.id}
              cursor="pointer"
              onClick={() => {
                setSelectedTask(task);
                setSelectedTaskTitle(task.title);
                setCompleteTheTask(task.completed);
              }}
              _hover={{ bg: "gray.100" }}
              borderBottom="1px solid #E2E8F0"
              py={3}
            >
              <Text as="b" display="flex" alignItems="flex-start" ml="20px">
                {task.title.length > 50
                  ? task.title.slice(0, 50) + "..."
                  : task.title}
              </Text>
            </Box>
          ))}
        </Box>
        <Flex align="center" justify="center" height="100%" textAlign="left">
          {selectedTask ? (
            <Flex align="center" justifyContent="center" mb={2}>
              <Box p={4} width="390px" mb={4}>
                <span style={{ fontWeight: "bold" }}>
                  Title:{" "}
                  <span
                    style={{ fontWeight: "lighter" }}
                    onDoubleClick={() => setIsEditing(true)}
                    onKeyUp={(event) => handleSubmitted(event)}
                  >
                    {isEditing ? (
                      <Input
                        type="text"
                        value={selectedTaskTitle}
                        onChange={(event) => {
                          setSelectedTaskTitle(event.target.value);
                        }}
                        variant="unstyled"
                        autoFocus
                        onBlur={() => setIsEditing(false)}
                      />
                    ) : (
                      selectedTask.title
                    )}
                  </span>
                </span>
                <br />
                <span style={{ fontWeight: "bold" }}>
                  User Id:{" "}
                  <span style={{ fontWeight: "lighter" }}>
                    {selectedTask.userId}
                  </span>
                </span>
                <br />
                <br />
                <Flex justify="center" gap="4">
                  <Button mr={2} colorScheme="red" onClick={onDelete}>
                    Delete
                  </Button>
                  <Button
                    colorScheme="green"
                    variant={completeTheTask ? "solid" : "outline"}
                    onClick={() => {
                      setCompleteTheTask(!completeTheTask);
                      updateCompletion();
                    }}
                  >
                    {completeTheTask ? "Completed" : "Mark"}
                  </Button>
                </Flex>
              </Box>
            </Flex>
          ) : (
            <Flex align="center" justify="center" height="100%">
              <Text as="b" color="gray">
                Select a To-Do to modify it
              </Text>
            </Flex>
          )}
        </Flex>
      </Grid>
    </Flex>
  );
};

export default TaskBox;
