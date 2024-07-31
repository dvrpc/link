import React, { useEffect } from "react";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import YouTube from 'react-youtube';

class Yt extends React.Component {
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0,
      },
    };

    return <YouTube videoId="HR-wV-C0zZY" opts={opts} onReady={this._onReady} />;
  }

  _onReady(event) {
    event.target.pauseVideo();
  }
}

function Video() {
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    open();
  }, [open]);

  return (
    <>
      <Modal size="auto" opened={opened} onClose={close} title="Welcome to DVRPC LINK!">
        <Yt />
      </Modal>

      <Button onClick={open}>Video</Button>
    </>
  );
}

export default Video;
