import React from "react";
import { Switch } from "@mantine/core";
import { IconSun, IconMoonStars } from '@tabler/icons-react';

function ThemeToggle({
  onToggleTheme, isLoading, setIsLoading
}) {


  const handleToggle = () => {
    onToggleTheme()
    setIsLoading(true);
  }

  const sunIcon = (
    <IconSun
      stroke={2.5}
      color="yellow"
    />
  );

  const moonIcon = (
    <IconMoonStars
      stroke={2.5}
      color="gray"
    />
  );


  return (
    <Switch
      onChange={handleToggle}
      onLabel={sunIcon} offLabel={moonIcon}
      size="xl"
      color="gray"
    />
  );
}

export default ThemeToggle;
