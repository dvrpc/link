import React, { useEffect } from "react";
import { Button, Modal, Tooltip } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';


function Disclaimer() {
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    open();
  }, [open]);

  return (
    <>
      <Modal size="xl" opened={opened} onClose={close} title="Disclaimer">
        This web page is a public resource of general information. The Delaware Valley Regional Planning Commission (DVRPC) makes no warranty, representation, or guarantee as to the content, sequence, accuracy, timeliness, or completeness of any of the spatial data or database information provided herein. DVRPC and partner state, local, and other agencies shall assume no liability for errors, omissions, or inaccuracies in the information provided regardless of how caused; or any decision made or action taken or not taken by any person relying on any information or data furnished within.

      </Modal >

      <Tooltip label="Disclaimer for use of LINK">
        <Button
          onClick={open}
        >Disclaimer</Button>
      </Tooltip>
    </>
  );
}

export default Disclaimer;
