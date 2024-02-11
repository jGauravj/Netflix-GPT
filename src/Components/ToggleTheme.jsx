import { useTheme } from "next-themes";
import { Select } from "@radix-ui/themes";
const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Select.Root
      value={theme}
      onValueChange={setTheme}
    >
      <Select.Trigger />
      <Select.Content>
        <Select.Item value="system">System</Select.Item>
        <Select.Item value="dark">Dark</Select.Item>
        <Select.Item value="light">Light</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default ToggleTheme;
