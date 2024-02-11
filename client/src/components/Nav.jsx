import { Box, Flex, Heading } from "@chakra-ui/react";
const Nav = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="center"
      bg="black"
      color="white"
      p={4}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={999}
      width="100%"
      boxShadow="2xl"
    >
      <Box>
        <Heading as="h1" size="md">
          Todos
        </Heading>
      </Box>
    </Flex>
  );
};

export default Nav;
