import React, { useEffect } from "react";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';


function ModalRegional() {
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    open();
  }, [open]);

  return (
    <>
      <Modal size="auto" opened={opened} onClose={close} title="LINK Regional Connectivity Analysis">
        hi
      </Modal>

      <Button onClick={open}>Explainer</Button>
    </>
  );
}

export default ModalRegional;
