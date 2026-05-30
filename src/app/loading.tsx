import { Container } from "@/components/layout/Container";

/** Route-level loading fallback. */
export default function Loading() {
  return (
    <Container className="flex min-h-[50vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-primary" />
    </Container>
  );
}
