import { Button } from "@/components/ui/button";

interface Props {
  text: String;
}
export function ButtonOutline({ text }: Props) {
  return <Button variant="outline">{text}</Button>;
}
