import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button, Icon, Popover } from "native-base";
import { useState } from "react";

export default ({
  data,
  rowMap,
  deleteMutation,
  deleteRow,
}: {
  data: any;
  rowMap: any;
  deleteMutation: any;
  deleteRow: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePress = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    setIsOpen(false);
    deleteRow(rowMap, data?.item._id);
    deleteMutation.mutate(data.item._id);
  };

  return (
    <Popover
      placement="left top"
      trigger={(triggerProps) => (
        <Button
          colorScheme="danger"
          alignSelf="center"
          {...triggerProps}
          onPress={handlePress}
        >
          <Icon
            marginTop={1}
            as={<FontAwesome name="times-circle" />}
            size={"2xl"}
            color={"white"}
          />
        </Button>
      )}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <Popover.Content w="56">
        <Popover.Arrow />
        <Popover.CloseButton onPress={handleClose} />
        <Popover.Header>{ t('delete') }</Popover.Header>
        <Popover.Body>{ t('deleteMessage') }</Popover.Body>
        <Popover.Footer justifyContent="flex-end">
          <Button.Group space={2}>
            <Button
              colorScheme="coolGray"
              variant="ghost"
              onPress={handleClose}
            >
              Cancel
            </Button>
            <Button colorScheme="danger" onPress={handleDelete}>
              Delete
            </Button>
          </Button.Group>
        </Popover.Footer>
      </Popover.Content>
    </Popover>
  );
};
