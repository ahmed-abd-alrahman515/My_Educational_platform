import { Container } from "@/components/layout/Container";
import { Spinner } from "@/components/ui/Spinner";

/** Route-level loading fallback. */
export default function Loading() {
  return (
    <Container className="flex min-h-[60vh] items-center justify-center">
      <Spinner size={44} />
    </Container>
  );
}
