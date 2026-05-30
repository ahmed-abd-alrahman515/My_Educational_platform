import type { Track } from "@/types";
import { TrackCard } from "./TrackCard";

/** Responsive grid of TrackCards. Single source for the card layout. */
export function TrackGrid({ tracks }: { tracks: Track[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {tracks.map((track, i) => (
        <TrackCard key={track.id} track={track} index={i} />
      ))}
    </div>
  );
}
